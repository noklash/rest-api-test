const Express = require("express");
const app = Express();
const cors = require("cors");
const morgan = require("morgan");
require('dotenv').config()

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
const uploadRoute = require("./upload/cloudinary")

const UserModel = require("./common/models/User");
const ProductModel = require("./common/models/Product");
const CartModel = require("./common/models/Cart");

app.use(morgan("tiny"));
app.use(cors());

app.use(Express.json({ limit: '25mb' }));
app.use(Express.urlencoded({ limit: '25mb' }))
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', "*");
  next();
});




// Initialising the Model on sequelize
UserModel.initialise(mongoose);
ProductModel.initialise(mongoose);
// CartModel.initialise(mongoose);



  connectTodb().then(() => {
    console.log("Mongoose is  Initialised!!");

    // Attaching the Authentication and User Routes to the app.
    app.use("/api/", AuthorizationRoutes);
    app.use("/user", UserRoutes);
    app.use("/product", ProductRoutes);
    app.use("/cart", CartRoutes);
    // app.use("/upload", uploadRoute)

    app.post("/upload", (req, res) => {
      uploadRoute(req.body.image)
      .then((url) => res.send(url))
      .catch((err) => res.status(500).send(err));
    });

    app.listen(PORT, () => {
      console.log("Server Listening on PORT:", port);
    });
  })
  .catch((err) => {
    console.error("MONGODB connection threw an error:", err);
  });


