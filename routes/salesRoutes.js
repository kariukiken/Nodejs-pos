const express = require("express")
const router = express.Router();

const {  createsaleCtrl, getallSales } = require('../controllers/salesCtrl');



router.post("/create-sale", createsaleCtrl)
router.get("/get_all_sales", getallSales)



module.exports = router;