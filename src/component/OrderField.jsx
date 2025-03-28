import React from 'react'
import FormikInit from './Formik/Formik.init'
import * as Yup from "yup"
import FormikInputField from './Formik/FormikInputField'

const validationSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    phoneNumber: Yup.string().required('Phone Number is required'),
    address: Yup.string().required('Address is required'),
})

export default function OrderField() {
    
  return (
        <FormikInit
          initialValues={{
            name: "",
            phoneNumber: "",
            address: "",
        }}
           validationSchema={validationSchema}
            onSubmit={(values) => {
            console.log(values)
            // submit form
        }}
        >
            <FormikInputField/>
        </FormikInit>
  )
}
