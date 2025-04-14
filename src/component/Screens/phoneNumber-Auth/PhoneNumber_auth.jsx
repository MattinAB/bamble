import { Box, Container, Heading } from "@chakra-ui/react"
import { useEffect, useState } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from 'yup';
import { getAuth , RecaptchaVerifier} from "firebase/auth";
import { useAuth } from "../../../services/authContext/AuthContext";
import AlertComponent from "../../Alert";
import { Field as Fields ,
         Text ,
         Input ,
         VStack ,
         Button} from "@chakra-ui/react";



const validationSchema = Yup.object().shape({
  phoneNumber: Yup.string()
    .matches(/^\+[1-9]\d{1,14}$/, "Phone number must be in +964XXXXXXXXX format")
    .required("Phone number is required"),
  code: Yup.string()
    .when('isCodeSent', {
      is: true,
      then: Yup.string().required("Verification code is required")
    })
});



export const PhoneNumber_auth = () => {
 const [confirmationResult, setConfirmationResult] = useState(null); // Store the confirmation result
  const { error, setError  , onConfirmPhoneCode , onPhoneSignIn} = useAuth();
  const [isCodeSent, setIsCodeSent] = useState(false);
  const [recaptchaReady, setRecaptchaReady] = useState(false); 


  useEffect(() => {
    if (!recaptchaReady) {
      setupRecaptcha();
    }
  }, []);

  function setupRecaptcha(){

    const containerId = 'recaptcha-container';
    const auth = getAuth(); // Get the Firebase Auth instance
   
    if(!window.recaptchaVerifier){
    window.recaptchaVerifier = new RecaptchaVerifier(
        auth,
      containerId,
      {
        size: "invisible", // Use "invisible" for automatic verification
        callback: (response) => {
          console.log("reCAPTCHA verified", response);
        },
        "expired-callback": () => {
          console.error("reCAPTCHA expired. Please try again.");
        },
        
      },
 
    );
        window.recaptchaVerifier.render().then((widgetId) => {
        window.recaptchaWidgetId = widgetId; 
        console.log("reCAPTCHA rendered with widget ID:", widgetId);
        setRecaptchaReady(true);
        });
  }
}
const onSubmit = async (values, { setSubmitting  }) => {
    // Check if the reCAPTCHA verifier is already set up
    setSubmitting(true);
    setError(null);
   
    const virifier = window.recaptchaVerifier; // Access the reCAPTCHA verifier from the global window object
    try {
      if (!isCodeSent && virifier && recaptchaReady ) {
        const result = await onPhoneSignIn(values.phoneNumber , virifier);
        setConfirmationResult(result); // Save the confirmation result
        setIsCodeSent(true); // Update state to show the code input field
      } else {
        const user = await onConfirmPhoneCode(confirmationResult, values.code);
        console.log("User signed in:", user);
      }
    } catch (error) {
      setError(error.message);
      window.recaptchaVerifier = null; 

    } finally {
      setSubmitting(false);
    }
 
  };

  

  return (
    <Box justifyContent="center" alignItems="center" py={4} mb={2}>
        <Container maxWidth={"container.xl"} maxHeight={"container.xl"} centerContent>

      
        <Formik
             initialValues={{
                phoneNumber: "",
                code: "",
                isCodeSent: isCodeSent
                      }}
             validationSchema={validationSchema}
             onSubmit={onSubmit}
                        >
                        {({ isSubmitting, errors, touched }) => (
                            <Form>
                            <VStack >
                                <Fields.Root>
                                <Fields.Label fontSize="10px">
                                    Phone Number: +964-XXXXXXXXX
                                </Fields.Label>
                                <Field
                                    id="phoneNumberInput"
                                    name="phoneNumber"
                                    as={Input}
                                    type="tel"
                                    placeholder="+9647712345678"
                                    size={{ base: "2xs", md: "xs", lg: "md" }}
                                    fontSize={{ base: "sm", md: "sm", lg: "md" }}
                                    borderRadius={{
                                    base: "5xl",
                                    md: "10px",
                                    lg: "15px",
                                    }}
                                    disabled={isCodeSent}
                                />
                                {touched.phoneNumber && errors.phoneNumber && (
                                    <Text color="red.500" fontSize="sm">
                                    {errors.phoneNumber}
                                    </Text>
                                )}
                                {isCodeSent && (
                                    <>
                                    <Fields.Label fontSize="10px">
                                        Verification Code:
                                    </Fields.Label>
                                    <Field
                                        name="code"
                                        as={Input}
                                        type="text"
                                        placeholder="Enter verification code"
                                        size={{ base: "2xs", md: "xs", lg: "md" }}
                                        fontSize={{ base: "sm", md: "sm", lg: "md" }}
                                        borderRadius={{
                                        base: "5xl",
                                        md: "10px",
                                        lg: "15px",
                                        }}
                                    />
                                    {touched.code && errors.code && (
                                        <Text color="red.500" fontSize="sm">
                                        {errors.code}
                                        </Text>
                                    )}
                                    </>
                                )}
                                </Fields.Root>
                                <Button
                                type="submit"
                                disabled={ isSubmitting}
                                >
                                {isCodeSent ? "Verify Code" : "Send Code"}
                                </Button>
                            </VStack>
                            </Form>
                        )}
        </Formik>
         {error && <AlertComponent alertMessage={error} status='error'/>}
         <Box id="recaptcha-container" 
                             style={{
                               position:'fixed', 
                               top:"50%" ,
                               left:"50%" ,
                               transform:"translate(-50% ,-50%)",
                               }} ></Box>
    </Container>
    </Box>
  )
}
