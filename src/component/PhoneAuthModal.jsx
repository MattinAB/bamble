import React, { useState } from 'react';
import { Formik, Form, Field } from "formik";
import * as Yup from 'yup';
import { Drawer, Link, Portal, Button, CloseButton, VStack, Input, useDisclosure, Spinner, Text, Field as Fields } from "@chakra-ui/react";
import { FaPhone } from 'react-icons/fa';
import { useAuth } from "../services/authContext/AuthContext";
import AlertComponent from './Alert';

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

export default function PhoneAuthModal() {
  const { isLoading, error, setError ,onConfirmPhoneCode , onPhoneSignIn} = useAuth();
  const { open, onOpen, onClose } = useDisclosure();
  const [isCodeSent, setIsCodeSent] = useState(false);
  const [confirmationResult, setConfirmationResult] = useState(null);

  const onSubmit = async (values, { setSubmitting }) => {
    try {
      if (!isCodeSent) {
        const result = await onPhoneSignIn(values.phoneNumber);
        setConfirmationResult(result);
        setIsCodeSent(true);
      } else {
        const user = await onConfirmPhoneCode(confirmationResult, values.code);
        console.log("User signed in:", user);
        onClose();
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Drawer.Root open={open} onEscapeKeyDown={onClose} closeOnEscape>
      <Drawer.Trigger asChild>
        <Link onClick={() => {
          setError(null);
          onOpen();
        }}>
          <FaPhone size='25px' fontSize='5px' />
           Phone Sign In
        </Link>
      </Drawer.Trigger>
    <Portal>
        <Drawer.Backdrop />
        <Drawer.Positioner padding="4">
          <Drawer.Content rounded="md">
            <Drawer.Header>
              <Drawer.Title>Phone Authentication</Drawer.Title>
            </Drawer.Header>
            <Drawer.Body>
              {isLoading ? (
                <Spinner size='xl' style={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                }} />
              ) : (
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
                          disabled={isLoading || isSubmitting}
                        >
                          {isCodeSent ? "Verify Code" : "Send Code"}
                        </Button>
                      </VStack>
                    </Form>
                  )}
                </Formik>
              )}
              {error && <AlertComponent alertMessage={error} />}
            </Drawer.Body>
            <Drawer.Footer>
              <Button variant="outline" onClick={onClose}>Cancel</Button>
            </Drawer.Footer>
            <Drawer.CloseTrigger asChild>
              <CloseButton size="sm" />
            </Drawer.CloseTrigger>
          </Drawer.Content>
        </Drawer.Positioner>
      </Portal>
      <div id="recaptcha-container"></div>
    </Drawer.Root>
  );
}