import { createContext  , useContext , useState , useEffect} from "react";




const CartContext = createContext()



export default function CartContextProvider({children}){
    const [cartItems, setCartItems] = useState(()=>{
        const storedCartItems = localStorage.getItem('cartItems');
         return storedCartItems ? JSON.parse(storedCartItems) : [];
    })
    const [isLoading , setIsLoading] = useState(false)

    
    useEffect(() => {
        localStorage.setItem('cartItems', JSON.stringify(cartItems))
    }, [cartItems])
    
    

    const addToCart = (item) => {
            setCartItems([...cartItems, item])
    }



    const removeFromCart = (itemId) => {
        setCartItems(cartItems.filter((item) => item.id !== itemId))
    }
    const clearCart = () => {
        setCartItems([])
        localStorage.removeItem('cartItems')
    }

    const totalPrice = cartItems.reduce((total, item) => total +  item.price  , 0)

    // const createOrder = async (orderData) => {
    //     setIsLoading(true);
    //     try {
    //       // 1. Send the order data to your backend API (using Axios)
    //       const createdOrder = await sendOrder(orderData);
    
    //       // 2. Update the sizes in the database (by calling a backend endpoint)
    //       await updateSizesInDatabase(orderData);
    
    //       // 3. Clear the cart after successful order creation
    //       clearCart();
    
    //       return createdOrder; // Return the created order data
    //     } catch (error) {
    //       console.error('Error creating order:', error);
    //       throw error; // Re-throw the error to be handled by the caller
    //     } finally {
    //       setIsLoading(false);
    //     }
    //   };
    
    //   const updateSizesInDatabase = async (items) => {
    //     try {
    //       // Send the items to a backend endpoint to update sizes
    //       const response = await axios.post('bamble', { items }); // New backend endpoint
    
    //       if (response.status !== 200) {
    //         throw new Error(`Failed to update sizes: ${response.status}`);
    //       }
    //     } catch (error) {
    //       console.error('Error updating sizes updateSizesDatabase:', error);
    //       throw error;
    //     }
    //   };
    

    return (
        <CartContext.Provider value={{cartItems , addToCart , removeFromCart , clearCart  , totalPrice , isLoading , setIsLoading  }} >
            {children}
        </CartContext.Provider>
    )
}







// eslint-disable-next-line react-refresh/only-export-components
export const useCart = ()=> useContext(CartContext)

