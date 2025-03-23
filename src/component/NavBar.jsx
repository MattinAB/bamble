import { Box,Flex, Spacer } from "@chakra-ui/react";
import { GoSignOut } from "react-icons/go";
import LoginBox from "./LoginBox";
import { useAuth } from "../services/authContext/AuthContext";
import ButtonIcon from "./ButtonIcon";

export default function NavBar() {
    const {user} =useAuth()

const loginBox = {
    padding: '5px',
    borderRadius: '10px',
    boxShadow: '0px 0px 10px rgba(0,0,0,0.2)'
}
  

  return (
   <Flex 
        justify='center'
        align='center'
        w='100%'
   >
            <h1>My App</h1>
       
            <Spacer/>
         <Box sm={loginBox} w={{base:'180px' , md:'200px', lg:'200px'}}  >
            {user ? <ButtonIcon icon={<GoSignOut />}/> :  <LoginBox/>}
         </Box>
   </Flex>
  )
}
