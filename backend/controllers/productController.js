const Product=require("../models/Product");
exports.createProduct=async(req,res)=>{
    try{
        const {name,price,description,category,image,stock}=req.body;
        
        if(!name || !price || !description|| !category || !image || !stock){
            res.status(400).json({message:"All fieds are required"});
        };
        const newProduct=await Product.create({
            name,
            price,
            description,
            category,
            image,
            stock
        });
      
        return res.status(201).json({
            message: "New product added",
            newProduct
        });


        
    }catch(error){
        return res.status(500).json({message:"Product Not Stored"},error.message)
    }
};

