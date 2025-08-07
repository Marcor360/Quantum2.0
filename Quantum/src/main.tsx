import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter } from 'react-router-dom'
declare global {
  interface Window {
    initialPath?: string;
    homeLoaderShown?: boolean;
  }
}

if (typeof window !== 'undefined') {
  window.initialPath = window.location.pathname;
}
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
)
