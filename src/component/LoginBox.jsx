import { Box, HStack } from "@chakra-ui/react";
import RegisterModal from "./RegisterModal";
import LoginBoxModal from "./LoginModal/LoginBoxModal";





export default function LoginBox() {
  return (
    <HStack spaceX={{base: 2, md: 6}} justify='center' align='center'>
      <LoginBoxModal/>
      <RegisterModal/>
    </HStack>
  )
}

