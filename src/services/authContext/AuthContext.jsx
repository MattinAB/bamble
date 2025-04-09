import { createContext , useContext , useEffect, useState } from "react";
import {LoginApi} from './authApi'
import {onAuthStateChanged  , getAuth} from 'firebase/auth'
import { RegisterApi } from "./authApi";
import {confirmPhoneCode, signInWithPhone} from './authApi'


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
    
    const onRegister = async (userName , password) => {
        try {
            setIsLoading(true)
            const user = await  RegisterApi(userName , password)
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
    const onPhoneSignIn = async (phoneNumber) => {
        setIsLoading(true);
        setError(null);
        try {
          const result = await signInWithPhone(phoneNumber);
          return result;
        } catch (error) {
          setError(error.message);
        } finally {
          setIsLoading(false);
        }
      };
    
      const onConfirmPhoneCode = async (confirmationResult, code) => {
        setIsLoading(true);
        setError(null);
        try {
          const user = await confirmPhoneCode(confirmationResult, code);
          setUser(user);
          return user;
        } catch (error) {
          setError(error.message);
        } finally {
          setIsLoading(false);
        }
      };

    
return (
    <authContext.Provider
      value={{user , onLogin , onRegister , error , setError , isLoading , onConfirmPhoneCode , onPhoneSignIn}}
    >
        {children}
    </authContext.Provider>
)
    
}

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => useContext(authContext)