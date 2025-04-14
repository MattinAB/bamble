import { Drawer , Link, Portal , Button , CloseButton, VStack ,  useDisclosure, Spinner, IconButton  } from "@chakra-ui/react";
import { DataList } from "@chakra-ui/react"
import { GiShoppingCart } from "react-icons/gi";
import { useCart } from "../services/cartContext/CartContext";
import { CgRemoveR } from "react-icons/cg"
import OrderField from "./OrderField";
import EmptyCart from "./EmptyCart";



export default function CartModal() {
   
    const { open, onOpen, onClose  } = useDisclosure();
    const {cartItems , totalPrice ,removeFromCart } =   useCart()

    const hanldeRemoveFromCart = (itemId) => {
        removeFromCart(itemId)
    };

    return(
        <Drawer.Root  open={open} onEscapeKeyDown={onClose}   >
            <Drawer.Trigger asChild>
                 <Link onClick={()=>{
                    onOpen();
                 }}>
                      <GiShoppingCart size={'25px'} />
                             Cart
                 </Link>
            </Drawer.Trigger>
            <Portal>
                <Drawer.Backdrop/>
            <Drawer.Positioner padding="4">
          <Drawer.Content rounded="md">
            <Drawer.Header>
              <Drawer.Title>Cart Itmes</Drawer.Title>
            </Drawer.Header>
                <Drawer.Body >
                {cartItems.length === 0 ? <EmptyCart />:<VStack mb={2}>
                   <DataList.Root orientation="horizontal">
                        {cartItems.map((item , i)=>(
                            <DataList.Item key={`${i}-${item.title}`}>
                                <DataList.ItemLabel>{item.title}</DataList.ItemLabel>
                                <DataList.ItemValue> 1 x {item.price}  DNR</DataList.ItemValue>
                                <IconButton aria-label="Remove from cart"  variant="plain" size="sm" 
                                onClick={()=>{hanldeRemoveFromCart(item.id)}}><CgRemoveR /></IconButton>
                            </DataList.Item>
                        ))}
                      
                   </DataList.Root>
                   <DataList.Root orientation="horizontal"  mt={6}>
                            <DataList.Item>
                                <DataList.Item fontSize='20px' fontFamily='mono' fontWeight='bold'>TotalPrice : {totalPrice} DNR</DataList.Item>
                            </DataList.Item>
                        </DataList.Root>
                        <OrderField onClose={onClose}/>
                      
                </VStack>}
               
                
            </Drawer.Body>
                     
            <Drawer.Footer >
              <Button  variant="outline" onClick={onClose}>Cancel</Button>
            </Drawer.Footer>
            <Drawer.CloseTrigger asChild>
              <CloseButton size="sm" />
            </Drawer.CloseTrigger>
          </Drawer.Content>
        </Drawer.Positioner>
            </Portal>
        </Drawer.Root>
        )
}