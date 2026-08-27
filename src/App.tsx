import { config } from '@/core/framework/config'
import TitanTopbar from '@titanui/components/TitanTopbar'
import AstroControlsPanel from '@/editor/components/AstroControlsPanel'
import OrbisSettingsPanel from '@/editor/components/OrbisSettingsPanel'
import PlanetPropertiesPanel from '@/editor/components/PlanetPropertiesPanel'

const App = () => {
  return (
    <>
      <TitanTopbar style={{ position: 'fixed', top: 0, zIndex: 999999, width: '100%' }}>{config('name')}</TitanTopbar>
      <OrbisSettingsPanel />
      <AstroControlsPanel />
      <PlanetPropertiesPanel />
    </>
  )
}

export default App
