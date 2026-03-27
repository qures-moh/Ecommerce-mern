const express = require("express");
const { auth } = require("../middleware/auth");
const {
  createOrder,
  getMyOrder,
  getMySingleOrder,
  updateOrderStatus,
} = require("../controllers/orderController");
const { isAdmin } = require("../middleware/isAdmin");

const router = express.Router();

router.post("/createOrder", auth, createOrder);

router.get("/getMyOrder", auth, getMyOrder);

router.get("/getSingleOrder/:orderId", auth, getMySingleOrder);
router.patch("/updateStatus/:orderId",auth,isAdmin,updateOrderStatus)

module.exports = router;
