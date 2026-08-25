import { config } from '@/core/framework/config'
import TitanTopbar from '@titanui/components/TitanTopbar'
import TitanContainer from '@titanui/components/TitanContainer'
import TitanInput from '@titanui/components/TitanInput'
import { orbisStore } from '@/editor/store/OrbisStore'
import { observer } from 'mobx-react-lite'
import TitanToggle from '@titanui/components/TitanToggle.tsx'

const App = observer(() => {
  const handleGridVisibilityChange = (value: boolean) => {
    orbisStore.setVisibleGrid(value)
  }

  const handleBackgroundColorChange = (value: string) => {
    orbisStore.setBackgroundColor(value)
  }

  return (
    <>
      <TitanTopbar style={{ position: 'fixed', top: 0, zIndex: 999999, width: '100%' }}>{config('name')}</TitanTopbar>
      <TitanContainer width={400} style={{ position: 'fixed', left: 10, top: 80, zIndex: 999999 }}>
        <TitanToggle label="Показывать сетку" checked={orbisStore.visibleGrid} onChange={handleGridVisibilityChange} />
        <TitanInput
          type="color"
          label="Цвет фона"
          value={orbisStore.backgroundColor}
          onChange={handleBackgroundColorChange}
        />
      </TitanContainer>
      <TitanContainer width={400} style={{ position: 'fixed', right: 10, top: 80, zIndex: 999999 }}>123</TitanContainer>
    </>
  )
})

export default App
