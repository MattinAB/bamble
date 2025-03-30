const admin = require("firebase-admin");

admin.initializeApp()


const db = admin.firestore()
module.exports.orderRequest = (req, res)=>{
    const orderData = req.body

    return db.collection('orders')
    .add(orderData)
    .then((docRef)=>{
        res.status(200).send({
            message: `Document ${docRef.id} added successfully`,
            orderData
        })
    })
    .catch((error)=>{
        res.status(500).send(error)
    })
   

}