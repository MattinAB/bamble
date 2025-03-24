import { useState } from "react";
import { Drawer , Link, Portal , Button , CloseButton, VStack ,  Field , Input, useDisclosure, Spinner } from "@chakra-ui/react";
import { CiLogin } from "react-icons/ci";
import { useAuth } from "../services/authContext/AuthContext";
import AlertComponent from "./Alert";





export default function LoginModal(){
    const [email , setEmail] = useState('')
    const [password , setPassword] = useState('')
    const {onLogin , error , isLoading} = useAuth()
    const { open, onOpen, onClose  } = useDisclosure();

    const handleLogin = async () => {
        try{
       const user =  await onLogin(email , password)
            if(user){
                onClose()
            }
            setEmail('')
            setPassword('')
        }catch(error){
            console.log(error)
            setEmail('')
            setPassword('')

        }
    }
    return(
        <Drawer.Root  open={open}  onEscapeKeyDown={onClose} closeOnEscape  >
            <Drawer.Trigger asChild>
                 <Link onClick={onOpen}>
                     <CiLogin size='20px'  fontSize='5px' />
                             Login
                 </Link>
            </Drawer.Trigger>
            <Portal>
                <Drawer.Backdrop/>
            <Drawer.Positioner padding="4">
          <Drawer.Content rounded="md">
            <Drawer.Header>
              <Drawer.Title>Login</Drawer.Title>
            </Drawer.Header>
                <Drawer.Body >
                {isLoading ? <Spinner size='xl' style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                }} />:<VStack mb={2}>
                    <Field.Root>
                        <Field.Label fontSize="10px">Email:</Field.Label>
                            <Input
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            size={{base:"2xs" , md:"xs" ,lg:"md"}}
                            fontSize={{base: 'sm' , md:"sm" , lg:"md"}}
                            placeholder="Email"
                            type="email"
                            borderRadius={{base: '5xl', md: '10px' , lg:'15px'}}
                            />
                        <Field.Label fontSize="10px">Password:</Field.Label>
                            <Input
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            size={{base:"2xs" , md:"xs" ,lg:"md"}}
                            fontSize={{base: 'sm' , md:"sm" , lg:"md"}}
                            placeholder="Submit"
                            type="password"
                            borderRadius={{base: '5xl', md: '10px' , lg:'15px'}}
                             />
                    </Field.Root>
                </VStack>}
                {error && <AlertComponent alertMessage='Invalid username or password' />  }
                </Drawer.Body>
            <Drawer.Footer >
              <Button  variant="outline" onClick={onClose}>Cancel</Button>
              <Button disabled={isLoading} onClick={handleLogin}>Login</Button>
            </Drawer.Footer>
            <Drawer.CloseTrigger asChild>
              <CloseButton size="sm" />
            </Drawer.CloseTrigger>
          </Drawer.Content>
        </Drawer.Positioner>
            </Portal>
        </Drawer.Root>
        )
}