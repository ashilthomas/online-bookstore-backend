import validator from "validator";
import UserModel from "../models/userModel.js";
import bcrypt from "bcryptjs"
import "dotenv/config"
import generateToken from "../Utils/generateToken.js";

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
        return res.json({ success: false, message: "Please enter more than 8 numbers" });
    }
    const hash = await bcrypt.hash(password, 10);

    const NewUser = await UserModel({
        name:name,
        email:email,
        password:hash
    })

  const user = await NewUser.save()
    const token = generateToken(email)
    
  res.status(200).cookie("token",token).json({
    success:true,
    message:"Register successfully",
    user,
    token
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
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: "Invalid credentials" });
    }

    const token = generateToken(email);
   

    res.status(200)
    .cookie("token", token)
    .json({ success: true, message: "Login successfully", user, token, isAuthenticated: true });








   
   
    req.user = user;

  
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};





export {addUser,login}
