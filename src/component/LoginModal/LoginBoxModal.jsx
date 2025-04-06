import { Drawer , Link, Portal , Button , CloseButton, VStack ,  useDisclosure, Box} from "@chakra-ui/react";
import { CiLogin } from "react-icons/ci";
import LoginModal from "../LoginModel";
import PhoneAuthModal from "../PhoneAuthModal";



export default function LoginBoxModal(){
   
    const { open, onOpen, onClose  } = useDisclosure();


    return(
        <Drawer.Root   open={open}  onEscapeKeyDown={onClose} closeOnEscape  >
            <Drawer.Trigger asChild>
                 <Link onClick={()=>{
                    onOpen();
                 }}>
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
                <VStack padding={10} my={5} >
                  <Box mb={4}>
                   <LoginModal/>
                  </Box>

                 <PhoneAuthModal/>
                </VStack>
                
                </Drawer.Body>
            <Drawer.Footer >
              <Button  variant="outline" onClick={onClose}>Cancel</Button>
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