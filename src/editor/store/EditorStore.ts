import { makeAutoObservable } from 'mobx'
import {
  DEFAULT_ASTRO_CONTROLS_SETTINGS,
  DEFAULT_ORBIS_SETTINGS,
  DEFAULT_PLANET_PARAMETERS,
  isAstroControlsMouseRotationSpeed,
  isAstroControlsMovementSpeed,
  isAstroControlsRollSpeed,
  isPlanetRadius,
  type AstroControlsSettings,
  type OrbisSettings,
  type PlanetParameters
} from '@/core/contracts'

class OrbisSettingsStore {
  public visibleGrid: boolean = DEFAULT_ORBIS_SETTINGS.visibleGrid
  public backgroundColor: string = DEFAULT_ORBIS_SETTINGS.backgroundColor

  public constructor() {
    makeAutoObservable(this, {}, { autoBind: true })
  }

  public get snapshot(): OrbisSettings {
    return {
      visibleGrid: this.visibleGrid,
      backgroundColor: this.backgroundColor
    }
  }

  public setVisibleGrid(visible: boolean): void {
    this.visibleGrid = visible
  }

  public setBackgroundColor(color: string): void {
    this.backgroundColor = color
  }
}

class PlanetParametersStore {
  public radius: number = DEFAULT_PLANET_PARAMETERS.radius

  public constructor() {
    makeAutoObservable(this, {}, { autoBind: true })
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
  public readonly planet: PlanetParametersStore
  public readonly controls: AstroControlsSettingsStore

  public constructor() {
    this.orbis = new OrbisSettingsStore()
    this.planet = new PlanetParametersStore()
    this.controls = new AstroControlsSettingsStore()
  }
}

export { AstroControlsSettingsStore, EditorStore, OrbisSettingsStore, PlanetParametersStore }
