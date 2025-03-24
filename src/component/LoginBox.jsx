import { HStack, Link } from "@chakra-ui/react";
import { SiGnuprivacyguard } from "react-icons/si";
import LoginModal from "./LoginModel";





export default function LoginBox() {
  return (
    <HStack spaceX={{base: 2, md: 6}} justify='center' align='center'>
      <LoginModal/>
        <Link as='button'>
            <SiGnuprivacyguard size='20px'  fontSize='5px'  />
                 Signup 
        </Link>

    </HStack>
  )
}
