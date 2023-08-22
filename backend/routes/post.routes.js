const express = require("express")
const { addingPost } = require("../controllers/post.controllers")


const postRouter = express.Router()

postRouter.post("/addpost", addingPost)

module.exports={postRouter}