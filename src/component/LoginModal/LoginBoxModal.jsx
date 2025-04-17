import { Drawer , Link, Portal , Button , CloseButton, VStack ,  useDisclosure, Box, HStack} from "@chakra-ui/react";
import { CiLogin } from "react-icons/ci";
import LoginModal from "../LoginModel";
import { Link as RouterLink } from "react-router"
import { FaPhone } from 'react-icons/fa';




export default function LoginBoxModal(){
   
    const { open, onOpen, onClose  } = useDisclosure();


    return(
        <Drawer.Root   open={open}  onEscapeKeyDown={onClose} closeOnEscape  >
            <Drawer.Trigger asChild>
                 <Link onClick={()=>{
                    onOpen();
                 }}>
                     <CiLogin size='20px'  fontSize='5px' />
                      دخول
                 </Link>
            </Drawer.Trigger>
            <Portal>
                <Drawer.Backdrop/>
            <Drawer.Positioner padding="4">
          <Drawer.Content rounded="md">
            <Drawer.Header>
              <Drawer.Title>تسجيل الدخول</Drawer.Title>
            </Drawer.Header>
                <Drawer.Body >
                <VStack padding={10} my={5} >
                  <Box mb={4}>
                   <LoginModal/>
                  </Box>

                 <RouterLink to="/phone-auth" >
                 <HStack>
                   <FaPhone size='25px' fontSize='5px' />
                     Phone Sign In
                 </HStack>
                 </RouterLink>
                </VStack>
                
                </Drawer.Body>
            <Drawer.Footer >
              <Button  variant="outline" onClick={onClose}>ألغاء</Button>
            </Drawer.Footer>
            <Drawer.CloseTrigger asChild>
              <CloseButton onClick={onClose} size="sm" />
            </Drawer.CloseTrigger>
          </Drawer.Content>
        </Drawer.Positioner>
            </Portal>
        </Drawer.Root>
        )
}