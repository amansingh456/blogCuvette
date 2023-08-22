const express = require("express")
const cors = require("cors")
const cookieParser = require("cookie-parser")
const { authRouter } = require("./routes/auth.routes")
const { postRouter } = require("./routes/post.routes")
const { userRouter } = require("./routes/user.routes")
require("dotenv").config()
const PORT = process.env.PORT

const app =  express()

// middleware for getting data in json format 
app.use(express.json())

// middleware for connecting backend to frontend 
app.use(cors())
app.use(cookieParser())

app.get("/",(req,res)=>{
  res.send("Game On...!")
})
app.use("/api/auth", authRouter)
app.use("/api/posts", postRouter)
app.use("/api/user", userRouter)


app.listen(PORT, () => {
   console.log(`Server is running on port ${PORT} with ❤️`);
 });