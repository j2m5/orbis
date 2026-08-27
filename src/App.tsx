import { config } from '@/core/framework/config'
import TitanTopbar from '@titanui/components/TitanTopbar'
import AstroControlsPanel from '@/editor/components/AstroControlsPanel'
import OrbisSettingsPanel from '@/editor/components/OrbisSettingsPanel'
import PlanetPropertiesPanel from '@/editor/components/PlanetPropertiesPanel'

const App = () => {
  return (
    <>
      <TitanTopbar style={{ position: 'fixed', top: 0, zIndex: 999999, width: '100%' }}>{config('name')}</TitanTopbar>
      <div className="editor-left-sidebar titan-scrollbar">
        <OrbisSettingsPanel />
        <AstroControlsPanel />
      </div>
      <PlanetPropertiesPanel />
    </>
  )
}

export default App
