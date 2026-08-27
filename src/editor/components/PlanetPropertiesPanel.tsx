import { observer } from 'mobx-react-lite'
import TitanContainer from '@titanui/components/TitanContainer'
import TitanInput from '@titanui/components/TitanInput'
import TitanLabel from '@titanui/components/TitanLabel'
import { MIN_PLANET_RADIUS } from '@/core/contracts'
import { useEditorStore } from '@/editor/store/EditorStoreContext'

const PlanetPropertiesPanel = observer(() => {
  const { planet } = useEditorStore()

  const handleRadiusChange = (value: string): void => {
    planet.setRadius(Number(value))
  }

  return (
    <TitanContainer width={400}>
      <div style={{ display: 'grid', gap: 12 }}>
        <TitanLabel size={14}>Параметры планеты</TitanLabel>
        <TitanInput
          type="number"
          label="Радиус"
          min={MIN_PLANET_RADIUS}
          step={1}
          value={planet.radius}
          onChange={handleRadiusChange}
        />
      </div>
    </TitanContainer>
  )
})

export default PlanetPropertiesPanel
