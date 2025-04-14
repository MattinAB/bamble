import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPhoneNumber,
} from "firebase/auth";
import { getAuth } from "firebase/auth";


async function LoginApi(userName, password) {
  const auth = getAuth();
  try {
    const response = await signInWithEmailAndPassword(auth, userName, password);
    return response;
  } catch (error) {
    throw new Error("Error signing in with email and password", error);
  }
}

async function RegisterApi(userName, password) {
  const auth = getAuth();
  try {
    const response = await createUserWithEmailAndPassword(
      auth,
      userName,
      password
    );
    return response;
  } catch (error) {
    throw new Error(error.message);
  }
}

async function signInWithPhone(phoneNumber , recaptchaVerifier) {
  try {
    const auth = getAuth();

  
    const confirmationResult = await signInWithPhoneNumber(
      auth,
      phoneNumber,
      recaptchaVerifier
    );

    return confirmationResult;
  } catch (error) {
    throw new Error("Error signing in with phone number: " + error.message);
  }
}

async function confirmPhoneCode(confirmationResult, code) {
  try {
    const userCredential = await confirmationResult.confirm(code);
    return userCredential.user;
  } catch (error) {
    throw new Error("Error confirming phone code: " + error.message);
  }
}

export { LoginApi, RegisterApi, signInWithPhone, confirmPhoneCode };
