import './styles/App.scss'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import { Orbis } from '@/core/Orbis'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

const orbis = new Orbis()
orbis.initialize()
