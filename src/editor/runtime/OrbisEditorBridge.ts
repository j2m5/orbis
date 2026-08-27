import { compareStructural, reaction, type IReactionDisposer } from 'mobx'
import { PLANET_TEXTURE_SLOTS, type PlanetTextureSlot } from '@/core/contracts'
import type { Orbis } from '@/core/Orbis'
import type { EditorStore, PlanetTextureAssetStore } from '@/editor/store/EditorStore'

function getTextureLoadErrorMessage(error: unknown): string {
  if (error instanceof Error && error.message.trim()) {
    return error.message
  }

  return 'Не удалось загрузить выбранное изображение'
}

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
      ),
      ...PLANET_TEXTURE_SLOTS.map((slot) => this.createPlanetTextureReaction(slot, this.store.planet.textures[slot]))
    ]
  }

  public dispose(): void {
    this.disposers.forEach((dispose) => dispose())
    this.disposers = []
  }

  private createPlanetTextureReaction(slot: PlanetTextureSlot, asset: PlanetTextureAssetStore): IReactionDisposer {
    return reaction(
      () => asset.revision,
      () => {
        void this.syncPlanetTexture(slot, asset)
      },
      { fireImmediately: true }
    )
  }

  private async syncPlanetTexture(slot: PlanetTextureSlot, asset: PlanetTextureAssetStore): Promise<void> {
    const revision = asset.revision
    const file = asset.file

    if (!file) {
      this.orbis.planet.clearTexture(slot)
      return
    }

    asset.markLoading(revision)

    try {
      const applied = await this.orbis.planet.loadTexture(slot, file)

      if (applied) {
        asset.markReady(revision)
      } else {
        asset.markError(revision, 'Загрузка текстуры была отменена')
      }
    } catch (error) {
      asset.markError(revision, getTextureLoadErrorMessage(error))
    }
  }
}

export { OrbisEditorBridge }
