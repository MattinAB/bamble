
import { Button, Image, ListRoot , ListItem , HStack,  Flex , useBreakpointValue, ListIndicator} from "@chakra-ui/react"
import { FaBaby } from "react-icons/fa";
import { PiBaby } from "react-icons/pi";
import { CgBoy } from "react-icons/cg";



const items = [
    {
        id: 1,
        text: 'Baby Clothes',
        icon: <FaBaby />
    },
    {
        id: 2,
        text: 'Boys Clothes',
        icon: <PiBaby size={20}/>
    },
    {
        id: 3,
        text: 'Costim',
        icon: <CgBoy size={20}/>

    }
]



export default function SideBar() {
        const direction = useBreakpointValue({ base: 'row', md: 'column' });
        const spacing = useBreakpointValue({ base: 1, md: 2 });
  return (
      <ListRoot>
         <Flex direction={direction} gap={spacing}  >
           {items.map((item)=>{
            return(
                    <ListItem key={item.id} p={2} >
                        <HStack align='center' >
                                    <ListIndicator asChild  >
                                            {item.icon}
                                    </ListIndicator>
                                    <Button 
                                        size={{base:'sm', md:'md' , lg:'lg'}}
                                        variant='link'
                                        
                                        whiteSpace='normal'
                                        fontSize={{base:'10px', md:'15px' , lg:'20px'}}
                                        p={0}
                                    >
                                        {item.text}
                                    </Button>
                        </HStack>
                    </ListItem>
            )
           })}
    
            </Flex >
    </ListRoot>

  )
}
