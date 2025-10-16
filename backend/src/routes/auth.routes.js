const express = require("express");
const userModel = require("../models/user.model");
const jwt = require("jsonwebtoken");
const router = express.Router();
// Define your auth routes here
// POST/register
// POST/login
// GET/user [protected route]

router.post("/register",async (req, res) => {
    const {username, password} = req.body;

    const existingUser = await userModel.findOne({username});
    if(existingUser){
        return res.status(409).json({message: "Username already exists"});
    }

    const user = await userModel.create({username, password});
    const token = jwt.sign({
        id: user._id,
       

    }, process.env.JWT_SECRET)

    res.cookie("token",token);
    res.status(201).json({
        message: "User registered successfully",
        user
    });

});
module.exports = router;