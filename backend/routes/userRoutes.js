const express = require("express");
const router = express.Router();
const {createUser,login, getProfile,logout}=require("../controllers/userController");
const { auth } = require("../middleware/auth");
router.post("/register", createUser);
router.post("/login",login);
router.get("/profile",auth,getProfile);
router.post("/logout",logout)

module.exports = router;