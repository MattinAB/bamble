import {Button , Image , Text , Card , Flex, HStack, Heading} from '@chakra-ui/react'
import { useCart } from '../services/cartContext/CartContext'



export default function ProductCard({imageUri, title , description , price , sizes}) {
   
    const {addToCart} = useCart();

    const handleAddToCart = () => {
        const itemToAdd = {
            imageUri,
            title,
            description,
            price,
            sizes
        }
        addToCart(itemToAdd);
    }

  return (
            <Card.Root maxW="sm" overflow="hidden">
                <Image
                    src={imageUri}
                    alt={title}
                />
                <Card.Body gap="2">
                    <Card.Title>{title}</Card.Title>
                    <Card.Description>
                        {description}
                    </Card.Description>
                    <Text textStyle="2xl" fontWeight="medium" letterSpacing="tight" mt="2">
                        {price} IQD
                    </Text>
                        <Heading size="sm" fontWeight="medium">sizes:</Heading>
                    <HStack gap={{base:2 , md:4 , lg:8}} wrap='wrap'  >
                    
                   {sizes.map((item , index)=>{
                     return (
                            <Text key={index} fontSize={{base:'10px' , md:'15px' , lg:'20px'}}  color='gray.800'  >
                                {item.size}
                            </Text>
                            )
                            })}
                    </HStack > 
                </Card.Body>
                <Card.Footer gap="2">
                    <Button variant="solid" >Buy now</Button>
                    <Button variant="ghost"  onClick={handleAddToCart}>Add to cart</Button>
                </Card.Footer>
    </Card.Root>
        )}
       
       
    


