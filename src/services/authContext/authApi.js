import { signInWithEmailAndPassword , getAuth , createUserWithEmailAndPassword , signInWithPhoneNumber } from "firebase/auth"



async function LoginApi(userName, password){
    const auth = getAuth();
    try {
        const response = await signInWithEmailAndPassword(auth , userName, password)
        return response
        
    } catch (error) {
      
        throw new Error('Error signing in with email and password', error)
    }
}

async function RegisterApi(userName, password){
    const auth = getAuth();
    try {
        const response = await createUserWithEmailAndPassword(auth , userName, password)
        return response
        
    } catch (error) {
            throw new Error(error.message)
    }
}


async function RegisterWithPhoneNumber(auth, phoneNumber, appVerifier){
    try {
        const result = await signInWithPhoneNumber(auth, phoneNumber, appVerifier)
        return result
        
    } catch (error) {
        throw new Error(error.message)
    }

}

export {LoginApi , RegisterApi , RegisterWithPhoneNumber}