const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const validator = require("validator");
exports.createUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }
      if (!validator.isEmail(email)) {
      return res.status(400).json({
        message: "Invalid email format",
      });
    }
     if (
      !validator.isStrongPassword(password, {
        minLength: 6,
        minUppercase: 0,
        minSymbols: 0,
      })
    ) {
      return res.status(400).json({
        message: "Password must be at least 6 characters",
      });
    }
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }
    // const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      name,
      email,
      password,
      
      });
          const token = jwt.sign({ id: newUser._id,role:newUser.role }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
        sameSite: "none", 
      maxAge: 24 * 60 * 60 * 1000,
    });
    res.status(201).json({ message: "Signup successful & logged in", data: newUser });
  } catch (error) {
    console.log("User not saved", error.message);
     res.status(500).json({
    message: "Server error",
  });
  }
};

exports.login = async (req, res) => {
  try {

    const { email, password } = req.body;
    console.log(password)
    if (!email || !password) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }
    const userExist = await User.findOne({ email }).select("+password");
    if (!userExist) {
      return res.status(404).json({ message: "User not exist" });
    }
    console.log(userExist)
   const isMatch=await bcrypt.compare(password,userExist.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid Credientials" });
    }
    const token = jwt.sign({ id: userExist._id,role:userExist.role }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
        sameSite: "none", 
      maxAge: 24 * 60 * 60 * 1000,
    });
        console.log("Entered email:", email);
console.log("Entered password:", password);
console.log("User from DB:", userExist);
console.log("DB password:", userExist.password);
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
exports.logout = async (req, res) => {
  try {
    res.cookie("token", "", {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      expires: new Date(0), // expire immediately
    });

    res.status(200).json({
      message: "Logged out successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Logout failed",
    });
  }
};