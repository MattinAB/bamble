import { SimpleGrid  } from '@chakra-ui/react'
import ProductCard from './ProductCard'






export default function MainScreen() {
  return (

    <SimpleGrid 
    column={{base:1 , md:2 , lg:3}}
    spacing={10}
    > 
      <ProductCard/>

    </SimpleGrid>
    
  )
}
