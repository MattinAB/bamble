import { HStack } from "@chakra-ui/react";
import LoginModal from "./LoginModel";
import RegisterModal from "./RegisterModal";





export default function LoginBox() {
  return (
    <HStack spaceX={{base: 2, md: 6}} justify='center' align='center'>
      <LoginModal/>
      <RegisterModal/>
    </HStack>
  )
}
