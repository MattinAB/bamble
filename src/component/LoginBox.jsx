import { HStack, Link } from "@chakra-ui/react";
import { CiLogin } from "react-icons/ci";
import { SiGnuprivacyguard } from "react-icons/si";





export default function LoginBox() {
  return (
    <HStack spaceX={{base: 2, md: 6}} justify='center' align='center'>
        <Link as='button'>
            <CiLogin size='20px'  fontSize='5px' />
                 Login
        </Link>
        <Link as='button'>
            <SiGnuprivacyguard size='20px'  fontSize='5px'  />
                 Signup 
        </Link>

    </HStack>
  )
}
