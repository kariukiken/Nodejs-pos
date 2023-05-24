const asyncHandler = require("express-async-handler");
const pool = require("../config/dbConnect")






const createsaleCtrl = asyncHandler(async (req, res) => {
  let saleData = req.body;
  //console.log(saleData);

  if (!Array.isArray(saleData)) {
    // If only one item is passed in the request body, wrap it in an array
    saleData = [saleData];
  }

  const values = saleData.map((item) => [item.product_id, item.product_name, item.product_price, item.quantity, item.product_price * item.quantity]);
  //const values = saleData.map((item) => [item.product_id, item.product_name, item.product_price, item.quantity]);
  //console.log(values);

  //const profit = product_price * quantity;

  pool.query('INSERT INTO sales (product_id, product_name, product_price, quantity, unit_sale ) VALUES ?', [values], (error, results) => {
    if (error) {
          //console.error(error);
      return res.status(500).json({ error });
    }

    // Delete the cart data stored in the session
    delete req.session.cart;
    //res.status(200).send('Sale created successfully');
    return res.redirect("/pos") 
    //return res.json({ message: 'Sale created successfully' });
  });


});


// Get all sales
const getallSales = asyncHandler( async (req, res ) => {
  pool.query('SELECT * FROM sales', (error, results) => {
    if (error) {
      return res.status(500).json({ error: 'Internal Server Error' });
    }

    //return res.render("admin/sales", { sales:results })
    return res.json(results);
  });
});







module.exports = {  createsaleCtrl, getallSales }




