const Express = require("express");
const app = Express();
const cors = require("cors");
const morgan = require("morgan");

const mongoose = require('mongoose')

const { port } = require("./config");
const PORT = process.env.PORT || port;

async function connectTodb(){
  await mongoose.connect('mongodb+srv://noklash:Engineering2k@cluster0.urtdp8f.mongodb.net/?retryWrites=true&w=majority')
  .then(() => console.log("CONNECTED TO DB"));
  
}
// const db = mongoose.Connection;

// const db = connectTodb()
// Express Routes Import
const AuthorizationRoutes = require("./authorization/routes");
const UserRoutes = require("./users/routes");
const ProductRoutes = require("./products/routes");

// Sequelize model imports
const UserModel = require("./common/models/User");
const ProductModel = require("./common/models/Product");

app.use(morgan("tiny"));
app.use(cors());

// Middleware that parses the body payloads as JSON to be consumed next set
// of middlewares and controllers.
app.use(Express.json());


// Initialising the Model on sequelize
UserModel.initialise(mongoose);
ProductModel.initialise(mongoose);

// Syncing the models that are defined on sequelize with the tables that alredy exists
// in the database. It creates models as tables that do not exist in the DB.

  connectTodb().then(() => {
    console.log("Mongoose is  Initialised!!");

    // Attaching the Authentication and User Routes to the app.
    app.use("/", AuthorizationRoutes);
    app.use("/user", UserRoutes);
    app.use("/product", ProductRoutes);

    app.listen(PORT, () => {
      console.log("Server Listening on PORT:", port);
    });
  })
  .catch((err) => {
    console.error("MONGODB connection threw an error:", err);
  });


