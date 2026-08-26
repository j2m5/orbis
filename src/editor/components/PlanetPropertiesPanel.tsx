import { observer } from 'mobx-react-lite'
import TitanContainer from '@titanui/components/TitanContainer'
import TitanInput from '@titanui/components/TitanInput'
import { MIN_PLANET_RADIUS } from '@/core/contracts'
import { useEditorStore } from '@/editor/store/EditorStoreContext'

const PlanetPropertiesPanel = observer(() => {
  const { planet } = useEditorStore()

  const handleRadiusChange = (value: string): void => {
    planet.setRadius(Number(value))
  }

  return (
    <TitanContainer width={400} style={{ position: 'fixed', right: 10, top: 80, zIndex: 999999 }}>
      <TitanInput
        type="number"
        label="Радиус"
        min={MIN_PLANET_RADIUS}
        step={1}
        value={planet.radius}
        onChange={handleRadiusChange}
      />
    </TitanContainer>
  )
})

export default PlanetPropertiesPanel
