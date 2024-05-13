import express from "express"
import { addUser, login } from "../Controller/userController.js"
const userRoute = express.Router()

userRoute.post("/register",addUser)
userRoute.post("/login",login)



export default userRoute