import { makeAutoObservable, observableRef } from 'mobx'
import {
  DEFAULT_ASTRO_CONTROLS_SETTINGS,
  DEFAULT_ORBIS_SETTINGS,
  DEFAULT_PLANET_PARAMETERS,
  isAstroControlsMouseRotationSpeed,
  isAstroControlsMovementSpeed,
  isAstroControlsRollSpeed,
  isOrbisGridDivisions,
  isOrbisGridOpacity,
  isOrbisGridSize,
  isOrbisRenderScale,
  isPlanetRadius,
  type AstroControlsSettings,
  type OrbisSettings,
  type PlanetParameters,
  type PlanetTextureSlot
} from '@/core/contracts'

class OrbisSettingsStore {
  public backgroundColor: string = DEFAULT_ORBIS_SETTINGS.backgroundColor
  public visibleGrid: boolean = DEFAULT_ORBIS_SETTINGS.visibleGrid
  public gridSize: number = DEFAULT_ORBIS_SETTINGS.gridSize
  public gridDivisions: number = DEFAULT_ORBIS_SETTINGS.gridDivisions
  public gridColor: string = DEFAULT_ORBIS_SETTINGS.gridColor
  public gridCenterColor: string = DEFAULT_ORBIS_SETTINGS.gridCenterColor
  public gridOpacity: number = DEFAULT_ORBIS_SETTINGS.gridOpacity
  public visibleAxes: boolean = DEFAULT_ORBIS_SETTINGS.visibleAxes
  public visibleLightMarker: boolean = DEFAULT_ORBIS_SETTINGS.visibleLightMarker
  public renderScale: number = DEFAULT_ORBIS_SETTINGS.renderScale

  public constructor() {
    makeAutoObservable(this, {}, { autoBind: true })
  }

  public get snapshot(): OrbisSettings {
    return {
      backgroundColor: this.backgroundColor,
      visibleGrid: this.visibleGrid,
      gridSize: this.gridSize,
      gridDivisions: this.gridDivisions,
      gridColor: this.gridColor,
      gridCenterColor: this.gridCenterColor,
      gridOpacity: this.gridOpacity,
      visibleAxes: this.visibleAxes,
      visibleLightMarker: this.visibleLightMarker,
      renderScale: this.renderScale
    }
  }

  public setVisibleGrid(visible: boolean): void {
    this.visibleGrid = visible
  }

  public setBackgroundColor(color: string): void {
    this.backgroundColor = color
  }

  public setGridSize(size: number): void {
    if (isOrbisGridSize(size)) {
      this.gridSize = size
    }
  }

  public setGridDivisions(divisions: number): void {
    if (isOrbisGridDivisions(divisions)) {
      this.gridDivisions = divisions
    }
  }

  public setGridColor(color: string): void {
    this.gridColor = color
  }

  public setGridCenterColor(color: string): void {
    this.gridCenterColor = color
  }

  public setGridOpacity(opacity: number): void {
    if (isOrbisGridOpacity(opacity)) {
      this.gridOpacity = opacity
    }
  }

  public setVisibleAxes(visible: boolean): void {
    this.visibleAxes = visible
  }

  public setVisibleLightMarker(visible: boolean): void {
    this.visibleLightMarker = visible
  }

  public setRenderScale(scale: number): void {
    if (isOrbisRenderScale(scale)) {
      this.renderScale = scale
    }
  }

  public reset(): void {
    this.backgroundColor = DEFAULT_ORBIS_SETTINGS.backgroundColor
    this.visibleGrid = DEFAULT_ORBIS_SETTINGS.visibleGrid
    this.gridSize = DEFAULT_ORBIS_SETTINGS.gridSize
    this.gridDivisions = DEFAULT_ORBIS_SETTINGS.gridDivisions
    this.gridColor = DEFAULT_ORBIS_SETTINGS.gridColor
    this.gridCenterColor = DEFAULT_ORBIS_SETTINGS.gridCenterColor
    this.gridOpacity = DEFAULT_ORBIS_SETTINGS.gridOpacity
    this.visibleAxes = DEFAULT_ORBIS_SETTINGS.visibleAxes
    this.visibleLightMarker = DEFAULT_ORBIS_SETTINGS.visibleLightMarker
    this.renderScale = DEFAULT_ORBIS_SETTINGS.renderScale
  }
}

