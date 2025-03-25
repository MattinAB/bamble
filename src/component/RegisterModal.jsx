import { useState } from "react";
import { Drawer , Link, Portal , Button , CloseButton, VStack ,  Field , Input, useDisclosure, Spinner  , Text} from "@chakra-ui/react";
import { useAuth } from "../services/authContext/AuthContext";
import {SiGnuprivacyguard} from 'react-icons/si'
import AlertComponent from './Alert'





export default function RegisterModal(){
        const [email , setEmail] = useState('')
        const [password , setPassword] = useState('')
        const [confirmPassword , setConfirmPassword] = useState('')
        const [passwordError , setPasswordError] = useState('')

        const {isLoading , error ,  onRegister , setError } = useAuth()

       const { open, onOpen, onClose } = useDisclosure();


       const handleLogin = async()=>{
            if(password !== confirmPassword){
                setPasswordError('Passwords do not match')
                return
            }
            setPasswordError('')
           try {
               const result = await onRegister(email , password)
               if(result){
                    onClose()
                }
            } catch (error) {
                console.error(error)

            }
       }
    return (
        <Drawer.Root  open={open}  onEscapeKeyDown={onClose}  closeOnEscape  >
                    <Drawer.Trigger asChild>
                        <Link onClick={()=>{
                                setError(null)
                                onOpen()
                        }}>
                            <SiGnuprivacyguard size='20px'  fontSize='5px'  />
                                Signup 
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
                                            placeholder="Password"
                                            type="password"
                                            borderRadius={{base: '5xl', md: '10px' , lg:'15px'}}
                                        />
                                    <Field.Label fontSize="10px">Confirm Password:</Field.Label>
                                        <Input
                                            value={confirmPassword}
                                            onChange={(e) => setConfirmPassword(e.target.value)}
                                            size={{base:"2xs" , md:"xs" ,lg:"md"}}
                                            fontSize={{base: 'sm' , md:"sm" , lg:"md"}}
                                            placeholder="Re-enter password"
                                            type="password"
                                            borderRadius={{base: '5xl', md: '10px' , lg:'15px'}}
                                        />
                                </Field.Root>
                                {passwordError && <Text color="red.500" fontSize="sm">{passwordError}</Text>}
                            </VStack>}
                            {error && <AlertComponent alertMessage='Email or/and password is already in use' />  }
                        </Drawer.Body>
                    <Drawer.Footer >
                      <Button  variant="outline" onClick={onClose}>Cancel</Button>
                      <Button disabled={isLoading || !email || !password || !confirmPassword} onClick={handleLogin}>Submit</Button>
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