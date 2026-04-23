const Razorpay = require("razorpay");
const crypto = require("crypto");
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});


exports.createRazorpayOrder = async (req, res) => {
  try {
    const { amount } = req.body;

    if (!amount) {
      return res.status(400).json({ message: "Amount is required" });
    }

    const options = {
      amount: amount * 100, // ₹ → paise
      currency: "INR",
      receipt: "receipt_" + Date.now(),
    };

    const order = await razorpay.orders.create(options);

    res.status(200).json({
      success: true,
      order,
    });

  } catch (error) {
    res.status(500).json({
      message: "Razorpay order creation failed",
      error: error.message,
    });
  }
};
exports.verifyPayment = async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

    // Create the signature verification string
    const sign = razorpay_order_id + "|" + razorpay_payment_id;

    // Use your secret key to hash the string
    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(sign.toString())
      .digest("hex");

    // Compare signatures
    if (expectedSignature === razorpay_signature) {
      // SUCCESS: Payment is authentic
      // This is where you update your MongoDB Order status to "Paid"
      return res.status(200).json({ 
        success: true, 
        message: "Payment verified successfully" 
      });
    } else {
      // FAILURE: Someone might be tampering with the request
      return res.status(400).json({ 
        success: false, 
        message: "Invalid payment signature" 
      });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
};