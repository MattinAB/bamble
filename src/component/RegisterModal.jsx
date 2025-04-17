import { Formik, Form , Field } from "formik";
import * as Yup from  'yup'
import { Drawer , Link, Portal , Button , CloseButton, VStack, Input, useDisclosure, Spinner  , Text , Field as Fields} from "@chakra-ui/react";
import { useAuth } from "../services/authContext/AuthContext";
import {SiGnuprivacyguard} from 'react-icons/si'
import AlertComponent from './Alert'

const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Confirm Password is required"),
  });


export default function RegisterModal({color='gray.800'}){
       const {isLoading , error ,  onRegister , setError } = useAuth()
       const { open, onOpen, onClose } = useDisclosure();


const onSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      const result = await onRegister(
        values.email,
        values.password
      );
      if (result) {
        onClose();
        resetForm();
      }
    } catch (error) {
      console.error(error);
    } finally {
      setSubmitting(false);
    }
  }
      
    return (
        <Drawer.Root  open={open}  onEscapeKeyDown={onClose}  closeOnEscape  >
                    <Drawer.Trigger asChild>
                        <Link color={color} onClick={()=>{
                                setError(null)
                                onOpen()
                        }}>
                            <SiGnuprivacyguard size='20px'  fontSize='5px'/>
                                أنشاء حساب جديد 
                         </Link>
                        </Drawer.Trigger>
                    <Portal>
                        <Drawer.Backdrop/>
                    <Drawer.Positioner padding="4">
                  <Drawer.Content rounded="md">
                    <Drawer.Header>
                      <Drawer.Title>حساب جديد</Drawer.Title>
                    </Drawer.Header>
                        <Drawer.Body >
                            {isLoading ? <Spinner size='xl' style={{
                            position: "absolute",
                            top: "50%",
                            left: "50%",
                            transform: "translate(-50%, -50%)",
                            }} />: (
                                <Formik
                                  initialValues={{
                                    email: "",
                                    password: "",
                                    confirmPassword: "",
                                  }}
                                  validationSchema={validationSchema}
                                  onSubmit={onSubmit}
                                >
                                  {({ isSubmitting, errors, touched }) => (
                                    <Form>
                                      <VStack mb={2}>
                                        <Fields.Root>
                                          <Fields.Label fontSize="10px">
                                            Email:
                                          </Fields.Label>
                                          <Field
                                            name="email"
                                            as={Input}
                                            type="email"
                                            placeholder="Email"
                                            size={{ base: "2xs", md: "xs", lg: "md" }}
                                            fontSize={{ base: "sm", md: "sm", lg: "md" }}
                                            borderRadius={{
                                              base: "5xl",
                                              md: "10px",
                                              lg: "15px",
                                            }}
                                          />
                                          {touched.email && errors.email && (
                                            <Text color="red.500" fontSize="sm">
                                              {errors.email}
                                            </Text>
                                          )}
                                          <Fields.Label fontSize="10px">
                                            Password:
                                          </Fields.Label>
                                          <Field
                                            name="password"
                                            as={Input}
                                            type="password"
                                            placeholder="Password"
                                            size={{ base: "2xs", md: "xs", lg: "md" }}
                                            fontSize={{ base: "sm", md: "sm", lg: "md" }}
                                            borderRadius={{
                                              base: "5xl",
                                              md: "10px",
                                              lg: "15px",
                                            }}
                                          />
                                          {touched.password && errors.password && (
                                            <Text color="red.500" fontSize="sm">
                                              {errors.password}
                                            </Text>
                                          )}
                                          <Fields.Label fontSize="10px">
                                            Confirm Password:
                                          </Fields.Label>
                                          <Field
                                            name="confirmPassword"
                                            as={Input}
                                            type="password"
                                            placeholder="Re-enter password"
                                            size={{ base: "2xs", md: "xs", lg: "md" }}
                                            fontSize={{ base: "sm", md: "sm", lg: "md" }}
                                            borderRadius={{
                                              base: "5xl",
                                              md: "10px",
                                              lg: "15px",
                                            }}
                                          />
                                          {touched.confirmPassword &&
                                            errors.confirmPassword && (
                                              <Text color="red.500" fontSize="sm">
                                                {errors.confirmPassword}
                                              </Text>
                                            )}
                                        </Fields.Root>
                                      <Button
                                        type="submit"
                                        disabled={isLoading || isSubmitting}
                                    
                                      >
                                        سجل 
                                      </Button>
                                      </VStack>
                                    </Form>
                                  )}
                                </Formik>
                              )}
                            {error && <AlertComponent alertMessage='Email or/and password is already in use' />  }
                        </Drawer.Body>
                    <Drawer.Footer >
                      <Button  variant="outline" onClick={()=>onClose()}>الغاء</Button>
                    </Drawer.Footer>
                    <Drawer.CloseTrigger asChild>
                      <CloseButton onClick={onClose} size="sm" />
                    </Drawer.CloseTrigger>
                  </Drawer.Content>
                </Drawer.Positioner>
                    </Portal>
                </Drawer.Root>
    )
}