import axios from "axios";



// const devEnvUrl = import.meta.env.VITE_DEV_FUNCTIONS_URL

const prodEnvUrl = import.meta.env.VITE_PRO_FUNCTIONS_URL

// console.log('prodEnvUrl:', prodEnvUrl)

export const sendOrder = async (orderData)=>{
    try {
        const response = await  axios.post(prodEnvUrl, orderData)
        return response.data;
        
    } catch (error) {
        console.error('Error sending order from axios fn:', error);
        throw new Error(error.message)
    }
  
}

