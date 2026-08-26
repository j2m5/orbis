import { observer } from 'mobx-react-lite'
import TitanContainer from '@titanui/components/TitanContainer'
import TitanInput from '@titanui/components/TitanInput'
import TitanToggle from '@titanui/components/TitanToggle'
import { useEditorStore } from '@/editor/store/EditorStoreContext'

const OrbisSettingsPanel = observer(() => {
  const { orbis } = useEditorStore()

  return (
    <TitanContainer width={400} style={{ position: 'fixed', left: 10, top: 80, zIndex: 999999 }}>
      <TitanToggle label="Показывать сетку" checked={orbis.visibleGrid} onChange={orbis.setVisibleGrid} />
      <TitanInput type="color" label="Цвет фона" value={orbis.backgroundColor} onChange={orbis.setBackgroundColor} />
    </TitanContainer>
  )
})

export default OrbisSettingsPanel
