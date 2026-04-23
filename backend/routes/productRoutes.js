const express=require("express");
const { createProduct, updateProduct, deleteProduct, viewAllProduct,getSingleProduct } = require("../controllers/productController");
const router=express.Router();
const {auth}=require('../middleware/auth')
const { isAdmin } = require("../middleware/isAdmin");

router.get("/:id",getSingleProduct)
router.post("/create",auth,isAdmin,createProduct);
router.put("/:id",auth,isAdmin,updateProduct);
router.delete("/:id",auth,isAdmin,deleteProduct);
router.get("/",viewAllProduct);

module.exports=router;