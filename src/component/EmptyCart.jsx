import React from 'react'
import { Box , Text, VStack } from '@chakra-ui/react'
import { GiShoppingCart } from "react-icons/gi";



export default function EmptyCart() {
  return (
    <Box  bg='gray.50' borderRadius='2xl' h='100%' w='100%' display='flex' justifyContent='center' alignItems='center'>
      <VStack align='center' >
        <GiShoppingCart size='4xl'/>
        <Text fontSize='md' fontFamily='monospace' color='gray.600'>Your cart is empty!</Text>
      </VStack>

    </Box>
  )
}
