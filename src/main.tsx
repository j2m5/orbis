import './styles/App.scss'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { configure } from 'mobx'
import App from './App'
import { Orbis } from '@/core/Orbis'
import { EditorStore } from '@/editor/store/EditorStore'
import { EditorStoreContext } from '@/editor/store/EditorStoreContext'
import { OrbisEditorBridge } from '@/editor/runtime/OrbisEditorBridge'

configure({ enforceActions: 'always' })

const rootElement = document.getElementById('root')

if (!rootElement) {
  throw new Error('Root element was not found')
}

const editorStore = new EditorStore()
const orbis = new Orbis()
const bridge = new OrbisEditorBridge(editorStore, orbis)
const root = createRoot(rootElement)

bridge.connect()
orbis.initialize()

root.render(
  <StrictMode>
    <EditorStoreContext.Provider value={editorStore}>
      <App />
    </EditorStoreContext.Provider>
  </StrictMode>
)

if (import.meta.hot) {
  import.meta.hot.dispose(() => {
    bridge.dispose()
    orbis.dispose()
    root.unmount()
  })
}
