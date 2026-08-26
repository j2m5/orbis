import {
  BufferGeometry,
  Mesh,
  type Object3D,
  ShaderMaterial,
  SphereGeometry,
  Texture
} from 'three'
import { StandardPlanetShader } from '@/core/framework/shaders/StandardPlanetShader'
import { orbisStore } from '@/editor/store/OrbisStore'
import { EventEmitter } from '@/core/framework/events/EventEmitter'

class Planet extends EventEmitter<{ radiusChanged: [number] }> {
  declare public geometry: BufferGeometry
  declare public material: ShaderMaterial
  declare public object3D: Object3D

  public constructor(geometry?: BufferGeometry, material?: ShaderMaterial) {
    super()
    this.geometry = geometry ?? new SphereGeometry(1, 128, 128)
    this.material = material ?? new ShaderMaterial({ ...StandardPlanetShader })
  }

  public make(): Object3D {
    this.object3D = new Mesh(this.geometry, this.material)
    this.object3D.scale.setScalar(orbisStore.planetRadius)

    return this.object3D
  }

  public setRadius(radius: number): void {
    this.emit('radiusChanged', radius)
  }

  public setDiffuse(diffuse: Texture): void {
    this.material.uniforms.diffuseMap.value = diffuse
    this.material.needsUpdate = true
  }

  public setNight(night: Texture): void {
    this.material.uniforms.nightMap.value = night
    this.material.needsUpdate = true
  }
}

export { Planet }
