import { Box,Flex, Spacer , Image } from "@chakra-ui/react";
import { FaSignOutAlt } from "react-icons/fa";
import LoginBox from "./LoginBox";
import { useAuth } from "../services/authContext/AuthContext";
import bambleLogo from '../assets/bambleLogo.png'
import { getAuth, signOut } from "firebase/auth";
import ButtonIcon from "./ButtonIcon";

export default function NavBar() {
    const {user} =useAuth()

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
        justify='center'
        align='center'
        w='100%'
   >
            <Image  src={bambleLogo}  boxSize={{base:'40px' , md:'50px', lg:'80px'}} />
            <Spacer />
            <Box sm={loginBox} justifyItems={{base:'right' , md:'left', lg:'left'}} w={{base:'180px' , md:'200px', lg:'200px'}}  >
            {user ? <ButtonIcon onClick={signOutHandler}   p={1}    _hover={{ backgroundColor: 'gray.500'}}><FaSignOutAlt size='30px'  />Signout </ButtonIcon> :  <LoginBox/>}
         </Box>
   </Flex>
  )
}
