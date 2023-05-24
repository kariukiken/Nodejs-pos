const express = require("express")
const router = express.Router();


const {  allproductsCtrl, allcategoriesCtrl, salesCtrl, usersCtrl, storeCtrl  } = require('../controllers/adminCtrl');



const { isAdm } = require('../middlewares/authMiddleware')

router.get("/home",allproductsCtrl);
router.get("/home/categories",allcategoriesCtrl );
router.get("/home/sales",salesCtrl );
router.get("/home/users",usersCtrl );
router.get("/store_name",storeCtrl );



module.exports = router;