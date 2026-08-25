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

class Orbis {
  public scene: Scene
  public camera: Camera
  public renderer: WebGLRenderer

  public controls: AstroControls

  declare private object3D: Object3D

  private readonly boundOnAnimate: () => void

  public constructor() {
    this.scene = new Scene()
    this.camera = new PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.0001, 5000)
    this.renderer = new WebGLRenderer({ logarithmicDepthBuffer: true, antialias: true })

    const sphere: Sphere = new Sphere(this.camera.position.clone(), 0.000001)
    this.controls = new AstroControls(this.camera, sphere, this.renderer.domElement)
    this.controls.movementSpeed = 0.0001

    this.scene.background = new Color(0x000000)
    this.renderer.setPixelRatio(devicePixelRatio)
    this.renderer.setSize(window.innerWidth, window.innerHeight)
    this.renderer.setClearColor(0x000000, 0)
    this.camera.position.set(0, 20, -50)
    this.camera.lookAt(new Vector3(0, 0, 0))

    this.boundOnAnimate = this.animate.bind(this)
  }

  public initialize(): void {
    const canvas: HTMLCanvasElement = this.renderer.domElement
    canvas.id = 'canvas'
    canvas.style.position = 'absolute'
    canvas.style.zIndex = '99'

    document.body.appendChild(canvas)

    const size = 500
    const divisions = 100
    const grid = new GridHelper(size, divisions)

    this.scene.add(grid)

    this.object3D = this.createSphere()
    this.scene.add(this.object3D)

    this.animate()
  }

  private createSphere(): Object3D {
    const geometry = new SphereGeometry(20, 64, 64)
    const material = new MeshBasicMaterial({ color: 0xfff000, wireframe: true })

    return new Mesh(geometry, material)
  }

  private animate(): void {
    this.controls.update(performance.now())
    this.renderer.render(this.scene, this.camera)
    this.renderer.setAnimationLoop(this.boundOnAnimate)
  }
}

export { Orbis }
