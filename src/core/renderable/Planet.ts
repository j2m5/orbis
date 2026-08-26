import {
  BufferGeometry,
  Mesh,
  type Object3D,
  ShaderMaterial,
  SphereGeometry,
  Texture
} from 'three'
import { StandardPlanetShader } from '@/core/framework/shaders/StandardPlanetShader'

interface GeometryProps {
  radius: number
  widthSegments: number
  heightSegments: number
}

class Planet {
  declare public geometry: BufferGeometry
  declare public material: ShaderMaterial
  declare public object3D: Object3D

  public geoProps: GeometryProps = {
    radius: 6000,
    widthSegments: 128,
    heightSegments: 128
  }

  public constructor(geometry?: BufferGeometry, material?: ShaderMaterial) {
    this.geometry = geometry ?? new SphereGeometry(this.geoProps.radius, this.geoProps.widthSegments, this.geoProps.heightSegments)
    this.material = material ?? new ShaderMaterial({ ...StandardPlanetShader })
  }

  public make(): Object3D {
    this.object3D = new Mesh(this.geometry, this.material)

    return this.object3D
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
