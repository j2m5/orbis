import { makeAutoObservable } from 'mobx'

class OrbisStore {
  public visibleGrid: boolean = true
  public backgroundColor: string = '#000000'
  public planetRadius: number = 6000

  public constructor() {
    makeAutoObservable(this)
  }

  public setVisibleGrid(visible: boolean): void {
    this.visibleGrid = visible
  }

  public setBackgroundColor(color: string): void {
    this.backgroundColor = color
  }

  public setPlanetRadius(radius: string): void {
    this.planetRadius = Number(radius)
  }
}

export const orbisStore = new OrbisStore()
