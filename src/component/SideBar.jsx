import { Button, ListRoot , Box , HStack,  Flex , useBreakpointValue , Image} from "@chakra-ui/react"
import baby from "../assets/baby-svg.svg"
import babyBoy from '../assets/baby-boys-svg.svg'
import babyCostim from '../assets/baby-svg-costim.svg'



const items = [
    {
        id: 1,
        text: 'Baby Clothes',
        icon: <Image  src={baby} boxSize={{base:"20px" , md:"25px" , lg:"30px"}}  fontSize='5px' />
    },
    {
        id: 2,
        text: 'Boys Clothes',
        icon: <Image src={babyBoy} boxSize={{base:"20px" , md:"25px" , lg:"30px"}}  fontSize='5px' />
    },
    {
        id: 3,
        text: 'Costim',
        icon: <Image src={babyCostim} boxSize={{base:"20px" , md:"25px" , lg:"30px"}}  fontSize='5px' />

    }
]



export default function SideBar() {
        const direction = useBreakpointValue({ base: 'row', md: 'column' });
        const spacing = useBreakpointValue({ base: 0.5, md: 2 });
  return (
      <ListRoot>
         <Flex direction={direction} gap={spacing}  >
           {items.map((item)=>{
            return(
                    <Box key={item.id} p={2} >
                        <HStack align='center' >
                            <Box  >
                                    {item.icon}
                            </Box>
                                    <Button 
                                        size={{base:'xs', md:'md' , lg:'lg'}}
                                        variant='link'
                                        whiteSpace='normal'
                                        fontSize={{base:'10px', md:'15px' , lg:'20px'}}
                                        p={0}
                                    >
                                        {item.text}
                                    </Button>
                        </HStack>
                    </Box>
            )
           })}
    
            </Flex >
    </ListRoot>

  )
}
