import { Drawer , Link, Portal , Button , CloseButton, VStack ,  useDisclosure, Box} from "@chakra-ui/react";
import { CiLogin } from "react-icons/ci";
import { BiLogoFacebookSquare } from "react-icons/bi";
import LoginModal from "../LoginModel";
import { Link as RouterLink } from "react-router"
import {signInWithPopup , getAuth} from "firebase/auth";
import{facebookProvider } from "../../../firebase-env";
import { useAuth } from "../../services/authContext/AuthContext";


const facebookButton = {
    backgroundColor: 'blue.500',
    color: 'white',
    
    _hover: {
        backgroundColor: 'blue.600',
    },
    _active: {
        backgroundColor: 'blue.700',
    },
    _focus: {
        boxShadow: '0 0 0 3px rgba(66, 153, 225, 0.6)',
    },
};

export default function LoginBoxModal(){
   
    const { open, onOpen, onClose  } = useDisclosure();
    const {setUser} =   useAuth()

    const facebookSubmit = async (event) => {
          event.preventDefault();
      const auth = getAuth();
        try {
            const result = signInWithPopup(auth ,facebookProvider);
            const user = result.user;
                setUser(user)
        } catch (error) {
            console.error("Error signing in with Facebook:", error);
            alert("Error signing in with Facebook:", error.message);
        }
    }


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
                  <Button sm={facebookButton} backgroundColor={'blue.500'} onClick={facebookSubmit} >
                    <BiLogoFacebookSquare />
                    تسجيل الدخول عبر الفيسبوك
                  </Button>
                  <Box mt={8}>
                   <LoginModal/>
                  </Box>

                 <RouterLink to="/phone-auth" >
              
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