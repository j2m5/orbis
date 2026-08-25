import {
  Camera,
  Mesh,
  MeshBasicMaterial,
  Object3D,
  PerspectiveCamera,
  Scene,
  SphereGeometry,
  Vector3,
  WebGLRenderer,
  Color,
  GridHelper, Sphere
} from 'three'
import { AstroControls } from '@/core/framework/controls/AstroControls'
import { orbisStore } from '@/editor/store/OrbisStore'
import { Planet } from '@/core/renderable/Planet.ts'

class Orbis {
  public scene: Scene
  public camera: Camera
  public renderer: WebGLRenderer

  public controls: AstroControls

  declare private object3D: Object3D
  declare private grid: GridHelper

  private origin: Vector3 = new Vector3(100000, 0, 0)
  private color: Color = new Color()

  private readonly boundOnAnimate: () => void

  public constructor() {
    this.scene = new Scene()
    this.camera = new PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.0001, 1500000)
    this.renderer = new WebGLRenderer({ logarithmicDepthBuffer: true, antialias: true })

    const sphere: Sphere = new Sphere(this.camera.position.clone(), 0.000001)
    this.controls = new AstroControls(this.camera, sphere, this.renderer.domElement)
    this.controls.target = new Vector3(0, 0, 0).add(this.origin)
    this.controls.movementSpeed = 0.1

    this.scene.background = new Color(orbisStore.backgroundColor)
    this.renderer.setPixelRatio(devicePixelRatio)
    this.renderer.setSize(window.innerWidth, window.innerHeight)
    this.renderer.setClearColor('#000000', 0)
    this.camera.position.set(0, 0, -17000).add(this.origin)
    this.camera.lookAt(new Vector3(0, 0, 0).add(this.origin))

    this.boundOnAnimate = this.animate.bind(this)
  }

  public initialize(): void {
    const canvas: HTMLCanvasElement = this.renderer.domElement
    canvas.id = 'canvas'
    canvas.style.position = 'absolute'
    canvas.style.zIndex = '99'

    document.body.appendChild(canvas)

    const size = 1500000
    const divisions = 100
    this.grid = new GridHelper(size, divisions)

    this.scene.add(this.grid)


    const sphere = new Planet()
    this.object3D = sphere.make()
    this.object3D.position.set(0, 0, 0).add(this.origin)
    this.scene.add(this.object3D)

    this.scene.add(this.createLight())

    this.animate()
  }

  private createLight(): Object3D {
    const geometry = new SphereGeometry(1000, 32, 32)
    const material = new MeshBasicMaterial({ color: '#ffff00' })

    return new Mesh(geometry, material)
  }

  private update(): void {
    this.grid.visible = orbisStore.visibleGrid
    this.scene.background = this.color.set(orbisStore.backgroundColor)
  }

  private animate(): void {
    this.update()
    this.controls.update(performance.now())
    this.renderer.render(this.scene, this.camera)
    this.renderer.setAnimationLoop(this.boundOnAnimate)
  }
}

export { Orbis }
