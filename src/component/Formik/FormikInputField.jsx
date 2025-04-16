import React from 'react'
import { VStack , Input , Text , Button  , Field as ChakraField, Spinner} from '@chakra-ui/react'
import { useFormikContext  , Field} from 'formik'
import { useCart } from '../../services/cartContext/CartContext'

export default function FormikInputField() {
const {isLoading } = useCart()
const {touched , errors , isSubmitting} =  useFormikContext()
  return (
    <VStack mb={2}>
        <ChakraField.Root>
            <ChakraField.Label>الاسم</ChakraField.Label>
                <Field 
                    as={Input}
                    name="name"
                    placeholder="Name"
                    type="text"
                    size={{ base: "2xs", md: "xs", lg: "md" }}
                    fontSize={{ base: "sm", md: "sm", lg: "md" }}
                    borderRadius={{
                    base: "5xl",
                    md: "10px",
                    lg: "15px",
                    }}
                />
                 {touched.name &&
                  errors.name && (
                  <Text color="red.500" fontSize="sm">
                     {errors.name}
                  </Text>
                  )}
                
                <ChakraField.Label>رقم هاتف</ChakraField.Label>
                <Field 
                    as={Input}
                    name="phoneNumber"
                    placeholder="phoneNumber"
                    type="numric"
                    size={{ base: "2xs", md: "xs", lg: "md" }}
                    fontSize={{ base: "sm", md: "sm", lg: "md" }}
                    borderRadius={{
                    base: "5xl",
                    md: "10px",
                    lg: "15px",
                    }}
                />
                 {touched.address &&
                  errors.phoneNumber && (
                  <Text color="red.500" fontSize="sm">
                     {errors.phoneNumber}
                  </Text>
                  )}
                
                <ChakraField.Label>عنوان التسليم </ChakraField.Label>
                <Field 
                    as={Input}
                    name="address"
                    placeholder="Full address"
                    type="text"
                    size={{ base: "2xs", md: "xs", lg: "md" }}
                    fontSize={{ base: "sm", md: "sm", lg: "md" }}
                    borderRadius={{
                    base: "5xl",
                    md: "10px",
                    lg: "15px",
                    }}
                />
                 {touched.address &&
                  errors.address && (
                  <Text color="red.500" fontSize="sm">
                     {errors.address}
                  </Text>
                  )}
             
                 <ChakraField.Label>وصف/اختيارالون</ChakraField.Label>
                       <Field 
                    as={Input}
                    name="description"
                    placeholder="Description"
                    type="text"
                    size={{ base: "2xs", md: "xs", lg: "md" }}
                    fontSize={{ base: "sm", md: "sm", lg: "md" }}
                    borderRadius={{
                    base: "5xl",
                    md: "10px",
                    lg: "15px",
                    }}
                />
                {touched.description &&
                  errors.description && (
                  <Text color="red.500" fontSize="sm">
                     {errors.description}
                  </Text>
                  )}
                
                  <Button
                    alignSelf='center'
                    type="submit"
                    disabled={ isLoading || isSubmitting}
                   >
                     ... ارسل الطلب
                     {isLoading && <Spinner   size='sm'/>}
                  </Button>

            </ChakraField.Root>
    </VStack>
  )
}
