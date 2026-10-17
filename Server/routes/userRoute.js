const express = require("express");
// user controllers;
const { register, login, checUser } = require("../controller/userController");

// authentication middleware;
const authMiddleware = require('../middleware/authmiddleware')

const router = express.Router();

// register route
router.post("/register",register)

// login route
router.post("/login",login);

// check user
router.get("/check",authMiddleware
  ,checUser);

module.exports = router;
