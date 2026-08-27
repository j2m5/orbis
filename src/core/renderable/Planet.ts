import {
  BufferGeometry,
  Mesh,
  ShaderMaterial,
  SphereGeometry,
  SRGBColorSpace,
  Texture,
  UniformsUtils,
  type ColorSpace
} from 'three'
import { StandardPlanetShader } from '@/core/framework/shaders/StandardPlanetShader'
import {
  DEFAULT_PLANET_PARAMETERS,
  PLANET_TEXTURE_SLOTS,
  isPlanetRadius,
  type PlanetParameters,
  type PlanetTextureSlot
} from '@/core/contracts'

interface PlanetTextureConfig {
  uniformName: string
  colorSpace: ColorSpace
}

const PLANET_TEXTURE_CONFIG = {
  diffuse: {
    uniformName: 'diffuseMap',
    colorSpace: SRGBColorSpace
  },
  night: {
    uniformName: 'nightMap',
    colorSpace: SRGBColorSpace
  }
} satisfies Record<PlanetTextureSlot, PlanetTextureConfig>

function createDefaultMaterial(): ShaderMaterial {
  return new ShaderMaterial({
    ...StandardPlanetShader,
    uniforms: UniformsUtils.clone(StandardPlanetShader.uniforms ?? {})
  })
}

function closeTextureImage(image: unknown): void {
  if (!image || typeof image !== 'object') {
    return
  }

  const close = (image as { close?: unknown }).close

  if (typeof close === 'function') {
    close.call(image)
  }
}

class Planet {
  public readonly geometry: BufferGeometry
  public readonly material: ShaderMaterial
  public readonly object3D: Mesh<BufferGeometry, ShaderMaterial>

  private parameters: PlanetParameters
  private readonly textureRequestVersions: Record<PlanetTextureSlot, number> = {
    diffuse: 0,
    night: 0
  }
  private readonly ownedTextures: Set<Texture> = new Set()
  private disposed: boolean = false

  public constructor(geometry?: BufferGeometry, material?: ShaderMaterial) {
    this.geometry = geometry ?? new SphereGeometry(1, 128, 128)
    this.material = material ?? createDefaultMaterial()
    this.object3D = new Mesh(this.geometry, this.material)
    this.parameters = { ...DEFAULT_PLANET_PARAMETERS }

    this.setRadius(this.parameters.radius)
  }

  public get radius(): number {
    return this.parameters.radius
  }

  public applyParameters(parameters: Readonly<PlanetParameters>): void {
    if (parameters.radius !== this.parameters.radius) {
      this.setRadius(parameters.radius)
    }
  }

  public setRadius(radius: number): void {
    if (!isPlanetRadius(radius)) {
      throw new RangeError('Planet radius must be a finite positive number')
    }

    this.parameters.radius = radius
    this.object3D.scale.setScalar(radius)
  }

  public setDiffuse(diffuse: Texture): void {
    this.textureRequestVersions.diffuse += 1
    this.replaceTexture('diffuse', diffuse, false)
  }

  public setNight(night: Texture): void {
    this.textureRequestVersions.night += 1
    this.replaceTexture('night', night, false)
  }

  public async loadTexture(slot: PlanetTextureSlot, source: Blob): Promise<boolean> {
    if (this.disposed) {
      return false
    }

    const requestVersion = ++this.textureRequestVersions[slot]
    const texture = await this.createTexture(slot, source)

    if (this.disposed || requestVersion !== this.textureRequestVersions[slot]) {
      this.disposeTexture(texture)
      return false
    }

    this.replaceTexture(slot, texture, true)

    return true
  }

  public clearTexture(slot: PlanetTextureSlot): void {
    this.textureRequestVersions[slot] += 1
    this.replaceTexture(slot, null, false)
  }

  public dispose(): void {
    if (this.disposed) {
      return
    }

    this.disposed = true

    PLANET_TEXTURE_SLOTS.forEach((slot) => {
      this.textureRequestVersions[slot] += 1
      this.material.uniforms[PLANET_TEXTURE_CONFIG[slot].uniformName].value = null
    })
    Array.from(this.ownedTextures).forEach((texture) => this.disposeTexture(texture))
    this.geometry.dispose()
    this.material.dispose()
  }

  private async createTexture(slot: PlanetTextureSlot, source: Blob): Promise<Texture> {
    if (typeof createImageBitmap !== 'function') {
      throw new Error('Браузер не поддерживает декодирование выбранного изображения')
    }

    const image = await createImageBitmap(source, { imageOrientation: 'flipY' })
    const texture: Texture = new Texture(image)

    texture.colorSpace = PLANET_TEXTURE_CONFIG[slot].colorSpace
    texture.needsUpdate = true

    if ('name' in source && typeof source.name === 'string') {
      texture.name = source.name
    }

    return texture
  }

  private replaceTexture(slot: PlanetTextureSlot, texture: Texture | null, owned: boolean): void {
    const uniform = this.material.uniforms[PLANET_TEXTURE_CONFIG[slot].uniformName]
    const previousTexture = uniform.value as Texture | null

    if (previousTexture === texture) {
      return
    }

    uniform.value = texture

    if (previousTexture && this.ownedTextures.has(previousTexture)) {
      this.disposeTexture(previousTexture)
    }

    if (texture && owned) {
      this.ownedTextures.add(texture)
    }
  }

  private disposeTexture(texture: Texture): void {
    this.ownedTextures.delete(texture)
    texture.dispose()
    closeTextureImage(texture.image)
  }
}

export { Planet }
