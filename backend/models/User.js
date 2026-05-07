const bcrypt=require("bcrypt")
const mongoose=require("mongoose");
const userSchema=mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
        trim:true,
    },
    password:{
        type:String,
        required:true,
        select:false,

    },
    role:{
        type:String,
        enum:["user","admin"],
        default:"user",
    }

},{
    timestamps:true
});

userSchema.pre("save",async function (next) {
      try {
    if(!this.isModified("password")) return next();

    const salt=await bcrypt.genSalt(10);
    this.password=await bcrypt.hash(this.password,salt);
    next();
      } catch (error) {
    next(error);
  }

})
module.exports=mongoose.model("User",userSchema)