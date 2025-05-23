import {
         Button ,
         Image ,
         Text ,
         Card ,
         Heading  ,
        Box,
        } from '@chakra-ui/react'
import Select from 'react-select';
import { useCart } from '../services/cartContext/CartContext'
import { useState } from 'react';
import BuyNowDrawer from './BuyNowDrawer';



export default function ProductCard({imageUri, title , description , price , sizes ,id}) {
   const [selectedSize , setSelectedSize ] = useState()
   const {addToCart } = useCart();
   const quantity =1


   const sizeOptions = sizes.map((item) => ({
    value: item.size,
    label: item.size,
    isDisabled: !item.isAvailable,
  }));


    const handleAddToCart = () => {
        if(!selectedSize) {
            alert('Please select a size')
            return
        }
        const itemToAdd = {
            id,
            imageUri,
            title,
            description,
            price,
            selectedSize: selectedSize.value,
            quantity,
        }
        addToCart(itemToAdd);
        alert('تم اضافة المنتج الى السلة بنجاح')
        setSelectedSize(null)
        return
    }
   

  return (
  
            <Card.Root maxW="sm" >
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
                        <Heading size="sm" fontWeight="medium">القياسات:</Heading>
                    
                    <Box as='div' position='relative'>
                    <Select
                        value={selectedSize}
                        onChange={setSelectedSize}
                        options={sizeOptions}
                        placeholder="Select Size"
                        isOptionDisabled={(option) => option.isDisabled}
                    />     
                    </Box>
                </Card.Body>
                <Card.Footer gap="2">
                    <BuyNowDrawer   onClick={handleAddToCart} disabled={!selectedSize}/>
                    <Button variant="ghost"  onClick={handleAddToCart}>أضف الى السلة</Button>
                </Card.Footer>
         </Card.Root>
    
  
        )}
       
       
    


