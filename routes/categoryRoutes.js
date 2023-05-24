const express = require("express")
const router = express.Router();
const { 
	addcategoryCtrl,
	categoriesCtrl,
	updateCategorybyIdCtrl,
	deletecategorybyIdctrl,
	deleteallcatesCtrl 
} = require('../controllers/categoryCtrl') 




router.post("/add-categories", addcategoryCtrl)
router.get("/get-all-categories", categoriesCtrl)
router.delete("/delete/:id", deletecategorybyIdctrl)
router.post("/update/:id", updateCategorybyIdCtrl)
router.delete("/delete-all-categories", deleteallcatesCtrl)



module.exports = router;