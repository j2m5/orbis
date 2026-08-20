import { makeAutoObservable } from 'mobx'

class OrbisStore {
  public backgroundColor: string = '#000000'

  public constructor() {
    makeAutoObservable(this)
  }

  public setBackgroundColor(color: string) {
    this.backgroundColor = color
  }
}

export const orbisStore = new OrbisStore()
