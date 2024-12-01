import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import CoinContextProvider from './context/CoinContext.jsx'
import { ThemeProvider } from './context/ThemeContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
     < CoinContextProvider >
     <ThemeProvider>
     <App />
     </ThemeProvider>
         
     </CoinContextProvider>
   
  </StrictMode>,
)
