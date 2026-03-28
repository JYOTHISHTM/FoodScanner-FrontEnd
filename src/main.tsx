import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { GoogleOAuthProvider } from '@react-oauth/google'
import { AuthProvider } from "./context/AuthContext";



createRoot(document.getElementById('root')!).render(
  <GoogleOAuthProvider clientId='706114962131-mv4s355lqpq4ct7k4rf25md34q2jqosq.apps.googleusercontent.com'>
  <StrictMode>
    <AuthProvider>
    <App />
    </AuthProvider>
  </StrictMode>,
  </GoogleOAuthProvider>
)
