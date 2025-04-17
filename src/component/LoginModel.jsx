import { useState } from "react";
import { Drawer , Link, Portal , Button , CloseButton, VStack ,  Field , Input, useDisclosure, Spinner, Image, Box } from "@chakra-ui/react";
import { useAuth } from "../services/authContext/AuthContext";
import AlertComponent from "./Alert";
import google from "../assets/google-svg.svg"
import RegisterModal from "./RegisterModal";



export default function LoginModal(){
    const [email , setEmail] = useState('')
    const [password , setPassword] = useState('')
    const {onLogin , error , isLoading , setError} = useAuth()
    const { open, onOpen, onClose  } = useDisclosure();

    const handleLogin = async () => {
        try{
       const user =  await onLogin(email , password)
            if(user){
                onClose()
            }
            setEmail('')
            setPassword('')
           window.location.reload()
        }catch(error){
            console.log(error)
            setEmail('')
            setPassword('')

        }
    }
    const handleClose = () => {
        onClose();
        setEmail('');
        setPassword('');
        setError(null); // Also clear error on cancel/close
    }
    return(
        <Drawer.Root   open={open}  onEscapeKeyDown={onClose} closeOnEscape   >
            <Drawer.Trigger asChild>
                 <Link onClick={()=>{
                    setError(null)
                    onOpen();
                 }}>
                     <Image src={google} boxSize='40px'  fontSize='5px' />
                             Email\password
                 </Link>
            </Drawer.Trigger>
            <Portal >
                <Drawer.Backdrop/>
            <Drawer.Positioner padding="4">
          <Drawer.Content rounded="md" >
            <Drawer.Header>
              <Drawer.Title>تسجيل الدخول</Drawer.Title>
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
                            id="login-email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            size={{base:"2xs" , md:"xs" ,lg:"md"}}
                            fontSize={{base: 'sm' , md:"sm" , lg:"md"}}
                            placeholder="Email"
                            autoComplete="email"
                            type="email"
                            borderRadius={{base: '5xl', md: '10px' , lg:'15px'}}
                            />
                        <Field.Label fontSize="10px">Password:</Field.Label>
                            <Input
                            id="login-password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            size={{base:"2xs" , md:"xs" ,lg:"md"}}
                            fontSize={{base: 'sm' , md:"sm" , lg:"md"}}
                            placeholder="Password"
                            type="password"
                            borderRadius={{base: '5xl', md: '10px' , lg:'15px'}}
                             />
                    </Field.Root>
                </VStack>}
                {error && <AlertComponent alertMessage='Invalid username or password' />  }
                <Box justifyContent={'center'} alignItems={'center'} display={'flex'} >

                <Link mt={4}  fontSize={{base: 'xs' , md:"sm" , lg:"md"}} ><RegisterModal color="tomato"/></Link>
                </Box>
                
                </Drawer.Body>
            <Drawer.Footer >
              <Button  variant="outline"  onClick={() => onClose()}>ألغاء</Button>
              <Button type="submit" colorScheme="blue"  disabled={isLoading || !email || !password} onClick={handleLogin}>سجل</Button>
            </Drawer.Footer>
            <Drawer.CloseTrigger asChild>
              <CloseButton size="sm"  onClick={handleClose}/>
            </Drawer.CloseTrigger>
          </Drawer.Content>
        </Drawer.Positioner>
            </Portal>
        </Drawer.Root>
        )
}