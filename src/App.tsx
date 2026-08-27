import { config } from '@/core/framework/config'
import TitanTopbar from '@titanui/components/TitanTopbar'
import AstroControlsPanel from '@/editor/components/AstroControlsPanel'
import OrbisSettingsPanel from '@/editor/components/OrbisSettingsPanel'
import PlanetPropertiesPanel from '@/editor/components/PlanetPropertiesPanel'
import PlanetTexturesPanel from '@/editor/components/PlanetTexturesPanel'

const App = () => {
  return (
    <>
      <TitanTopbar style={{ position: 'fixed', top: 0, zIndex: 999999, width: '100%' }}>{config('name')}</TitanTopbar>
      <div className="editor-sidebar editor-sidebar-left titan-scrollbar">
        <OrbisSettingsPanel />
        <AstroControlsPanel />
      </div>
      <div className="editor-sidebar editor-sidebar-right titan-scrollbar">
        <PlanetPropertiesPanel />
        <PlanetTexturesPanel />
      </div>
    </>
  )
}

export default App
