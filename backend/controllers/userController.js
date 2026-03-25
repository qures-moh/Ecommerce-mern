const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
exports.createUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }
    const newUser = await User.create({
      name,
      email,
      password,
      
    });

    res.status(201).json({ message: "User added succefully", data: newUser });
  } catch (error) {
    console.log("User not saved", error.message);
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }
    const userExist = await User.findOne({ email }).select("+password");
    if (!userExist) {
      return res.status(404).json({ message: "User not exist" });
    }
    const isMatch =await  bcrypt.compare(password, userExist.password);
    if (!isMatch) {
      return res.status(400).status({ message: "Invalid Credientials" });
    }
    const token = jwt.sign({ id: userExist._id,role:userExist.role }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      maxAge: 24 * 60 * 60 * 1000,
    });
    res.status(200).json({
      message: "Login successful",
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
    });
  }
};

exports.getProfile=async(req,res)=>{
    try{
    const user=await User.findById(req.user.id).select("-password");
      res.status(200).json({
      message: "User profile fetched",
      data: user
    });

    
    }catch(err){
            res.status(500).json({
      message: "Server error"
    });

    }
}