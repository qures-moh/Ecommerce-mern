const express=require("express");
const { auth } = require("../middleware/auth");
const { isAdmin } = require("../middleware/isAdmin");
const { addToCrt } = require("../controllers/cartController");
const router=express.Router();

router.post("/add",auth,addToCrt);

module.exports=router;