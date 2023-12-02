// const { DataTypes } = require("sequelize");
const { productPriceUnits } = require("../../config");
const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  priceUnit: {
    type: String,
    required: true,
    defaults: productPriceUnits.DOLLAR,
  },

})

module.exports = {
  initialise: (mongoose) => {
        this.model = mongoose.model('Product', productSchema)
      },
  
  createProduct: (user) => {
        return this.model.create(user);
      },    
  
  findProduct: (query) => {
        return this.model.findOne().where(query).exec();
//TODO=> COMEBACK HERE
      },

  updateProduct: (query, updatedValue) => {
        return this.model.updateOne(query, updatedValue);
      },
    
  findAllProducts: () => {
        return this.model.find({} );
      },
  //     function(err, result) {
  //       if (err) {
  //         console.log(err);
  //       } else {
  //         this.json(result)
  // //TODO COME BACK HERE LATER
  //       }
  //     }
    
  deleteProduct: (id) => {
        return this.model.findByIdAndDelete(id).then(console.log("Item deleted"));
      }
    
}
