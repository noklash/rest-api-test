const mongoose = require('mongoose');
const { roles } = require("../../config");

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
    required: true,
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


// const { DataTypes } = require("sequelize");
// const { roles } = require("../../config");

// const UserModel = {
//   id: {
//     type: DataTypes.INTEGER,
//     autoIncrement: true,
//     primaryKey: true,
//   },
//   username: {
//     type: DataTypes.STRING,
//     allowNull: false,
//     unique: true,
//   },
//   email: {
//     type: DataTypes.STRING,
//     allowNull: false,
//     unique: true,
//   },
//   password: {
//     type: DataTypes.STRING,
//     allowNull: false,
//   },
//   age: {
//     type: DataTypes.INTEGER,
//     allowNull: false,
//   },
//   role: {
//     type: DataTypes.STRING,
//     allowNull: false,
//     defaultValue: roles.USER
//   },
//   firstName: {
//     type: DataTypes.STRING,
//     allowNull: false
//   },
//   lastName: {
//     type: DataTypes.STRING,
//     allowNull: false
//   }
// };

// module.exports = {
//   initialise: (sequelize) => {
//     this.model = sequelize.define("user", UserModel);
//   },

//   createUser: (user) => {
//     return this.model.create(user);
//   },

//   findUser: (query) => {
//     return this.model.findOne({
//       where: query,
//     });
//   },

//   updateUser: (query, updatedValue) => {
//     return this.model.update(updatedValue, {
//       where: query,
//     });
//   },

//   findAllUsers: (query) => {
//     return this.model.findAll({
//       where: query
//     });
//   },

//   deleteUser: (query) => {
//     return this.model.destroy({
//       where: query
//     });
//   }
// };