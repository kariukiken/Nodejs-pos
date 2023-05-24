const asyncHandler = require("express-async-handler");
const pool = require("../config/dbConnect")


//before user accesses a page check if he/she is admin
const isAdmin = asyncHandler(async (req, res, next) => {
  const { user } = req.session;
 
  const { email } = user;
  const [rows, fields] = await pool.query('SELECT is_admin FROM users WHERE email = ?', [email]);
  if (rows.length === 0) {
    throw new Error('User not found');
  }
  const isUserAdmin = rows[0].is_admin;
  if (!isUserAdmin) {
    res.redirect('/pos');
  } else {
    next();
  }
});

module.exports = { isAdmin };

