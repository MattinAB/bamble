const admin = require("firebase-admin");
const cors = require("cors")({ origin: true });
admin.initializeApp();

const db = admin.firestore();
module.exports.orderRequest = async (req, res) => {
  const orderData = req.body;

  
  cors(req, res, async () => {
    // Check if the request method is POST (optional but good practice)
    if (req.method !== 'POST') {
      return res.status(405).send({ error: 'Method Not Allowed' });
    }})

  try {
    const docRef = await db.collection("orders").add(orderData);

    const { cartItems } = orderData; // Assuming `items` contains the products and sizes to update
    for (const item of cartItems) {
      const productRef = admin.database().ref(`bamble/`);

      const productSnapshot = await productRef.once("value");

      if (!productSnapshot.exists()) {
        throw new Error(`Product  not found`);
      }

      const products = productSnapshot.val();

      const productIndex = products.findIndex((p) => p.id === item.id);
      const product = products[productIndex];

      if (!product) {
        throw new Error(`Product with ID ${item.id} not found`);
      }

      const sizeIndex = product.sizes.findIndex(
        (s) => s.size === item.selectedSize
      );


      if (sizeIndex === -1) {
        throw new Error(
          `Size ${item.size} not found for product ${item.productId}`
        );
      }

      if (product.sizes[sizeIndex].quantity <= 0 || product.sizes[sizeIndex].quantity < item.quantity) {
        console.log("NOt Enough quantity found ")
        throw new Error(
          `Not enough quantity for size ${item.size} in product ${item.productId}`
        );
      }


      
      
      const updates = {};
      
      if (product.sizes[sizeIndex].quantity == 1) {
          updates[`bamble/${productIndex}/sizes/${sizeIndex}/isAvailable`] = false;
          updates[`bamble/${productIndex}/sizes/${sizeIndex}/quantity`] =
          product.sizes[sizeIndex].quantity - item.quantity;
        }else{
          updates[`bamble/${productIndex}/sizes/${sizeIndex}/quantity`] =
          product.sizes[sizeIndex].quantity - item.quantity;
        }
      await admin.database().ref().update(updates);

      

    }
    
    res.status(200).send({
      message: `Document ${docRef.id} added successfully`,
      orderData,
    });
  } catch (error) {
    res.status(500).send(error);
  }
};
