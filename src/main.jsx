import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ChakraProvider, defaultSystem } from '@chakra-ui/react'
import { BrowserRouter } from'react-router-dom'

import './index.css'
import App from './App.jsx'
import AuthProvider from './services/authContext/AuthContext.jsx'
import CartContextProvider from './services/cartContext/CartContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    
    <ChakraProvider value={defaultSystem}>
      <BrowserRouter>
        <CartContextProvider>
            <AuthProvider>
                <App />
            </AuthProvider>
          </CartContextProvider>
      </BrowserRouter>
    </ChakraProvider>
  </StrictMode>,
)
