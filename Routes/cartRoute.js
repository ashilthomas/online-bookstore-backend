import express from "express"
import { addCart, getAllCartItems, updateQuantity ,deleteCart} from "../Controller/cartController.js"
import authenticateUser from "../middleware/userAuth.js"



const cartRoute = express.Router()

cartRoute.post("/addcart",authenticateUser,addCart)
cartRoute.post("/updatequantity",authenticateUser,updateQuantity)
cartRoute.post("/getallcart",authenticateUser,getAllCartItems)
cartRoute.post("/deletecart",authenticateUser,deleteCart)

export default cartRoute