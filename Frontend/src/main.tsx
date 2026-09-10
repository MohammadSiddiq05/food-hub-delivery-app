import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { GoogleOAuthProvider } from '@react-oauth/google';
import { AppContextProvider } from './context/AppContext.tsx';

export const authService = "http://localhost:5000"
export const restaurantService = "http://localhost:5001"

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <GoogleOAuthProvider clientId="66028336425-nds509qa8a972t8p7isprtsodtcfhkv4.apps.googleusercontent.com">
     <AppContextProvider>
       <App />
     </AppContextProvider>
    </GoogleOAuthProvider>
  </StrictMode>,
)
