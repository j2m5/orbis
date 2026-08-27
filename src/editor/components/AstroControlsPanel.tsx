import { observer } from 'mobx-react-lite'
import TitanContainer from '@titanui/components/TitanContainer'
import TitanInput from '@titanui/components/TitanInput'
import TitanLabel from '@titanui/components/TitanLabel'
import TitanToggle from '@titanui/components/TitanToggle'
import {
  MIN_ASTRO_CONTROLS_MOUSE_ROTATION_SPEED,
  MIN_ASTRO_CONTROLS_MOVEMENT_SPEED,
  MIN_ASTRO_CONTROLS_ROLL_SPEED
} from '@/core/contracts'
import { useEditorStore } from '@/editor/store/EditorStoreContext'

const AstroControlsPanel = observer(() => {
  const { controls } = useEditorStore()

  return (
    <TitanContainer width={400} style={{ position: 'fixed', left: 10, top: 210, zIndex: 999999 }}>
      <div style={{ display: 'grid', gap: 12 }}>
        <TitanLabel size={14}>Управление камерой</TitanLabel>
        <TitanToggle label="Управление включено" checked={controls.enabled} onChange={controls.setEnabled} />
        <TitanToggle label="Автодвижение вперёд" checked={controls.autoForward} onChange={controls.setAutoForward} />
        <TitanInput
          type="number"
          label="Скорость перемещения"
          min={MIN_ASTRO_CONTROLS_MOVEMENT_SPEED}
          step={0.001}
          value={controls.movementSpeed}
          onChange={(value) => controls.setMovementSpeed(Number(value))}
        />
        <TitanInput
          type="number"
          label="Скорость вращения клавишами"
          min={MIN_ASTRO_CONTROLS_ROLL_SPEED}
          step={0.0001}
          value={controls.rollSpeed}
          onChange={(value) => controls.setRollSpeed(Number(value))}
        />
        <TitanInput
          type="number"
          label="Чувствительность вращения мышью"
          min={MIN_ASTRO_CONTROLS_MOUSE_ROTATION_SPEED}
          step={0.01}
          value={controls.mouseRotationSpeed}
          onChange={(value) => controls.setMouseRotationSpeed(Number(value))}
        />
      </div>
    </TitanContainer>
  )
})

export default AstroControlsPanel
