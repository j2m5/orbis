import { observer } from 'mobx-react-lite'
import TitanButton from '@titanui/components/TitanButton'
import TitanContainer from '@titanui/components/TitanContainer'
import TitanInput from '@titanui/components/TitanInput'
import TitanLabel from '@titanui/components/TitanLabel'
import TitanToggle from '@titanui/components/TitanToggle'
import {
  MAX_ORBIS_GRID_DIVISIONS,
  MAX_ORBIS_GRID_OPACITY,
  MAX_ORBIS_RENDER_SCALE,
  MIN_ORBIS_GRID_DIVISIONS,
  MIN_ORBIS_GRID_OPACITY,
  MIN_ORBIS_GRID_SIZE,
  MIN_ORBIS_RENDER_SCALE
} from '@/core/contracts'
import { useEditorStore } from '@/editor/store/EditorStoreContext'

const OrbisSettingsPanel = observer(() => {
  const { orbis } = useEditorStore()

  return (
    <TitanContainer width={400}>
      <div style={{ display: 'grid', gap: 12 }}>
        <TitanLabel size={14}>Настройки сцены</TitanLabel>
        <TitanInput type="color" label="Цвет фона" value={orbis.backgroundColor} onChange={orbis.setBackgroundColor} />

        <TitanToggle label="Показывать сетку" checked={orbis.visibleGrid} onChange={orbis.setVisibleGrid} />
        <TitanInput
          type="number"
          label="Размер сетки"
          min={MIN_ORBIS_GRID_SIZE}
          step={1}
          value={orbis.gridSize}
          onChange={(value) => orbis.setGridSize(Number(value))}
        />
        <TitanInput
          type="number"
          label="Количество делений сетки"
          min={MIN_ORBIS_GRID_DIVISIONS}
          max={MAX_ORBIS_GRID_DIVISIONS}
          step={2}
          value={orbis.gridDivisions}
          onChange={(value) => orbis.setGridDivisions(Number(value))}
        />
        <TitanInput
          type="color"
          label="Цвет центральных линий"
          value={orbis.gridCenterColor}
          onChange={orbis.setGridCenterColor}
        />
        <TitanInput type="color" label="Цвет сетки" value={orbis.gridColor} onChange={orbis.setGridColor} />
        <TitanInput
          type="number"
          label="Прозрачность сетки"
          min={MIN_ORBIS_GRID_OPACITY}
          max={MAX_ORBIS_GRID_OPACITY}
          step={0.05}
          value={orbis.gridOpacity}
          onChange={(value) => {
            if (value.trim() !== '') {
              orbis.setGridOpacity(Number(value))
            }
          }}
        />

        <TitanToggle label="Показывать оси" checked={orbis.visibleAxes} onChange={orbis.setVisibleAxes} />
        <TitanToggle
          label="Показывать маркер источника света"
          checked={orbis.visibleLightMarker}
          onChange={orbis.setVisibleLightMarker}
        />

        <TitanInput
          type="number"
          label="Масштаб рендера"
          min={MIN_ORBIS_RENDER_SCALE}
          max={MAX_ORBIS_RENDER_SCALE}
          step={0.05}
          value={orbis.renderScale}
          onChange={(value) => orbis.setRenderScale(Number(value))}
        />
        <TitanButton onClick={orbis.reset}>Сбросить настройки сцены</TitanButton>
      </div>
    </TitanContainer>
  )
})

export default OrbisSettingsPanel
