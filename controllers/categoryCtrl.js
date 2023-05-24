const asyncHandler = require("express-async-handler");
const pool = require("../config/dbConnect")



// Add categories
const addcategoryCtrl = asyncHandler( async (req, res ) => {
  const { name } = req.body;
  console.log(req.body);

  pool.query('INSERT INTO categories (name) VALUES (?)', [name ], (error, results) => {
    if (error) {
      return res.status(500).json({ error: 'Category already exists' });
    }

        return res.redirect('/admin/home/categories/' );
    //return res.json({ message: 'Category added successfully' });
  });
});


// Get all categories
const categoriesCtrl = asyncHandler( async (req, res ) => {
  pool.query('SELECT * FROM categories', (error, results) => {
    if (error) {
      return res.status(500).json({ error: 'Internal Server Error' });
    }

    return res.json(results);
  });
});

//update category by id 
const updateCategorybyIdCtrl = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const newName = req.body.name;

  pool.query('UPDATE categories SET name = ? WHERE id = ?', [newName, id], (error, results) => {
    if (error) {
      return res.status(500).json({ error: 'Internal Server Error' });
    }

    if (results.affectedRows === 0) {
      return res.status(404).json({ error: 'Category not found' });
    }

    return res.redirect('/admin/home/categories/' );
    //return res.json({ message: 'Category name updated successfully' });
  });
});


//delete category by id
const deletecategorybyIdctrl = asyncHandler( async ( req, res ) => {
  const id = req.params.id;
  console.log(id);

  pool.query('DELETE FROM categories WHERE id = ?', [id], (error, results) => {
    if (error) {
      return res.status(500).json({ error: 'Internal Server Error' });
    }

    if (results.affectedRows === 0) {
      return res.status(404).json({ error: 'Category not found' });
    }


        return res.redirect('/admin/home/categories/' );
    //return res.json({ message: 'Category deleted successfully' });
  });
});

//delete all categories 
const deleteallcatesCtrl = asyncHandler(async (req, res) => {
  pool.query('DELETE FROM categories', (error, results) => {
    if (error) {
      return res.status(500).json({ error });
    }

    return res.json({ message: 'All categories deleted successfully' });
  });
});



module.exports = { 
  addcategoryCtrl,
  categoriesCtrl,
  updateCategorybyIdCtrl,
  deletecategorybyIdctrl,
  deleteallcatesCtrl  
};

