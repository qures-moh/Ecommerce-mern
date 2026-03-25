const Cart = require("../models/Cart");

exports.addToCrt = async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    const  userId  = req.user.id;

    //check cart alrady exist
    let cart = await Cart.findOne({ user: userId });
    if (!cart) {
      const newCart = await Cart.create({
        user: userId,
        items: [
          {
            product: productId,
            quantity: quantity || 1,
          },
        ],
      });
      return res
        .status(201)
        .json({ message: "New Cart added Successfully", data: newCart });
    }

    //cart exist
    //check the same product exist or not

    const cartIndex = cart.items.findIndex(
      (item) => item.product.toString() === productId,
    );

    if(cartIndex>-1){
        cart.items[cartIndex].quantity+=quantity || 1;
    }else{
        cart.items.push({
            product:productId,
            quantity:quantity ||1
        })
    };
    await cart.save();
    return res.status(200).json({
      message: "Product added to cart",
      data: cart,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error adding to cart",
      error: error.message,
    });

  }
};
