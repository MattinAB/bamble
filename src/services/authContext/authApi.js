import { signInWithEmailAndPassword, getAuth, createUserWithEmailAndPassword, signInWithPhoneNumber, RecaptchaVerifier } from "firebase/auth"




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


// ... existing code ...

async function initializeRecaptcha(auth) {
  const recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
    'size': 'invisible',
    'callback': () => {
      // reCAPTCHA solved, allow signInWithPhoneNumber.

    }
  });
  return recaptchaVerifier;
}

async function signInWithPhone(phoneNumber) {
  const auth = getAuth();
  try {
    const appVerifier = await initializeRecaptcha(auth);
    const confirmationResult = await signInWithPhoneNumber(auth, phoneNumber, appVerifier);
    return confirmationResult;
  } catch (error) {
    throw new Error('Error signing in with phone number: ' + error.message);
  }
}

async function confirmPhoneCode(confirmationResult, code) {
  try {
    const result = await confirmationResult.confirm(code);
    return result.user;
  } catch (error) {
    throw new Error('Error confirming phone code: ' + error.message);
  }
}

export { LoginApi, RegisterApi, RegisterWithPhoneNumber, signInWithPhone, confirmPhoneCode }

