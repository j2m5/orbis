import {
  Color,
  GridHelper,
  ImageBitmapLoader,
  Mesh,
  MeshBasicMaterial,
  PerspectiveCamera,
  Scene,
  Sphere,
  SphereGeometry,
  Texture,
  Vector3,
  WebGLRenderer
} from 'three'
import { AstroControls } from '@/core/framework/controls/AstroControls'
import { Planet } from '@/core/renderable/Planet'
import { DEFAULT_ORBIS_SETTINGS, type AstroControlsSettings, type OrbisSettings } from '@/core/contracts'

class Orbis {
  public readonly scene: Scene
  public readonly camera: PerspectiveCamera
  public readonly renderer: WebGLRenderer
  public readonly controls: AstroControls
  public readonly planet: Planet

  private readonly origin: Vector3 = new Vector3(100000, 0, 0)
  private readonly boundOnAnimate: (time: number) => void
  private readonly boundOnResize: () => void
  private readonly textures: Texture[] = []

  private settings: OrbisSettings = { ...DEFAULT_ORBIS_SETTINGS }
  private grid: GridHelper | null = null
  private light: Mesh<SphereGeometry, MeshBasicMaterial> | null = null
  private initialized: boolean = false
  private disposed: boolean = false
  private lastFrameTime: number = 0

  public constructor() {
    this.scene = new Scene()
    this.camera = new PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.0001, 1500000)
    this.renderer = new WebGLRenderer({ logarithmicDepthBuffer: true, antialias: true })
    this.planet = new Planet()

    const cameraBoundary = new Sphere(this.camera.position.clone(), 0.000001)
    this.controls = new AstroControls(this.camera, cameraBoundary, this.renderer.domElement)
    this.controls.target.copy(this.origin)

    this.scene.background = new Color(this.settings.backgroundColor)
    this.renderer.setPixelRatio(devicePixelRatio)
    this.renderer.setSize(window.innerWidth, window.innerHeight)
    this.renderer.setClearColor('#000000', 0)
    this.camera.position.set(0, 0, -17000).add(this.origin)
    this.camera.lookAt(this.origin)

    this.boundOnAnimate = this.animate.bind(this)
    this.boundOnResize = this.resize.bind(this)
  }

  public initialize(container: HTMLElement = document.body): void {
    if (this.disposed) {
      throw new Error('Disposed Orbis instance cannot be initialized')
    }

    if (this.initialized) {
      return
    }

    this.initialized = true

    const canvas = this.renderer.domElement
    canvas.id = 'canvas'
    canvas.style.position = 'absolute'
    canvas.style.inset = '0'
    canvas.style.zIndex = '99'
    container.appendChild(canvas)

    this.grid = new GridHelper(1500000, 100)
    this.grid.visible = this.settings.visibleGrid
    this.scene.add(this.grid)

    this.planet.object3D.position.copy(this.origin)
    this.planet.object3D.rotateY((150 * Math.PI) / 180)
    this.scene.add(this.planet.object3D)

    this.light = this.createLight()
    this.scene.add(this.light)

    window.addEventListener('resize', this.boundOnResize)
    this.renderer.setAnimationLoop(this.boundOnAnimate)

    void this.loadTextures()
  }

  public applySettings(settings: Readonly<OrbisSettings>): void {
    if (settings.backgroundColor !== this.settings.backgroundColor) {
      this.scene.background = new Color(settings.backgroundColor)
    }

    if (this.grid && settings.visibleGrid !== this.settings.visibleGrid) {
      this.grid.visible = settings.visibleGrid
    }

    this.settings = { ...settings }
  }

  public applyControlsSettings(settings: Readonly<AstroControlsSettings>): void {
    this.controls.applySettings(settings)
  }

  public dispose(): void {
    if (this.disposed) {
      return
    }

    this.disposed = true
    this.renderer.setAnimationLoop(null)
    window.removeEventListener('resize', this.boundOnResize)
    this.controls.dispose()
    this.textures.forEach((texture) => texture.dispose())
    this.planet.dispose()

    if (this.grid) {
      this.grid.geometry.dispose()
      const materials = Array.isArray(this.grid.material) ? this.grid.material : [this.grid.material]
      materials.forEach((material) => material.dispose())
    }

    if (this.light) {
      this.light.geometry.dispose()
      this.light.material.dispose()
    }

    this.scene.clear()
    this.renderer.dispose()
    this.renderer.domElement.remove()
  }

  private createLight(): Mesh<SphereGeometry, MeshBasicMaterial> {
    const geometry = new SphereGeometry(1000, 32, 32)
    const material = new MeshBasicMaterial({ color: '#ffff00' })

    return new Mesh(geometry, material)
  }

  private animate(time: number): void {
    const delta = this.lastFrameTime === 0 ? 0 : Math.min(time - this.lastFrameTime, 100)
    this.lastFrameTime = time

    this.controls.update(delta)
    this.renderer.render(this.scene, this.camera)
  }

  private resize(): void {
    this.camera.aspect = window.innerWidth / window.innerHeight
    this.camera.updateProjectionMatrix()
    this.renderer.setPixelRatio(devicePixelRatio)
    this.renderer.setSize(window.innerWidth, window.innerHeight)
  }

  private async loadTextures(): Promise<void> {
    try {
      const loader = new ImageBitmapLoader()
      loader.setOptions({ imageOrientation: 'flipY' })

      const [diffuseBitmap, nightBitmap] = await Promise.all([
        loader.loadAsync('storage/moon.jpg'),
        loader.loadAsync('storage/night.jpg')
      ])
      const diffuse = new Texture(diffuseBitmap)
      const night = new Texture(nightBitmap)

      diffuse.needsUpdate = true
      night.needsUpdate = true

      if (this.disposed) {
        diffuse.dispose()
        night.dispose()
        return
      }

      this.textures.push(diffuse, night)
      this.planet.setDiffuse(diffuse)
      this.planet.setNight(night)
    } catch (error) {
      if (!this.disposed) {
        console.error('Error loading textures:', error)
      }
    }
  }
}

export { Orbis }
