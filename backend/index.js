const express = require("express")
const cors = require("cors")
require("dotenv").config()
const PORT = process.env.PORT

const app =  express()

// middleware for getting data in json format 
app.use(express.json())

// middleware for connecting backend to frontend 
app.use(cors())



app.listen(PORT, () => {
   console.log(`Server is running on port ${PORT} with ❤️`);
 });