const mongoose = require('mongoose');
const { roles, verified } = require("../../config");

// 
// const Token = require("./Token")
// const crypto = require("crypto");
// const { sendingMail } = require("../../nodemailer/mailing")

// 

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  age: {
    type: Number,
    required: true
  },
  role: {
    type: String,
    defaults: roles.USER,
  },
  firstName: {
    type: String,
    required: true,
    
  },
  lastName: {
    type: String,
    required: true,
  },

  verified: {
    type: Boolean,
    defaults: verified.NOT
  },

  token: {
    type: String
  }
  

})

module.exports = {
  initialise: (mongoose) => {
        this.model = mongoose.model('User', userSchema)
      },
  
  createUser: (user) => {
        return this.model.create(user);
      },
  
  
  findUser: async (query) => {
        return await this.model.findOne().where(query).exec();
//TODO=> COMEBACK HERE
      },

  updateUser: (query, updatedValue) => {
    return this.model.updateOne(query, updatedValue);
  },

  findAllUsers: () => {
    return this.model.find({});
  },

  deleteUser: (id) => {
    return this.model.findByIdAndDelete(id).then(console.log("user deleted successfully"));
  }
    
}

