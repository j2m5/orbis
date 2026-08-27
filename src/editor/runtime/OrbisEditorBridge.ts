import { compareStructural, reaction, type IReactionDisposer } from 'mobx'
import type { Orbis } from '@/core/Orbis'
import type { EditorStore } from '@/editor/store/EditorStore'

class OrbisEditorBridge {
  private readonly store: EditorStore
  private readonly orbis: Orbis
  private disposers: IReactionDisposer[] = []

  public constructor(store: EditorStore, orbis: Orbis) {
    this.store = store
    this.orbis = orbis
  }

  public connect(): void {
    if (this.disposers.length > 0) {
      return
    }

    this.disposers = [
      reaction(
        () => this.store.orbis.snapshot,
        (settings) => this.orbis.applySettings(settings),
        {
          equals: compareStructural,
          fireImmediately: true
        }
      ),
      reaction(
        () => this.store.controls.snapshot,
        (settings) => this.orbis.applyControlsSettings(settings),
        {
          equals: compareStructural,
          fireImmediately: true
        }
      ),
      reaction(
        () => this.store.planet.snapshot,
        (parameters) => this.orbis.planet.applyParameters(parameters),
        {
          equals: compareStructural,
          fireImmediately: true
        }
      )
    ]
  }

  public dispose(): void {
    this.disposers.forEach((dispose) => dispose())
    this.disposers = []
  }
}

export { OrbisEditorBridge }
