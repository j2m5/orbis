import { makeAutoObservable } from 'mobx'
import {
  DEFAULT_ORBIS_SETTINGS,
  DEFAULT_PLANET_PARAMETERS,
  isPlanetRadius,
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

class EditorStore {
  public readonly orbis: OrbisSettingsStore
  public readonly planet: PlanetParametersStore

  public constructor() {
    this.orbis = new OrbisSettingsStore()
    this.planet = new PlanetParametersStore()
  }
}

export { EditorStore, OrbisSettingsStore, PlanetParametersStore }
