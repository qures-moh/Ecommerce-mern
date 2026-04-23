const express = require("express");
const { auth } = require("../middleware/auth");
const {
  createOrder,
  getMyOrder,
  getMySingleOrder,
  updateOrderStatus,
  getAllOrders
} = require("../controllers/orderController");
const { isAdmin } = require("../middleware/isAdmin");
const { getDashBoardStats } = require("../controllers/dashboardController");

const router = express.Router();

router.post("/createOrder", auth, createOrder);

router.get("/getMyOrder", auth, getMyOrder);
router.get("/admin/all", auth, isAdmin, getAllOrders);
router.get("/getSingleOrder/:orderId", auth, getMySingleOrder);
router.patch("/updateStatus/:orderId",auth,isAdmin,updateOrderStatus);

router.get("/admin/dashboard",auth,isAdmin,getDashBoardStats);

module.exports = router;
