import { SimpleGrid , Spinner , Center } from '@chakra-ui/react'
import ProductCard from './ProductCard'
import { useEffect, useState } from 'react'
import fetchProducts from '../api/productApi'






export default function MainScreen() {

      const [products , setProducts] = useState(null)
       
  
      useEffect(() => {
          const fetchData = async () => {
              const data = await fetchProducts()
            setProducts(data)
  
          }
          fetchData()
      } , [])

  
      if (!products) {
          return (
              <Center>
                  <Spinner size='xl'/>
              </Center>
          )
        }
      
  
  
      const productsArray = Object.entries(products).map(([id, product]) => ({
          id,
          ...product,
        }));

        console.log(productsArray)

  
  return (
    <SimpleGrid 
        column={{base:1 , md:2 , lg:3}}
        gap={4}
    > 
     {productsArray.map((product) => (
        <ProductCard 
            key={product.id}
            imageUri={product.imageUrl}
            title={product.title}
            description={product.description}
            price={product.price}
        />
     ))}
    </SimpleGrid>
    
  )
}
