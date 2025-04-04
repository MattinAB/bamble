import { Drawer, Button, VStack, Text, Portal , useDisclosure } from "@chakra-ui/react";
import { DataList } from "@chakra-ui/react";
import OrderField from "./OrderField";
import { useCart } from "../services/cartContext/CartContext";
import EmptyCart from "./EmptyCart";

export default function BuyNowDrawer({  disabled , onClick }) {
    const {cartItems , totalPrice} = useCart()
    const { onClose  , open , onOpen} = useDisclosure();


  return (
    <Drawer.Root open={open} closeOnInteractOutside  onEscapeKeyDown={onClose}    placement="top"  size="md">
        <Drawer.Trigger asChild onClick={onOpen}>
            <Button variant="solid" size="sm" disabled={disabled} onClick={onClick}>
                Buy Now
            </Button>
        </Drawer.Trigger>
            <Portal>
            <Drawer.Backdrop />
            <Drawer.Positioner>
                <Drawer.Content>
                <Drawer.CloseTrigger/>
                <Drawer.Header>Buy Now</Drawer.Header>
                <Drawer.Body>
                {cartItems.length === 0 ? <EmptyCart /> : ( <VStack spacing={4} align="stretch">
                        <DataList.Root>
                        {cartItems.map((item , i) => (
                            <DataList.Item key={i}>
                            <DataList.ItemLabel>{item?.title}</DataList.ItemLabel>
                            <DataList.ItemValue>{item?.quantity} x {item?.price} DNR</DataList.ItemValue>
                            </DataList.Item>))}
                        </DataList.Root>
                        <Text fontSize="20px" fontFamily="mono" fontWeight="bold">
                        Total Price: {totalPrice} DNR
                        </Text>
                        <OrderField onClose={onClose} />
                    </VStack>)}
                </Drawer.Body>

                <Drawer.Footer>
                    <Button variant="outline" mr={3} onClick={onClose} >
                        Cancel
                    </Button>
                </Drawer.Footer>

                </Drawer.Content>          
        </Drawer.Positioner>
        </Portal>
    </Drawer.Root>
  );
}