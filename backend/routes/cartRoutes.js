const express=require("express");
const { auth } = require("../middleware/auth");
const { isAdmin } = require("../middleware/isAdmin");
const { addToCart, getCart, decreaseQuantity, increseQuantity, totalPrice,removeCart } = require("../controllers/cartController");
const router=express.Router();

router.post("/add",auth,addToCart);
router.get("/getCart",auth,getCart);
router.post("/decreaseqty/:productId",auth,decreaseQuantity);
router.post("/increaseqty/:productId",auth,increseQuantity);
router.get("/totalPrice",auth,totalPrice);
router.post("/remove/:productId",auth,removeCart)


module.exports=router;