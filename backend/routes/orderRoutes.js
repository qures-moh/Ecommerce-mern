const express=require("express");
const { auth } = require("../middleware/auth");
const { createOrder, getMyOrder, getMySingleOrder } = require("../controllers/orderController");

const router=express.Router();

router.post("/createOrder",auth,createOrder);

router.get("/getMyOrder",auth,getMyOrder);

router.get("/getSingleOrder/:orderId",auth,getMySingleOrder)

module.exports=router;