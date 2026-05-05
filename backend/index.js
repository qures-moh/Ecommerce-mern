
require("dotenv").config(); 
const express=require("express");
const app=express();
const mongoose=require("mongoose");
const cookieParser=require("cookie-parser");
const cors = require("cors");

const userRoutes = require("./routes/userRoutes");

const productRoutes = require("./routes/productRoutes");
const cartRoutes=require("./routes/cartRoutes");
const orderRoutes=require("./routes/orderRoutes");
const paymentRoutes=require("./routes/paymentRoutes")
const connectDb=require("./config/db");
app.use(cors({
   
     origin: process.env.FRONTEND_URL,
       credentials:true,
      
}));

app.use(express.json());
app.use(cookieParser());


app.use(express.urlencoded({ extended: true }));

app.use("/api/user",userRoutes);
app.use("/api/product",productRoutes);
app.use("/api/cart",cartRoutes);
app.use("/api/order",orderRoutes);
app.use("/api/payment",paymentRoutes)



connectDb();
const PORT = process.env.PORT || 3000;
app.listen(PORT,()=>{
    console.log(`app is listening to port ${process.env.PORT}`)
})