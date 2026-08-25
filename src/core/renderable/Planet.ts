import {
  BufferGeometry,
  Material,
  Mesh,
  MeshBasicMaterial,
  type Object3D,
  SphereGeometry
} from 'three'

class Planet {
  declare public geometry: BufferGeometry
  declare public material: Material
  declare public object3D: Object3D

  public constructor(geometry?: BufferGeometry, material?: Material) {
    this.geometry = geometry ?? new SphereGeometry(6000, 128, 128)
    this.material = material ?? new MeshBasicMaterial({ color: '#ffffff', wireframe: true })
  }

  public make(): Object3D {
    this.object3D = new Mesh(this.geometry, this.material)

    return this.object3D
  }
}

export { Planet }
