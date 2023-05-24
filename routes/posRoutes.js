const express = require("express")
const router = express.Router();
const { 
	getallproductsCtrl,
	addproductsCtrl,
	getproductsbyid,
	deleteproductbyIdctrl
} = require('../controllers/posCtrl') 




router.get("/products", getallproductsCtrl)
router.post("/add-products", addproductsCtrl)
router.post("/:product_id", getproductsbyid)
router.delete("/delete/:product_id", deleteproductbyIdctrl)



module.exports = router;