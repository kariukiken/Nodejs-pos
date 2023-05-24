const asyncHandler = require("express-async-handler");
const pool = require("../config/dbConnect");
const pagination = require('../middlewares/pagination');

/*
const allproductsCtrl = asyncHandler(async ( req, res ) => {
   const sql = `SELECT p.product_id, p.product_name, p.product_price, p.quantity
               FROM products p
               JOIN categories c ON p.category_id = c.id`;

  pool.query(sql, (err, results) => {
    if (err) throw err;
    const products = results;
    res.render('admin/admin', { products, categories });
  });
});*/

//display all
const allproductsCtrl = asyncHandler( async ( req, res ) => {
	pool.query('SELECT * FROM products', (error, results) => {
    if (error) {
      return res.status(500).json({ error: 'Internal Server Error' });
    }

    return res.render("admin/admin", {  products:results })
    //return res.json(results);
  });
});


//display all categories
const  allcategoriesCtrl =  asyncHandler( async (req , res) => {
  pool.query('SELECT * FROM categories', (error, results) => {
    if(error) {
      return res.status(500).json({error: 'Internal Server Error'});
    }
    return res.render("admin/categories", { categories:results})
  });
});


// Get all sales
const salesCtrl = asyncHandler( async (req, res ) => {
  pool.query('SELECT * FROM sales', (error, results) => {
    if (error) {
      return res.status(500).json({ error: 'Internal Server Error' });
    }

    return res.render("admin/sales", { sales:results })
    //return res.json(results);
  });
});

//get all users

const usersCtrl = asyncHandler( async (req, res ) => {
  pool.query('SELECT * FROM users', (error, results) => {
    if (error) {
      return res.status(500).json({ error: 'Internal Server Error' });
    }

    return res.render("admin/users", { users:results })
    //return res.json(results);
  });
});


//get store name
const storeCtrl = asyncHandler( async (req, res ) => {
  pool.query('SELECT * FROM storeName', (error, results) => {
    if (error) {
      return res.status(500).json({ error: 'Internal Server Error' });
    }

    //return res.render("admin/sales", { sales:results })
    return res.json(results);
  });
});


module.exports = { allproductsCtrl, allcategoriesCtrl, salesCtrl, usersCtrl, storeCtrl  }