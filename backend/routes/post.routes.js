const express = require("express")
const { addingPost, gettingAllPost, getSinglePost } = require("../controllers/post.controllers")
const { fetchComments, addComments } = require("../controllers/comment.controllers")


const postRouter = express.Router()

postRouter.post("/addpost", addingPost)
postRouter.get("/allposts", gettingAllPost)
postRouter.get("/:id", getSinglePost)
postRouter.get("/comments/:id", fetchComments)
postRouter.post("/addcomment/:id", addComments)

module.exports={postRouter}