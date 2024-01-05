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


// Express Routes Import
const AuthorizationRoutes = require("./authorization/routes");
const UserRoutes = require("./users/routes");
const ProductRoutes = require("./products/routes");
const CartRoutes = require("./cart/routes")

// Sequelize model imports
const UserModel = require("./common/models/User");
const ProductModel = require("./common/models/Product");
const CartModel = require("./common/models/Cart");

app.use(morgan("tiny"));
app.use(cors());

app.use(Express.json());


// Initialising the Model on sequelize
UserModel.initialise(mongoose);
ProductModel.initialise(mongoose);
CartModel.initialise(mongoose);



  connectTodb().then(() => {
    console.log("Mongoose is  Initialised!!");

    // Attaching the Authentication and User Routes to the app.
    app.use("/", AuthorizationRoutes);
    app.use("/user", UserRoutes);
    app.use("/product", ProductRoutes);
    app.use("/cart", CartRoutes);

    app.listen(PORT, () => {
      console.log("Server Listening on PORT:", port);
    });
  })
  .catch((err) => {
    console.error("MONGODB connection threw an error:", err);
  });


