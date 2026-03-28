const Order = require("../models/Order");
exports.getDashBoardStats = async (req, res) => {
  try {
    const totalOders = await Order.countDocuments();

    const revenueData = await Order.aggregate([
      { $match: { paymentStatus: "paid" } },
      {
        $group: {
          _id: null,
          total: { $sum: "$totalAmount" },
        },
      },
    ]);

    const totalRevnue = revenueData[0]?.total || 0;

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
        totalOders,
        totalRevnue,
        statusStats,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
