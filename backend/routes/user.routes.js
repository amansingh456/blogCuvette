const express = require("express")
const { getUser } = require("../controllers/user.controllers")

const userRouter = express.Router()

userRouter.get("/getuser", getUser)

module.exports={userRouter}