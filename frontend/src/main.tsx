import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { i18nReady } from './lib/i18n'
import { applyUiFont } from './lib/ui-fonts'
import { applyUiFontScale } from './lib/ui-font-scale'
import App from './App.tsx'

applyUiFont(null)
applyUiFontScale(null)

// Honour a persisted language before rendering any translated UI.
void i18nReady.then(() => {
  createRoot(document.getElementById('root')!).render(
    <StrictMode>
      <App />
    </StrictMode>,
  )
})
