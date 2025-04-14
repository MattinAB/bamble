import Home from "./Screens/Home"
import { useLocation } from "react-router"; // 1. Import useLocation from react-router-dom


export const Layout = ({children}) => {
  const location = useLocation(); // 2. Get the current location object
  const isHomePage = location.pathname === '/'; // 3. Check if the path is the root '/'
  return (
   <>
   {isHomePage &&<Home/>}
   <main>{children}</main>
   </>
  )
}
