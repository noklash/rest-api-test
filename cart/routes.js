const router = require("express").Router();

const CartController = require("./controllers/CartController");

// Middleware imports 
const isAuthenticatedMiddleware = require("./../common/middlewares/IsAuthenticatedMiddleware");
const SchemaValidationMiddleware = require("../common/middlewares/SchemaValidationMiddleware");
// const CheckPermissionMiddleware = require("../common/middlewares/CheckPermissionMiddleware");

const createCartPayload = require("./schema/createCartPayload");

// get cart items

router.get("/", 
    [   isAuthenticatedMiddleware.check
        // CheckPermissionMiddleware.has(roles.user)
    ],
    CartController.getCart
);

// add cart 
router.post("/", 
    [   isAuthenticatedMiddleware.check,
        // SchemaValidationMiddleware.check
        // CheckPermissionMiddleware.has(roles.user)
    ],
    CartController.addCart
);

// delete item from cart
router.delete("/", 
    [   isAuthenticatedMiddleware.check,
        // CheckPermissionMiddleware.has(roles.user)
    ],
    CartController.deleteItem
);

module.exports = router;