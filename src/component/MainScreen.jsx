import { SimpleGrid , Spinner , Center } from '@chakra-ui/react'
import ProductCard from './ProductCard'
import { useEffect, useState } from 'react'
import fetchProducts from '../api/productApi'






export default function MainScreen() {
      const [products , setProducts] = useState([])
  
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
      
  
 // thats way to convert the object to an array instead.....
  
    //   const productsArray = Object.entries(products).map(([id, product]) => ({
    //       id,
    //       ...product,

    //     }));
    //     console.log("productsArray", productsArray)
          
  
  return (
    <SimpleGrid 
        columns={{base:1 , md:2 , lg:3}}
        gap={2}
    > 
     {products.map((product , i) => (
        <ProductCard 
            key={i}
            id={product.id}
            imageUri={product.imageUrl}
            title={product.title}
            description={product.description}
            price={product.price}
            sizes={product.sizes}
       
        />
     ))}
    </SimpleGrid>
    
  )
}
