const express = require("express")
const { addingPost, gettingAllPost, getSinglePost } = require("../controllers/post.controllers")


const postRouter = express.Router()

postRouter.post("/addpost", addingPost)
postRouter.get("/allposts", gettingAllPost)
postRouter.get("/post/:id", getSinglePost)

module.exports={postRouter}