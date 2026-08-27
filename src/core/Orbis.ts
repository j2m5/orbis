import {
  AxesHelper,
  Color,
  GridHelper,
  Mesh,
  MeshBasicMaterial,
  PerspectiveCamera,
  Scene,
  Sphere,
  SphereGeometry,
  Vector3,
  WebGLRenderer
} from 'three'
import { AstroControls } from '@/core/framework/controls/AstroControls'
import { Planet } from '@/core/renderable/Planet'
import { DEFAULT_ORBIS_SETTINGS, type AstroControlsSettings, type OrbisSettings } from '@/core/contracts'

const AXES_SIZE = 10000

class Orbis {
  public readonly scene: Scene
  public readonly camera: PerspectiveCamera
  public readonly renderer: WebGLRenderer
  public readonly controls: AstroControls
  public readonly planet: Planet

  private readonly origin: Vector3 = new Vector3(100000, 0, 0)
  private readonly boundOnAnimate: (time: number) => void
  private readonly boundOnResize: () => void

  private settings: OrbisSettings = { ...DEFAULT_ORBIS_SETTINGS }
  private grid: GridHelper | null = null
  private axes: AxesHelper | null = null
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
    this.resizeRenderer(this.settings.renderScale)
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

    this.grid = this.createGrid(this.settings)
    this.scene.add(this.grid)

    this.axes = new AxesHelper(AXES_SIZE)
    this.axes.position.copy(this.origin)
    this.axes.visible = this.settings.visibleAxes
    this.scene.add(this.axes)

    this.planet.object3D.position.copy(this.origin)
    this.planet.object3D.rotateY((150 * Math.PI) / 180)
    this.scene.add(this.planet.object3D)

    this.light = this.createLight()
    this.light.visible = this.settings.visibleLightMarker
    this.scene.add(this.light)

    window.addEventListener('resize', this.boundOnResize)
    this.renderer.setAnimationLoop(this.boundOnAnimate)
  }

  public applySettings(settings: Readonly<OrbisSettings>): void {
    const shouldRebuildGrid =
      settings.gridSize !== this.settings.gridSize ||
      settings.gridDivisions !== this.settings.gridDivisions ||
      settings.gridColor !== this.settings.gridColor ||
      settings.gridCenterColor !== this.settings.gridCenterColor
    const shouldResizeRenderer = settings.renderScale !== this.settings.renderScale

    if (settings.backgroundColor !== this.settings.backgroundColor) {
      this.scene.background = new Color(settings.backgroundColor)
    }

    if (this.grid) {
      if (shouldRebuildGrid) {
        this.replaceGrid(settings)
      } else {
        this.applyGridAppearance(this.grid, settings)
      }
    }

    if (this.axes) {
      this.axes.visible = settings.visibleAxes
    }

    if (this.light) {
      this.light.visible = settings.visibleLightMarker
    }

    this.settings = { ...settings }

    if (shouldResizeRenderer) {
      this.resizeRenderer(settings.renderScale)
    }
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
    this.planet.dispose()

    if (this.grid) {
      this.grid.dispose()
    }

    if (this.axes) {
      this.axes.dispose()
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

  private createGrid(settings: Readonly<OrbisSettings>): GridHelper {
    const grid = new GridHelper(settings.gridSize, settings.gridDivisions, settings.gridCenterColor, settings.gridColor)

    this.applyGridAppearance(grid, settings)

    return grid
  }

  private replaceGrid(settings: Readonly<OrbisSettings>): void {
    if (this.grid) {
      this.scene.remove(this.grid)
      this.grid.dispose()
    }

    this.grid = this.createGrid(settings)
    this.scene.add(this.grid)
  }

  private applyGridAppearance(grid: GridHelper, settings: Readonly<OrbisSettings>): void {
    const isTransparent = settings.gridOpacity < 1

    grid.visible = settings.visibleGrid
    grid.material.opacity = settings.gridOpacity
    grid.material.depthWrite = !isTransparent

    if (grid.material.transparent !== isTransparent) {
      grid.material.transparent = isTransparent
      grid.material.needsUpdate = true
    }
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

    this.resizeRenderer(this.settings.renderScale)
  }

  private resizeRenderer(renderScale: number): void {
    this.renderer.setPixelRatio(devicePixelRatio * renderScale)
    this.renderer.setSize(window.innerWidth, window.innerHeight)
  }
}

export { Orbis }
