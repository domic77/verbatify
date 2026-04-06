import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ClerkProvider } from '@clerk/clerk-react'
import './index.css'
import App from './App.tsx'

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

const root = createRoot(document.getElementById('root')!)

if (!PUBLISHABLE_KEY) {
  root.render(
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: '#0A0F1E', color: 'white', fontFamily: 'sans-serif', padding: '20px', textAlign: 'center' }}>
      <div>
        <h2 style={{ color: '#EF4444', marginBottom: '16px' }}>Missing Clerk Publishable Key</h2>
        <p>Please add <code>VITE_CLERK_PUBLISHABLE_KEY</code> to your <code>.env.local</code> file and restart your dev server.</p>
      </div>
    </div>
  )
} else {
  root.render(
    <StrictMode>
      <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
        <App />
      </ClerkProvider>
    </StrictMode>,
  )
}
