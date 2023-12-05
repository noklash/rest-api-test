const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
    owner : {
        type: String,
         required: true,
         ref: 'User'
       },
      items: [{
        itemId: {
         type: String,
         ref: 'Item',
         required: true
      },
      name: String,
      quantity: {
         type: Number,
         required: true,
         min: 1,
         default: 1},
         price: Number
       }],
      bill: {
          type: Number,
          required: true,
         default: 0
        }
      }, {
      timestamps: true
})

const Cart = mongoose.model('Cart', cartSchema)
module.exports = Cart

// https://medium.com/geekculture/how-i-built-an-e-commerce-api-with-nodejs-express-and-mongodb-part-4-318e3f494611