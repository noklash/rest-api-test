const router = require("express").Router();

const {  verifyEmail, createUser } = require("../users/controllers/UserController")

// Controller Imports
const AuthorizationController = require("./controllers/AuthorizationController");

// Middleware Imports
const SchemaValidationMiddleware = require("../common/middlewares/SchemaValidationMiddleware");

// JSON Schema Imports for payload verification
const registerPayload = require("./schemas/registerPayload");
const loginPayload = require("./schemas/loginPayload");

router.post(
  "/signup",
  [SchemaValidationMiddleware.verify(registerPayload)],
  AuthorizationController.register
);

router.get('/verify-email/:id/:token', verifyEmail)

router.post(
  "/login",
  [SchemaValidationMiddleware.verify(loginPayload)],
  AuthorizationController.login
);

module.exports = router;
