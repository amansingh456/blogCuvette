const db = require("../configs/db")
const jwt = require("jsonwebtoken")
require("dotenv").config()




const addComments = async (req, res) => {
  //  const token = req.cookies.access_token
  //  if (!token) return res.status(401).send("you are not authorized to perform this action..!");
  const { authorization } = req.headers;
  if (!authorization) return res.status(401).send("you are not authorized to perform this action..!");
  const token = authorization.split(" ")[1];
  
   const user = jwt.verify(token, process.env.SECRET_KEY);
   const query = `SELECT * FROM users WHERE id = ?`;
   db.query(query, [user.id], (err, result) => {
     if (err) return res.status(500).send(err);
     if (result.length === 0) return res.status(404).send("User not found");
     const { comment } = req.body;
     const date = new Date().toLocaleString();
     const query = `INSERT INTO comments (comment, userid, postid, date) VALUES (?, ?, ?,?)`;
     db.query(query, [comment, user.id, req.params.id, date], (err, result) => {
       if (err) {
         console.log(err);
         return res.status(500).send(err);
       }
       return res.status(200).send("Comment added");
     });
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
 
 const deleteComment = async(req,res) =>{
  const {id} = req.params;
  const query = `DELETE FROM comments WHERE commentid = ?`;
  db.query(query, [id], (err, result)=>{
    if (err) return res.status(500).send(err);
     return res.status(200).send(result);
  })
 }


 const updateComment = async(req,res)=>{
  const {id} = req.params
 
  const query = `UPDATE comments SET comment = ? WHERE commentid = ?`;
  db.query(query, [req.body.comment,id], (err, result)=>{
    
    if (err) return res.status(500).send(err);
    
     return res.status(200).send(result);
  })
 }

 module.exports={addComments,fetchComments, deleteComment, updateComment}