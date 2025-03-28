import { Form, Formik } from "formik";





export default function FormikInit({children , onSubmit , initialValues , validationSchema    }){
    return(
        <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
           {() => (
            <Form>
                {children}
            </Form>
           )}
        </Formik>
    )
}