import validator from "validator";
import UserModel from "../models/userModel.js";

import jwt from "jsonwebtoken";

import bcrypt from "bcrypt"

const addUser = async(req,res)=>{
  try {

    const {name,email,password}=req.body
     const exists = await UserModel.findOne({email})
     if(exists){
        return res.json({success:false,message:"email already exists"})
     }
     if (!validator.isEmail(email)) {
        return res.json({ success: false, message: "Please enter a valid email" });
    }

    if (password.length < 8) {
        return res.json({ success: false, message: "Please enter a strong password" });
    }
    const hash = await bcrypt.hash(password, 10);
    const NewUser = await UserModel({
        name:name,
        email:email,
        password:hash
    })

  const user = await NewUser.save()

  res.status(200).json({
    success:true,
    message:"Register successfully",
    user
  })
  } catch (error) {
    console.log(error);
    res.status(404).json({
        success:false,
        message:"Internal server error"
    })
    
  }
}

const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await UserModel.findOne({ email });
        if (!user) { // Corrected condition to check if user exists
            return res.json({ success: false, message: "User not found" });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.json({ success: false, message: "Invalid credentials" });
        }
        const token = jwt.sign({ user: user.email }, "accjlksfljklg");
        res.status(200).json({ success: true, message: "Login successfully",isAuthenticated:true,token });
        
    } catch (error) {
        console.log(error);
        res.status(404).json({ success: false, message: error.message });
    }
};



export {addUser,login}
