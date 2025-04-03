import { ref,  get  } from "firebase/database";
import { database } from "../../firebase-env";


 const productRef = ref(database, 'bamble');

// ... your Firebase initialization code and dbRef ...

export default async function fetchProducts() {
    try {
        const snabshot = await get(productRef)
        
        if(snabshot.exists()){
            const data = snabshot.val()
            return data
        } else {
            console.log("No data available at this location.");
            return null; // Return null if no data 
        }
        
    } catch (error) {
        console.error("Error fetching data:", error);
        return null 
    }

  
    
  
}
