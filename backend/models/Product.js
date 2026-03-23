const mongoose=require("mongoose");
const productSchema=mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true,
    },
    price:{
        type:Number,
        required:true,
    },
    description:{
        type:String,
        required:true,
        trim:true,
    },
    category:{
        type:String,
        enum:["electronics","clothing", "books", "home"]
    },
    image:{
        type:String,
        required:true,
    },
    stock:{
        type:Number,
          default: 0,
    }
},{timestamps:true});
module.exports=mongoose.model("Product",productSchema)