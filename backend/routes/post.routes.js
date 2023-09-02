const express = require("express")
const { addingPost, gettingAllPost, getSinglePost, dltPost } = require("../controllers/post.controllers")
const { fetchComments, addComments, deleteComment } = require("../controllers/comment.controllers")


const postRouter = express.Router()

postRouter.post("/addpost", addingPost)
postRouter.get("/allposts", gettingAllPost)
postRouter.get("/:id", getSinglePost)
postRouter.delete("/:id", dltPost)
postRouter.get("/comments/:id", fetchComments)
postRouter.delete("/comments/:id", deleteComment)
postRouter.post("/addcomment/:id", addComments)

module.exports={postRouter}