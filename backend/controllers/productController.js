const Product = require("../models/Product");
exports.createProduct = async (req, res) => {
  try {
    const { name, price, description, category, image, stock } = req.body;

    if (!name || !price || !description || !category || !image || stock=="") {
     return  res.status(400).json({ message: "All fieds are required" });
    }
    const newProduct = await Product.create({
      name,
      price:Number(price),
      description,
      category,
      image,
      stock:Number(stock),
    });

    return res.status(201).json({
      message: "New product added",
      newProduct,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Product Not Stored" }, error.message);
  }
};

exports.updateProduct = async (req, res) => {
  try {
    const { name, description, stock, category, image, price } = req.body;
    const { id } = req.params;
    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      { name, price, description,category,image ,stock },
      { new: true },
    );
    if (!updatedProduct) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    res.status(200).json({ message: "Updated Product", data: updatedProduct });
  } catch (error) {
    return res.status(500).json({
      message: "Product not updated",
      error: error.message,
    });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const delelteProduct = await Product.findByIdAndDelete(id);
    if (!delelteProduct) {
      return res.status(404).json({ message: "Product not found" });
    }
    res
      .status(200)
      .json({ message: "Delelted Succesfuuly", data: delelteProduct });
  } catch (error) {
    return res.status(500).json({
      message: "Product not delelted",
      error: error.message,
    });
  }
};

exports.viewAllProduct=async(req,res)=>{
    try{
       const allProduct= await Product.find({});
      
       return    res
      .status(200)
      .json({ message: "Product fetched Succefully", data: allProduct , count:allProduct.length});

    }
    catch(error){
        return res.status(500).json({
      message: "No Product found",
      error: error.message,
    });
    }
};

exports.getSingleProduct=async(req,res)=>{
    try {
    const { id } = req.params;

    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    return res.status(200).json({
      message: "Single product fetched",
      data: product,
    });

  } catch (error) {
    return res.status(500).json({
      message: "Error fetching product",
      error: error.message,
    });
  }
}