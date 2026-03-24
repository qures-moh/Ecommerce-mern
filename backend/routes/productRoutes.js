const express=require("express");
const { createProduct, updateProduct, deleteProduct, viewAllProduct } = require("../controllers/productController");
const router=express.Router();
const {auth}=require('../middleware/auth')
const { isAdmin } = require("../middleware/isAdmin");

router.post("/create",auth,isAdmin,createProduct);
router.patch("/:id",auth,isAdmin,updateProduct);
router.delete("/:id",auth,isAdmin,deleteProduct);
router.get("/",viewAllProduct);

module.exports=router;