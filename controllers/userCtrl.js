const asyncHandler = require("express-async-handler");
const session = require('express-session');
const bcrypt = require('bcrypt');
const pool = require("../config/dbConnect")

//register user
const createUser = asyncHandler(async (req, res) => {
  const { firstname, secondname, email, username, password, is_admin } = req.body;

  // Check if username already exists
  pool.query('SELECT * FROM users WHERE username = ? OR email = ?', [username, email], (error, results) => {
    if (error) {
      return res.status(500).json({ error });
    }

    if (results.length > 0) {
      const existingUser = results.find(user => user.username === username);
      if (existingUser) {
        return res.status(400).json({ error: 'Username already exists' });
      }

      const existingEmail = results.find(user => user.email === email);
      if (existingEmail) {
        return res.status(400).json({ error: 'Email already exists' });
      }
    }

    // Hash the password
    bcrypt.hash(password, 10, (err, hashedPassword) => {
      if (err) {
        return res.status(500).json({ error });
      }

      const isAdmin = is_admin ? 1 : 0; // Convert the checkbox value to 1 or 0

      // Create new user with hashed password and is_admin value
      pool.query('INSERT INTO users (firstname, secondname, email, username, password, is_admin) VALUES (?, ?, ?, ?, ?, ?)', [firstname, secondname, email, username, hashedPassword, isAdmin], (error, results) => {
        if (error) {
          return res.status(500).json({ error: 'Internal Server Error' });
        }

        return res.redirect('/admin/home/users/');
        //return res.json({ message: 'User created successfully' });
      });
    });
  });
});



//login user

//login user
const loginUserCtrl = asyncHandler(async (req, res) => {
  const { username, password } = req.body;
  //console.log(req.body);

  // Find user with the given username
  pool.query('SELECT * FROM users WHERE username = ?', [username], async (error, results) => {
    if (error) {
      return res.status(500).json({ error: 'Internal Server Error' });
    }

    if (results.length === 0) {
      return res.status(401).json({ error: 'Invalid username or password' });
    }

    const user = results[0];

    // Compare the hashed password with the user input password
    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      return res.status(401).json({ error: 'Invalid username or password' });
    }

    // Store user information in session

    req.session.user = user;
    //console.log(user);

    if (user.is_admin) {
      return res.redirect('/admin/home');
    } else {
      return res.redirect('/pos/pos');
    }
  });
});



//user logout 
const logoutCtrl = asyncHandler( async( req, res ) => {
	req.session.destroy();
  return res.redirect('/login')
  //return res.json({ message: 'User logged out successfully' });
});



// Update user by ID
const updateUserById = asyncHandler(async (req, res) => {
  const id = req.params.user_id;
  console.log(id);
  const { firstname, secondname, email, username } = req.body;
  console.log(req.body);

  // Convert is_admin to boolean value
  const is_admin = req.body.is_admin === 'on' ? 1 : 0;

  pool.query(
    'UPDATE users SET firstname = ?, secondname = ?, email = ?, username = ?, is_admin = ? WHERE user_id = ?',
    [firstname, secondname, email, username, is_admin, id],
    (error, results) => {
      if (error) {
        return res.status(500).json({ error });
      }

      if (results.affectedRows === 0) {
        return res.status(404).json({ error: 'User not found' });
      }

      return res.redirect('/admin/home/users');
      //return res.json({ message: 'Product updated successfully' });
    }
  );
});



//delete user by id
const deleteUserById = asyncHandler( async ( req, res ) => {
  const id = req.params.id;
  console.log(id);

  pool.query('DELETE FROM users WHERE id = ?', [id], (error, results) => {
    if (error) {
      return res.status(500).json({ error: 'Internal Server Error' });
    }

    if (results.affectedRows === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    return res.json({ message: 'User deleted successfully' });
  });
});

module.exports = { 
	createUser,
	loginUserCtrl, 
	logoutCtrl,
  updateUserById,
  deleteUserById
};



