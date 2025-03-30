import React from 'react'
import FormikInit from './Formik/Formik.init'
import * as Yup from "yup"
import FormikInputField from './Formik/FormikInputField'
import { useCart } from '../services/cartContext/CartContext'
import {useAuth} from '../services/authContext/AuthContext'
import { sendOrder } from '../api/axios/orders'

const validationSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    phoneNumber: Yup.string().required('Phone Number is required'),
    address: Yup.string().required('Address is required'),
    size: Yup.string().required('Size is required'),
    description: Yup.string(),
})

export default function OrderField() {
  const {user} = useAuth()
  const {cartItems , clearCart  , setIsLoading } = useCart()

  const onSubmit = async(values)=>{
    const orderData = {
      userId : user?.uid ,
      cartItems,
      values
    }
      try {
        if(user !== null){
          setIsLoading(true)
          const response = await  sendOrder(orderData)
          if(response){
            clearCart()
            setIsLoading(false)
            return
          }
        }else{
          alert("Please login to make an order")
          setIsLoading(false)
          return
        }
        
      } catch (error) {
        console.error("Error sending order from orderField:", error);
        alert('Failed to send order')
        setIsLoading(false)
        return  
      }
  }

    
  return (
        <FormikInit
          initialValues={{
            name: "",
            phoneNumber: "",
            address: "",
            size: "",
            description: "",
        }}
           validationSchema={validationSchema}
            onSubmit={onSubmit}
        >
            <FormikInputField/>
        </FormikInit>
  )
}
