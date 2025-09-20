import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { validateEnvVars, logEnvInfo } from './utils/envValidation'

// Validate environment variables before starting the app
try {
  validateEnvVars();
  logEnvInfo();
} catch (error) {
  console.error('❌ Environment validation failed:', error.message);
  // You could show a user-friendly error page here instead of crashing
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
