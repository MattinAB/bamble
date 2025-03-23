import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ChakraProvider, defaultSystem } from '@chakra-ui/react'
import { BrowserRouter } from'react-router-dom'

import './index.css'
import App from './App.jsx'
import AuthProvider from './services/authContext/AuthContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    
    <ChakraProvider value={defaultSystem}>
      <BrowserRouter>
        <AuthProvider>
          <App />
        </AuthProvider>
      </BrowserRouter>
    </ChakraProvider>
  </StrictMode>,
)
