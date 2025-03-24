import { HStack, IconButton } from "@chakra-ui/react"

export default function ButtonIcon({children , ...props}) {
  return (
  
          <IconButton size='2xs' color='gray.200' backgroundColor='yellow.700' boxSize='-moz-fit-content'  borderRadius='full'{...props} >
              {children}
          </IconButton>
  )
 
}
