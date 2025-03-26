import { createContext  , useContext , useState , useEffect} from "react";


const CartContext = createContext()



export default function CartContextProvider({children}){
    const [cartItems, setCartItems] = useState(()=>{
        const storedCartItems = localStorage.getItem('cartItems');
         return storedCartItems ? JSON.parse(storedCartItems) : [];
    })

    
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
    

    return (
        <CartContext.Provider value={{cartItems , addToCart , removeFromCart , clearCart  , totalPrice }} >
            {children}
        </CartContext.Provider>
    )
}







// eslint-disable-next-line react-refresh/only-export-components
export const useCart = ()=> useContext(CartContext)

