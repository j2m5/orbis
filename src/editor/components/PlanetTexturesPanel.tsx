import { observer } from 'mobx-react-lite'
import TitanContainer from '@titanui/components/TitanContainer'
import TitanFileInput from '@titanui/components/TitanFileInput'
import TitanLabel from '@titanui/components/TitanLabel'
import { PLANET_TEXTURE_SLOTS, type PlanetTextureSlot } from '@/core/contracts'
import type { PlanetTextureAssetStore } from '@/editor/store/EditorStore'
import { useEditorStore } from '@/editor/store/EditorStoreContext'

const PLANET_TEXTURE_LABELS: Record<PlanetTextureSlot, string> = {
  diffuse: 'Диффузная текстура',
  night: 'Ночная текстура'
}

function getTextureMessage(asset: PlanetTextureAssetStore): string | undefined {
  switch (asset.status) {
    case 'loading':
      return 'Декодирование изображения…'
    case 'ready':
      return 'Текстура загружена'
    case 'error':
      return asset.errorMessage ?? 'Не удалось загрузить изображение'
    case 'empty':
      return undefined
  }
}

const PlanetTexturesPanel = observer(() => {
  const { planet } = useEditorStore()

  return (
    <TitanContainer width={400}>
      <div style={{ display: 'grid', gap: 12 }}>
        <TitanLabel size={14}>Текстуры планеты</TitanLabel>
        {PLANET_TEXTURE_SLOTS.map((slot) => {
          const asset = planet.textures[slot]

          return (
            <TitanFileInput
              key={slot}
              accept="image/*"
              label={PLANET_TEXTURE_LABELS[slot]}
              fileName={asset.fileName}
              message={getTextureMessage(asset)}
              invalid={asset.status === 'error'}
              onChange={asset.selectFile}
              onClear={asset.clear}
            />
          )
        })}
      </div>
    </TitanContainer>
  )
})

export default PlanetTexturesPanel
