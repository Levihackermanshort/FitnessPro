import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { ThemeProvider } from '@/components/ThemeProvider'
import { AuthProvider } from '@/contexts/AuthContext'
import { Toaster } from '@/components/ui/sonner'
import './index.css'
import App from './App.tsx'

const baseUrl = import.meta.env.BASE_URL
const routerBasename =
  baseUrl === '/' || baseUrl === '' ? undefined : baseUrl.replace(/\/$/, '')

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider>
      <BrowserRouter basename={routerBasename}>
        <AuthProvider>
          <App />
          <Toaster />
        </AuthProvider>
      </BrowserRouter>
    </ThemeProvider>
  </StrictMode>,
)

if (import.meta.env.PROD && 'serviceWorker' in navigator) {
  const base = import.meta.env.BASE_URL
  const normalized = base.endsWith('/') ? base : `${base}/`
  window.addEventListener('load', () => {
    navigator.serviceWorker.register(`${normalized}sw.js`, { scope: normalized }).catch(() => {
      /* ignore registration failures (e.g. unsupported) */
    })
  })
}
