import { createContext , useContext , useEffect, useState } from "react";
import {LoginApi} from './authApi'
import {onAuthStateChanged  , getAuth} from 'firebase/auth'



const authContext = createContext()




export default function AuthProvider({children}){
    const [user, setUser] = useState(null)
    const [error, setError] = useState(null)
    const [isLoading , setIsLoading] = useState(false)
    

        useEffect(() => {
            const auth = getAuth()
            onAuthStateChanged(auth , user => {
                if(user){
                    setUser(user)
                }else{
                    setUser(null)
                }
            })
        },[])

    const onLogin = async (userName , password) => {
        try {
            setIsLoading(true)
            const user = await  LoginApi(userName , password)
            if(user){
             setUser(user)
             setIsLoading(false)
             setError(null)
                return user
            }
        } catch (error) {
            setError(error.message)
            setUser(null)
            setIsLoading(false)
        }
      
    }
    

    
return (
    <authContext.Provider
      value={{user , onLogin , error , setError , isLoading}}
    >
        {children}
    </authContext.Provider>
)
    
}

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => useContext(authContext)