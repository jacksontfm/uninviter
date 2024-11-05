import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Landing from './components/0_Landing.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Landing/>
  </StrictMode>,
)