type PlanetTextureLoadStatus = 'empty' | 'loading' | 'ready' | 'error'

class PlanetTextureAssetStore {
  public file: File | null = null
  public status: PlanetTextureLoadStatus = 'empty'
  public errorMessage: string | null = null
  public revision: number = 0

  public constructor() {
    makeAutoObservable(this, { file: observableRef }, { autoBind: true })
  }

  public get fileName(): string {
    return this.file?.name ?? ''
  }

  public selectFile(file: File): void {
    this.file = file
    this.revision += 1
    this.status = 'loading'
    this.errorMessage = null
  }

  public clear(): void {
    this.file = null
    this.revision += 1
    this.status = 'empty'
    this.errorMessage = null
  }

  public markLoading(revision: number): void {
    if (revision === this.revision && this.file) {
      this.status = 'loading'
      this.errorMessage = null
    }
  }

  public markReady(revision: number): void {
    if (revision === this.revision && this.file) {
      this.status = 'ready'
      this.errorMessage = null
    }
  }

  public markError(revision: number, message: string): void {
    if (revision === this.revision && this.file) {
      this.status = 'error'
      this.errorMessage = message
    }
  }
}

class PlanetStore {
  public radius: number = DEFAULT_PLANET_PARAMETERS.radius
  public readonly textures: Record<PlanetTextureSlot, PlanetTextureAssetStore> = {
    diffuse: new PlanetTextureAssetStore(),
    night: new PlanetTextureAssetStore()
  }

  public constructor() {
    makeAutoObservable(this, { textures: false }, { autoBind: true })
  }

  public get snapshot(): PlanetParameters {
    return {
      radius: this.radius
    }
  }

  public setRadius(radius: number): void {
    if (isPlanetRadius(radius)) {
      this.radius = radius
    }
  }
}

class AstroControlsSettingsStore {
  public enabled: boolean = DEFAULT_ASTRO_CONTROLS_SETTINGS.enabled
  public autoForward: boolean = DEFAULT_ASTRO_CONTROLS_SETTINGS.autoForward
  public movementSpeed: number = DEFAULT_ASTRO_CONTROLS_SETTINGS.movementSpeed
  public rollSpeed: number = DEFAULT_ASTRO_CONTROLS_SETTINGS.rollSpeed
  public mouseRotationSpeed: number = DEFAULT_ASTRO_CONTROLS_SETTINGS.mouseRotationSpeed

  public constructor() {
    makeAutoObservable(this, {}, { autoBind: true })
  }

  public get snapshot(): AstroControlsSettings {
    return {
      enabled: this.enabled,
      autoForward: this.autoForward,
      movementSpeed: this.movementSpeed,
      rollSpeed: this.rollSpeed,
      mouseRotationSpeed: this.mouseRotationSpeed
    }
  }

  public setEnabled(enabled: boolean): void {
    this.enabled = enabled
  }

  public setAutoForward(autoForward: boolean): void {
    this.autoForward = autoForward
  }

  public setMovementSpeed(speed: number): void {
    if (isAstroControlsMovementSpeed(speed)) {
      this.movementSpeed = speed
    }
  }

  public setRollSpeed(speed: number): void {
    if (isAstroControlsRollSpeed(speed)) {
      this.rollSpeed = speed
    }
  }

  public setMouseRotationSpeed(speed: number): void {
    if (isAstroControlsMouseRotationSpeed(speed)) {
      this.mouseRotationSpeed = speed
    }
  }
}

class EditorStore {
  public readonly orbis: OrbisSettingsStore
  public readonly planet: PlanetStore
  public readonly controls: AstroControlsSettingsStore

  public constructor() {
    this.orbis = new OrbisSettingsStore()
    this.planet = new PlanetStore()
    this.controls = new AstroControlsSettingsStore()
  }
}

export {
  AstroControlsSettingsStore,
  EditorStore,
  OrbisSettingsStore,
  PlanetStore,
  PlanetTextureAssetStore,
  type PlanetTextureLoadStatus
}
