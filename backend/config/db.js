const mongoose=require("mongoose");


const connectDb=async()=>{
    try{
      
        await mongoose.connect(process.env.MONGODB_URL);
       console.log("Mongodb connected")
    }catch(err){
        console.log("Mongodb not connected",err.message)
    }
};
module.exports=connectDb;