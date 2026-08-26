import { createContext, useContext } from 'react'
import type { EditorStore } from '@/editor/store/EditorStore'

const EditorStoreContext = createContext<EditorStore | null>(null)

function useEditorStore(): EditorStore {
  const store = useContext(EditorStoreContext)

  if (!store) {
    throw new Error('useEditorStore must be used inside EditorStoreContext.Provider')
  }

  return store
}

export { EditorStoreContext, useEditorStore }
