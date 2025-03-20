import {Button , Image , Text , Card} from '@chakra-ui/react'



export default function ProductCard({imageUri, title , description , price}) {

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
                        {price} USD
                    </Text>
                </Card.Body>
                <Card.Footer gap="2">
                    <Button variant="solid">Buy now</Button>
                    <Button variant="ghost">Add to cart</Button>
                </Card.Footer>
    </Card.Root>
        )}
       
       
    


