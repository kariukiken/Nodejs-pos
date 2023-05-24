const asyncHandler = require("express-async-handler");
const pool = require("../config/dbConnect")





// Get all products
const getallproductsCtrl = asyncHandler( async (req, res ) => {
  pool.query('SELECT * FROM products', (error, results) => {
    if (error) {
      return res.status(500).json({ error: 'Internal Server Error' });
    }

    //return res.render("admin/sales", { sales:results })
    return res.json(results);
  });
});



// Add product
const addproductsCtrl = asyncHandler(async (req, res) => {
  const { category_id, product_name, brand, product_price, quantity, product_buyingprice, barcode } = req.body;

  const profit = product_price - product_buyingprice;

  pool.query(
    'INSERT INTO products (category_id, product_name, brand, product_price, quantity, product_buyingprice,barcode, profit) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
    [category_id, product_name, brand, product_price, quantity, product_buyingprice, barcode, profit],
    (error, results) => {
      if (error) {
        return res.status(500).json({ error });
      }
      return res.redirect('/admin/home');
      return res.json({ message: 'Product added successfully' });
    }
  );
});




// Update product by ID
const getproductsbyid = asyncHandler( async ( req, res ) => {
	const id = req.params.product_id;
  //console.log(id);
  const { barcode, product_name, brand, quantity, product_price, product_buyingprice } = req.body;
  //console.log(req.body);

  pool.query('UPDATE products SET barcode = ?, product_name = ?, brand = ?, quantity = ?, product_price = ?, product_buyingprice = ? WHERE product_id = ?', [ barcode, product_name, brand, quantity, product_price, product_buyingprice, id ], (error, results) => {
    if (error) {
      return res.status(500).json({ error});
    }

    if (results.affectedRows === 0) {
      return res.status(404).json({ error: 'Product not found' });
    }

    return res.redirect('/admin/home' );
    //return res.json({ message: 'Product updated successfully' });
  });
});



// Delete product by ID
const deleteproductbyIdctrl = asyncHandler( async ( req, res ) => {
	const id = req.params.id;
  //console.log(id);

  pool.query('DELETE FROM products WHERE id = ?', [id], (error, results) => {
    if (error) {
      return res.status(500).json({ error: 'Internal Server Error' });
    }

    if (results.affectedRows === 0) {
      return res.status(404).json({ error: 'Product not found' });
    }

    return res.json({ message: 'Product deleted successfully' });
  });
});






module.exports = {   
	getallproductsCtrl,
	addproductsCtrl,
	getproductsbyid,
	deleteproductbyIdctrl
};

