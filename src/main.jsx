import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ChakraProvider, defaultSystem } from '@chakra-ui/react'
import { createBrowserRouter } from 'react-router-dom'

import './index.css'
import App from './App.jsx'
import AuthProvider from './services/authContext/AuthContext.jsx'
import CartContextProvider from './services/cartContext/CartContext.jsx'
import { RouterProvider } from 'react-router'
import { PhoneNumber_auth } from './component/Screens/phoneNumber-Auth/PhoneNumber_auth.jsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {path:'/phone-auth', element: <PhoneNumber_auth/>},
    ]
  },
])



createRoot(document.getElementById('root')).render(
  <StrictMode>
    
    <ChakraProvider value={defaultSystem}>
        <CartContextProvider>
            <AuthProvider>
                <RouterProvider router={router} />
            </AuthProvider>
          </CartContextProvider>
    </ChakraProvider>
  </StrictMode>,
)
