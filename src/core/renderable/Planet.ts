import { BufferGeometry, Mesh, ShaderMaterial, SphereGeometry, Texture, UniformsUtils } from 'three'
import { StandardPlanetShader } from '@/core/framework/shaders/StandardPlanetShader'
import { DEFAULT_PLANET_PARAMETERS, isPlanetRadius, type PlanetParameters } from '@/core/contracts'

function createDefaultMaterial(): ShaderMaterial {
  return new ShaderMaterial({
    ...StandardPlanetShader,
    uniforms: UniformsUtils.clone(StandardPlanetShader.uniforms ?? {})
  })
}

class Planet {
  public readonly geometry: BufferGeometry
  public readonly material: ShaderMaterial
  public readonly object3D: Mesh<BufferGeometry, ShaderMaterial>

  private parameters: PlanetParameters

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
    this.material.uniforms.diffuseMap.value = diffuse
  }

  public setNight(night: Texture): void {
    this.material.uniforms.nightMap.value = night
  }

  public dispose(): void {
    this.geometry.dispose()
    this.material.dispose()
  }
}

export { Planet }
