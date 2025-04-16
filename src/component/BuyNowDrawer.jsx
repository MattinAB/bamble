import { Drawer, Button, VStack, Text, Portal , useDisclosure  , IconButton , HStack} from "@chakra-ui/react";
import { DataList } from "@chakra-ui/react";
import OrderField from "./OrderField";
import { useCart } from "../services/cartContext/CartContext";
import EmptyCart from "./EmptyCart";
import { CgRemoveR } from "react-icons/cg"

export default function BuyNowDrawer({  disabled , onClick }) {
    const {cartItems , totalPrice , removeFromCart} = useCart()
    const { onClose  , open , onOpen} = useDisclosure();

    const hanldeRemoveFromCart = (itemId) => {
        removeFromCart(itemId)
    };

  return (
    <Drawer.Root open={open} closeOnInteractOutside  onEscapeKeyDown={onClose}    placement="top"  size="md">
        <Drawer.Trigger asChild onClick={onOpen}>
            <Button variant="solid" size="sm" disabled={disabled} onClick={onClick}>
                أشتري الان
            </Button>
        </Drawer.Trigger>
            <Portal>
            <Drawer.Backdrop />
            <Drawer.Positioner>
                <Drawer.Content>
                <Drawer.CloseTrigger/>
                <Drawer.Header>شراء مباشر</Drawer.Header>
                <Drawer.Body>
                {cartItems.length === 0 ? <EmptyCart /> : ( <VStack  align="stretch"  mb={2} p={4}>
                        <DataList.Root>
                        {cartItems.map((item , i) => (
                            
                            
                            <DataList.Item key={i}>
                                <HStack justifyContent={"space-around"}  >
                                    <DataList.ItemLabel>{item?.title}</DataList.ItemLabel>
                                    <DataList.ItemValue>{item?.quantity} x {item?.price} DNR</DataList.ItemValue>
                                    <IconButton color={"red.600"} aria-label="Remove from cart"  variant="plain" size="sm" 
                                    onClick={()=>{hanldeRemoveFromCart(item.id)}}><CgRemoveR /></IconButton>
                               </HStack>
                            </DataList.Item>))}
                        </DataList.Root>
                        <Text fontSize="20px" fontFamily="mono" fontWeight="bold">
                         DNR الاجمالي: {totalPrice} 
                        </Text>
                        <OrderField onClose={onClose} />
                    </VStack>)}
                </Drawer.Body>

                <Drawer.Footer>
                    <Button variant="outline" mr={3} onClick={onClose} >
                        ألغاء
                    </Button>
                </Drawer.Footer>

                </Drawer.Content>          
        </Drawer.Positioner>
        </Portal>
    </Drawer.Root>
  );
}