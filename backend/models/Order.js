const mongoose=require("mongoose");
const orderSchema= new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true,
    },
    items:[
        {
            product:{
                type:mongoose.Schema.Types.ObjectId,
                ref:"Product",
                required:true
            },
            quantity:{
                type:Number,
                required:true,
                min:1
            },
            price:{
                type:Number,
                required:true
            }
        }
    ],
    totalAmount:{
        type:Number,
        required:true
    },
    shippingAddress:{
        fullName:{
            type:String,
            required:true
        },
        phone:{
            type:String,
            required:true,
        },
        address:{
            type:String,
            required:true,
        },
        city:{
            type:String,
            required:true
        },
        postalCode:{
            type:String,
            required:true
        },
        country:{
            type:String,
            default:"India"
        }
    },
      paymentMethod: {
      type: String,
      enum: ["COD", "ONLINE"],
      default: "COD",
    },
       paymentStatus: {
      type: String,
      enum: ["pending", "paid", "failed"],
      default: "pending",
    },
    status:{
        type:String,
        enum:["pending","confirmed","shipped","delivered","cancelled"],
        default:"pending"
    },
    razorpay_order_id: { type: String },
    razorpay_payment_id: { type: String },
    deliveredAt:{
        type:Date,
    },
    cancelledAt:{
        type:Date
    }


},{timestamps:true});

module.exports = mongoose.model("Order", orderSchema);