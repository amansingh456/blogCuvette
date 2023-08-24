const db = require("../configs/db")
const jwt = require("jsonwebtoken")
require("dotenv").config()




const addingPost = async (req, res) => {
   const { authorization } = req.headers;
  //  const token = req.cookies.access_token
   if (!authorization) return res.status(401).send("you are not authorized to perform this action..!");
  //  if (!token) return res.status(401).send("you are not authorized to perform this action..!");
   const token = authorization.split(" ")[1];
   
   const user = jwt.verify(token, process.env.SECRET_KEY);
   console.log('user: ', user);
   
   const query = `SELECT * FROM users WHERE id = ?`;
   db.query(query, [user.id], (err, result) => {
     if (err) return res.status(500).send(err);
     if (result.length === 0) return res.status(404).send("user not found");
    
     const { title, description, image } = req.body;
     if (!title || !description || !image)
       return res.status(400).send("please fill all the fields..!");
     const query = `INSERT INTO posts (title, description, img, date, userid) VALUES (?, ?, ?, ?, ? )`;
     
     const date = new Date().toLocaleString();
     db.query(
       query,
       [title, description, image, date, user.id],
       (err, result) => {
         if (err) return res.status(500).send(err);
         return res.status(200).send("hurrah...post uploaded ..! 😊");
       }
     );
   });
 };
 


 const gettingAllPost = async (req, res) => {
   const query = `SELECT * FROM posts`;
   db.query(query, (err, result) => {
     if (err) return res.status(500).send(err);
     return res.status(200).send({ result });
   });
 };
 


 const getSinglePost = async (req, res) => {
   const { id } = req.params;
   console.log(id);
   const query = `SELECT * FROM posts WHERE postid = ?`;
   db.query(query, [id], (err, result) => {
     if (err) return res.status(500).send(err);
     return res.status(200).send(result[0]);
   });
 };



 const fetchComments = async (req, res) => {
   const { id } = req.params;
   const query = `SELECT * FROM comments WHERE postid = ?`;
   db.query(query, [id], (err, result) => {
     if (err) return res.status(500).send(err);
     return res.status(200).send(result);
   });
 };


 module.exports={addingPost, gettingAllPost, getSinglePost, fetchComments}