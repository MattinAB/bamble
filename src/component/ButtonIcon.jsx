import { For, HStack, IconButton } from "@chakra-ui/react"

export default function ButtonIcon({icon , ...props}) {
  return (
    <HStack wrap="wrap">
          <IconButton aria-label="Search database" {...props} >
            {icon}
          </IconButton>
    </HStack>
  )
}
