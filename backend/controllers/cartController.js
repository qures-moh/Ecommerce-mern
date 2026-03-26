const Cart = require("../models/Cart");
const Product = require("../models/Product");

exports.addToCart = async (req, res) => {
  try {
    const { productId, quantity } = req.body;

    const userId = req.user.id;
    if (!productId) {
      return res.status(400).json({ message: "ProductId is required" });
    }
    const qty = quantity ? Number(quantity) : 1;
    const product = await Product.findById(productId).select("stock");

    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }
    if (qty > product.stock) {
      return res.status(400).json({
        message: "Exceeds available stock",
      });
    }

    //check cart alrady exist
    let cart = await Cart.findOne({ user: userId });
    if (!cart) {
      const newCart = await Cart.create({
        user: userId,
        items: [
          {
            product: productId,
            quantity: qty,
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

    if (cartIndex > -1) {
      const newQty = cart.items[cartIndex].quantity + qty;
      if (newQty > product.stock) {
        return res.status(400).json({
          message: "Exceeds available stock",
        });
      }
      cart.items[cartIndex].quantity = newQty;
    } else {
      cart.items.push({
        product: productId,
        quantity: qty,
      });
    }
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

exports.getCart = async (req, res) => {
  try {
    const userId = req.user.id;
    const cart = await Cart.findOne({ user: userId }).populate(
      "items.product",
      "name price stock",
    );
    if (!cart) {
      return res.status(404).json({
        message: "Cart not found",
      });
    }

    return res.status(200).json({
      message: "Cart fetched successfully",
      data: cart,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Not showing Cart",
      error: error.message,
    });
  }
};

exports.removeCart = async (req, res) => {
  try {
    const { productId } = req.params;

    const userId = req.user.id;
    const cart = await Cart.findOne({ user: userId });

    if (!cart) {
      return res.status(404).json({
        message: "Cart not found",
      });
    }
    const initialLength = cart.items.length;
    cart.items = cart.items.filter(
      (item) => item.product.toString() !== productId,
    );
    if (cart.items.length === initialLength) {
      return res.status(404).json({
        message: "Product not found in cart",
      });
    }
    await cart.save();
    return res.status(200).json({
      message: "Product removed successfully",
      cart,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Not removed",
      error: error.message,
    });
  }
};

exports.decreaseQuantity = async (req, res) => {
  try {
    const userID = req.user.id;
    const { productId } = req.params;
    const cart = await Cart.findOne({ user: userID });

    if (!cart) {
      return res.status(404).json({ message: "No such cart exist" });
    }

    const cartIndex = cart.items.findIndex(
      (item) => item.product._id.toString() === productId,
    );

    if (cartIndex === -1) {
      return res.status(404).json({ message: "Product not found in cart" });
    }

    if (cart.items[cartIndex].quantity > 1) {
      cart.items[cartIndex].quantity -= 1;
    } else {
      cart.items.splice(cartIndex, 1);
    }

    await cart.save();
    return res.status(200).json({
      message: "quantity decreased successfully",
      data: cart,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Not Decreased quantity",
      error: error.message,
    });
  }
};

exports.increseQuantity = async (req, res) => {
  try {
    const userID = req.user.id;
    const { productId } = req.params;
    const cart = await Cart.findOne({ user: userID });

    if (!cart) {
      return res.status(404).json({ message: "No such cart exist" });
    }

    const cartIndex = cart.items.findIndex(
      (item) => item.product._id.toString() === productId,
    );

    if (cartIndex === -1) {
      return res.status(404).json({ message: "Product not found in cart" });
    }

    cart.items[cartIndex].quantity += 1;
    await cart.save();
    return res.status(200).json({
      message: "quantity Increased successfully",
      data: cart,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error increasing quantity",
      error: error.message,
    });
  }
};



exports.totalPrice=async(req,res)=>{
  try{
   const userId= req.user.id;
  const cart= await Cart.findOne({user:userId}).populate("items.product");
   if (!cart) {
      return res.status(404).json({ message: "No such cart exist" });
    };

    

    const totalPrice=cart.items.reduce((acc,item)=>{
      return acc+item.product.price*item.quantity
    },0);

    res.status(200).json({message:"total Price", data:totalPrice,m:cart})




  }catch(error){
   return res.status(500).json({
      message: "failed to fetch the total price",
      error: error.message,
    });
  }
}