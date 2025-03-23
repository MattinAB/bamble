import { createContext , useContext , useEffect, useState } from "react";
import {LoginApi} from './authApi'
import {onAuthStateChanged  , getAuth} from 'firebase/auth'



const authContext = createContext()




export default function AuthProvider({children}){
    const [user, setUser] = useState(null)

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
       const user = await  LoginApi(userName , password)
       if(user){
        setUser(user)
       }else{
        throw new Error("Invalid username or password")
       }
    }
return (
    <authContext.Provider
    value={{user , onLogin}}
    >
        {children}
    </authContext.Provider>
)
    
}

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => useContext(authContext)