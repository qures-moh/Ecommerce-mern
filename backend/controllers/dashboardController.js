const Order = require("../models/Order");
const User = require("../models/User");
const Product = require("../models/Product");
exports.getDashBoardStats = async (req, res) => {
  try {
    const totalOrders = await Order.countDocuments();

const totalUsers = await User.countDocuments();

    // 📦 Products
    const totalProducts = await Product.countDocuments();


    const revenueData = await Order.aggregate([
      { $match: { paymentStatus: "paid" } },
      {
        $group: {
          _id: null,
          total: { $sum: "$totalAmount" },
        },
      },
    ]);

    const totalRevenue = revenueData[0]?.total || 0;

    const statusStats = await Order.aggregate([
      {
        $group: {
          _id: "$status",
          count: { $sum: 1 },
        },
      },
    ]);
    

    res.status(200).json({
      message: "Data Successfully fetched",
      data: {
        totalOrders,
        totalUsers,
        totalProducts,
        totalRevenue,
        statusStats,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
