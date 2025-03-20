import { Box, Button, Flex, Spacer } from "@chakra-ui/react";

export default function NavBar() {


    const buttonActivity = {
        text: 'Active',
        color: 'green.500',
        
        _hover: {
            bg: 'gray.200',
            color: 'gray.800'
        }
        ,
        _active: {
            bg: 'green.300',
            color: 'white'
        }
    }


  return (
   <Flex 
        justify='center'
        align='center'
   >
        <Box>
            <h1>My App</h1>
        </Box>
            <Spacer/>
        <Box>
            <Button 
                size={{base:'2xs' , md:'xs' , lg:'md'}}
                bg={{base:'green.200' , md:'green.200' , lg:'green.200'}}
                color={{base:'gray.800' , md:'gray.800' , lg:'gray.800'}}
                borderRadius={{ base:'4xl' , md:'5xl' , lg:'5xl'}}
                sm={buttonActivity}
            >Login</Button>
        </Box>
   </Flex>
  )
}
