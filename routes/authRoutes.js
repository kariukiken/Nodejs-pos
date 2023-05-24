const express = require("express")
const router = express.Router();
const { createUser, loginUserCtrl, logoutCtrl, updateUserById, deleteUserById } = require('../controllers/userCtrl') 


router.post("/login", loginUserCtrl)
router.post("/register", createUser)
router.post("/logout", logoutCtrl)
router.post("/update-user/:user_id", updateUserById)
router.delete("/delete-user/:id", deleteUserById)



module.exports = router;