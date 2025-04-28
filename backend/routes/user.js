const express = require('express')
const userRouter = express.Router();
const RegisterUser = require("../user/register");
const Login = require("../user/login")

// TODO: Add hashing to store a hashed password into the database
userRouter.post("/api/v1/register", RegisterUser);

// TODO: Set Cookies at the frontend
userRouter.post("/api/v1/login", Login)


module.exports = userRouter;