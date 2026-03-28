const Cart = require("../models/Cart");
const Order = require("../models/Order");
exports.createOrder = async (req, res) => {
  try {
    const userId = req.user.id;
    const { shippingAddress, paymentMethod } = req.body;
    const cart = await Cart.findOne({ user: userId }).populate(
      "items.product",
      "price",
    );
    if (!cart) {
      return res.status(404).json({ message: "Cart not Found" });
    }
    if (cart.items.length === 0) {
      return res.status(400).json({ message: "Cart is empty" });
    }

    let totalAmount = 0;

    const orderItems = cart.items.map((item) => {
      const price = item.product.price;
      totalAmount += price * item.quantity;

      return {
        product: item.product._id,
        quantity: item.quantity,
        price: price,
      };
    });

    //createOrder
    const order = new Order({
      user: userId,
      items: orderItems,
      totalAmount,
      shippingAddress,
      paymentMethod,
      paymentStatus: "pending",
    });

    await order.save();
    cart.items = [];
    await cart.save();
    res.status(201).json({
      success: true,
      message: "Order created successfully",
      order,
    });
  } catch (error) {
    res.status(500).json({
      message: "Order creation failed",
      error: error.message,
    });
  }
};

exports.getMyOrder = async (req, res) => {
  try {
    const userId = req.user.id;
    const orders = await Order.find({ user: userId })
      .sort({ createdAt: -1 })
      .populate("items.product", "name price");
    if (orders.length === 0) {
      return res.status(404).json({ message: "No order exists" });
    }
    res
      .status(200)
      .json({ message: "My Order Succefully fetched", data: orders });
  } catch (eror) {
    res.status(500).json({
      message: "Order creation failed",
      error: error.message,
    });
  }
};

exports.getMySingleOrder = async (req, res) => {
  try {
    const { orderId } = req.params;
    const userId = req.user.id;
    const order = await Order.findById(orderId).populate(
      "items.product",
      "name price",
    );

    if (!order) {
      return res.status(404).json({
        message: "Order not found",
      });
    }

    if (order.user.toString() !== userId) {
      return res.status(403).json({
        message: "Not authorized to access this order",
      });
    }
    res.status(200).json({
      success: true,
      order,
    });
  } catch (error) {
    res.status(500).json({
      message: "Order creation failed",
      error: error.message,
    });
  }
};

exports.updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const { orderId } = req.params;
    const allowedStatus = [
      "pending",
      "confirmed",
      "shipped",
      "delivered",
      "cancelled",
    ];
    if (!allowedStatus.includes(status)) {
      return res.status(400).json({
        message: "Invalid status value",
      });
    }

    const myOrder = await Order.findById(orderId);
    if (!myOrder) {
      return res.status(404).json({ message: "Order not Found" });
    }

     if (myOrder.status === status) {
      return res.status(400).json({
        message: `Order is already ${status}`,
      });
    }
    if (myOrder.status === "delivered" || myOrder.status === "cancelled") {
      return res
        .status(403)
        .json({ message: `Order is already ${myOrder.status}` });
    }
    const statusFlow = {
      pending: ["confirmed", "cancelled"],
      confirmed: ["shipped", "cancelled"],
      shipped: ["delivered"],
      delivered: [],
      cancelled: [],
    };


if (!statusFlow[myOrder.status].includes(status)) {
  return res.status(400).json({
    message: `Cannot change status from ${myOrder.status} to ${status}`,
  });
}
   

    myOrder.status = status;
    if(myOrder.status==="delivered"){
      myOrder.deliveredAt=Date.now();
    }
    if(myOrder.status ==="cancelled"){
      myOrder.cancelledAt=Date.now();
    }
    await myOrder.save();

    res
      .status(200)
      .json({ message: "Order status updated succesfully", data: myOrder });
  } catch (error) {
    res.status(500).json({
      message: "Order update failed",
      error: error.message,
    });
  }
};
