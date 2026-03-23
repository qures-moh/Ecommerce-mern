
const express=require("express");
const app=express();
const mongoose=require("mongoose");
const cookieParser=require("cookie-parser");


const userRoutes = require("./routes/userRoutes");

const productRoutes = require("./routes/productRoutes");
const connectDb=require("./config/db");
app.use(cookieParser());
app.use(express.json());
app.use("/api/user",userRoutes);
app.use("/api/product",productRoutes)

require("dotenv").config(); 
connectDb();
app.listen(process.env.PORT,()=>{
    console.log(`app is listening to port ${process.env.PORT}`)
})