const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const mysql = require('mysql');
const path = require("path");
const methodOverride = require('method-override');
const pool = require("./config/dbConnect")


const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

const port = process.env.PORT || 8000;

const authRouter = require('./routes/authRoutes');
const posRouter = require('./routes/posRoutes');
const salesRouter = require('./routes/salesRoutes');
const categoryRouter = require('./routes/categoryRoutes');
const adminRouter = require('./routes/adminRouter');
const dotenv = require('dotenv');



dotenv.config({ path: './.env'});

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.set('partials', path.join(__dirname, 'views/partials'));



// Use body-parser middleware
const publicDirectory = path.join(__dirname, './public');
app.use(express.static(publicDirectory));

app.use('/js', express.static(__dirname +  'public/js'))
app.use('/css', express.static(__dirname +  'public/css'))

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


//app routes
app.use('/api/user', authRouter)
app.use('/api/products', posRouter)
app.use('/api/categories', categoryRouter)
app.use('/api/sales', salesRouter)
app.use('/admin', adminRouter)
//app.use('/api/receipt', receiptRouter)



app.get('/', (req, res) => {
  res.render('auth/login'); 
});


app.use('/register', (req , res) =>{
  res.render('auth/registration')
});

app.use('/login', (req , res) =>{
  res.render('auth/login')
});



app.use('/pos', (req , res) =>{

  const query = `SELECT * FROM products `;
  //const query = `SELECT * FROM products LIMIT 3`;

  //Execute Query
  pool.query(query, (error, result) => {

    if(!req.session.cart)
    {
      req.session.cart = [];
    }


  res.render('pos/pos', { products : result, cart : req.session.cart });
});
});





//Create Route for Add Item into Cart
app.post('/add_cart', (request, response) => {
  const product_id = request.body.product_id;
  const product_name = request.body.product_name;
  const product_price = request.body.product_price;
  
  // Initialize cart as an empty array if it hasn't been set yet
  request.session.cart = request.session.cart || [];
  
  let count = 0;
  for(let i = 0; i < request.session.cart.length; i++) {
    if(request.session.cart[i].product_id === product_id) {
      request.session.cart[i].quantity += 1;
      count++;
    }
  }

  if(count === 0) {
    const cart_data = {
      product_id : product_id,
      product_name : product_name,
      product_price : parseFloat(product_price),
      quantity : 1
    };

    request.session.cart.push(cart_data);
  }

  response.redirect("/pos/pos");
});


//Create Route for Remove Item from Shopping Cart
app.get('/remove_item', (request, response) => {

  const product_id = request.query.id;

  for(let i = 0; i < request.session.cart.length; i++)
  {
    if(request.session.cart[i].product_id === product_id)
    {
      request.session.cart.splice(i, 1);
    }
  }

  response.redirect("/pos/pos");

});



app.get('/pos', (req, res) => {
  let query = "SELECT * FROM products";
  let params = [];

  pool.query(query, params, (err, rows) => {
    if (err) {
      console.error(err.message);
      res.status(500).send('Internal Server Error');
    } else {
      res.render('pos/pos', { 
        products: rows, 
        searchQuery: '' // define searchQuery variable here
      });
    }
  });
});

//CART SEARCH FUNCTION/////
app.get('/search', (req, res) => {
  const q = req.query.q || ''; // get the value of the "q" parameter from the query string or set it to an empty string if it's not present
  // render the view with the "q" variable
  res.render('index', { products: productList, q });
});


////DELETE FUNCTIONS/////

//delete product by id 
app.get('/delete/:product_id', (req, res) => {
  const productId = req.params.product_id;
  let sql = 'DELETE FROM products WHERE product_id = ?';
  let query = pool.query(sql, [productId], (err, result) => {
    if(err) throw err;
    res.redirect('/admin/home');
  });
});


//delete category by id{ can only delete if there is data in products table - it is a choice field in products table}
app.get('/delete-category/:id', (req, res) => {
  const categoryId = req.params.category_id;
  let sql = 'DELETE FROM categories WHERE id = ?';
  let query = pool.query(sql, [categoryId], ( err, result) => {
    if(err) throw err;
    res.redirect('/admin/home/categories')
  });
});

//delete user by id 
app.get('/delete-user/:user_id', (req, res) => {
  const userId = req.params.user_id;
  let sql = 'DELETE FROM users WHERE user_id = ?';
  let query = pool.query(sql, [userId], ( err, result) => {
    if(err) throw err;
    res.redirect('/admin/home/users')
  });
});


app.post('/api/cart/empty', (req, res) => {
  req.session.cart = [];
  res.status(200).send('Cart emptied');
});






// Start server
app.listen(port, () => console.log(`Server running on http://localhost:${port}`));