import { Input , Field , Button , Flex  } from '@chakra-ui/react'




export default function LoginForm() {
  
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
      <Field.Root >
                <Flex direction='row' gap={{base:1, md:2, lg:3}} align='center' >
                        <Field.Label fontSize="10px">Email:</Field.Label>
                        <Input
                            size="2xs"
                            placeholder="Email"
                            type="email"
                            borderRadius={{base: '5xl', md: '10px' , lg:'15px'}}
                        />
                        <Field.Label fontSize="10px">Password:</Field.Label>
                        <Input
                            size="2xs"
                            fontSize={{base: '5px'}}
                            placeholder="Submit"
                            type="password"
                            borderRadius={{base: '5xl', md: '10px' , lg:'15px'}}
                        />
                    <Button 
                                    size={{base:'xs' , md:'xs' , lg:'md'}}
                                    fontWeight="semibold"
                                    fontSize={{base:'5px' , md:'10px' , lg:'12px'}}
                                    bg={{base:'green.200' , md:'green.200' , lg:'green.200'}}
                                    color={{base:'gray.800' , md:'gray.800' , lg:'gray.800'}}
                                    borderRadius={{ base:'4xl' , md:'5xl' , lg:'5xl'}}
                                    sm={buttonActivity}
                                >Login</Button>
             </Flex>
    </Field.Root>
    
        
  ) 
}
