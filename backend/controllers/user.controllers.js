const db = require("../configs/db");

const getUser = async (req, res) => {
  const { userid } = req.body;
  const query = `SELECT * FROM users WHERE id = ?`;
  db.query(query, [userid], (err, result) => {
    if (err) return res.status(500).send(err);
    return res.status(200).send(result[0]);
  });
};

module.exports = {
  getUser,
};
