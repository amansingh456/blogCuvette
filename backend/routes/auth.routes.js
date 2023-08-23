const express = require("express")
const { registerUser, loginUser, loggedInUser } = require("../controllers/auth.controllers")
const authRouter = express.Router()

authRouter.post("/register", registerUser)
authRouter.post("/login", loginUser)
authRouter.get("/loggedinuser", loggedInUser)

module.exports={authRouter}