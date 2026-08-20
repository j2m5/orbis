import { config } from '@/core/framework/config'
import TitanTopbar from '@titanui/components/TitanTopbar'
import TitanContainer from '@titanui/components/TitanContainer'
import TitanInput from '@titanui/components/TitanInput'
import { orbisStore } from '@/editor/store/OrbisStore'
import { observer } from 'mobx-react-lite'

const App = observer(() => {
  const handleBackgroundColorChange = (value: string) => {
    orbisStore.setBackgroundColor(value)
  }

  return (
    <>
      <TitanTopbar style={{ position: 'fixed', top: 0, zIndex: 999999, width: '100%' }}>{config('name')}</TitanTopbar>
      <TitanContainer width={400} style={{ position: 'fixed', right: 10, top: 80, zIndex: 999999 }}>
        <TitanInput
          type="color"
          label="Background"
          value={orbisStore.backgroundColor}
          onChange={handleBackgroundColorChange}
        />
      </TitanContainer>
    </>
  )
})

export default App
