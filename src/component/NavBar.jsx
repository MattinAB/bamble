import { Box, Button, Flex, Spacer } from "@chakra-ui/react";
import LoginForm from './LoginForm'

export default function NavBar() {

const loginBox = {
    
    padding: '10px',
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
         <Box sm={loginBox} w={{base:'200px' , md:'300px', lg:'400px'}}  >
            
            <LoginForm/>
         </Box>
   </Flex>
  )
}
