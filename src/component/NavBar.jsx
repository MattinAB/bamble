import { Flex, Spacer , Image , Text } from "@chakra-ui/react";
import { FaSignOutAlt } from "react-icons/fa";
import LoginBox from "./LoginBox";
import { useAuth } from "../services/authContext/AuthContext";
import bambleLogo from '../assets/bambleLogo.png'
import { getAuth, signOut } from "firebase/auth";
import ButtonIcon from "./ButtonIcon";
import CartModal from "./CartModal";
import { useEffect , useState } from "react";

export default function NavBar() {
  const [name , setName] = useState('')
    const {user} =useAuth()

    useEffect(()=>{
      const displayName = user?.email?.split('@')[0]
      setName(displayName)
    },[user])


      const loginBox = {
      
        padding: '5px',
        borderRadius: '10px',
        boxShadow: '0px 0px 10px rgba(0,0,0,0.2)'
          }

      const signOutHandler = async ()=>{
        const auth = getAuth()
        await signOut(auth)
      }
  

  return (
   <Flex 
      
        w='100%'
   >
            <Image  src={bambleLogo}  boxSize={{base:'40px' , md:'50px', lg:'80px'}} />
            <Spacer />
            <Flex spaceX={4} sm={loginBox} justify='center' align='center' >
            {user && <Text fontSize={{base:'10px' , md:'15px', lg:'20px'}} color='gray.800' >{name} ! مرحبا</Text>}
            {user ? <ButtonIcon onClick={signOutHandler}   p={1}    _hover={{ backgroundColor: 'gray.500'}}><FaSignOutAlt size='30px'  />تسجيل الخروج </ButtonIcon> :  <LoginBox/>}
             <CartModal/>
         </Flex>
   </Flex>
  )
}
