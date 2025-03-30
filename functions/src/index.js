const  { onRequest } =require("firebase-functions/v2/https");
const { orderRequest } = require("./orders");



 module.exports.sendOrder = onRequest((request, response) => {
  return orderRequest(request , response)
});
