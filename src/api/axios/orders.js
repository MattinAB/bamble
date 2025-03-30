import axios from "axios";


const envUrl = "http://127.0.0.1:5001/bamble-8ba29/us-central1/sendOrder"

export const sendOrder = async (orderData)=>{
    try {
        const response = await  axios.post(envUrl, orderData)
        return response.data;
        
    } catch (error) {
        console.error('Error sending order from axios fn:', error);
        throw new Error(error.message)
    }
  
}

