import express from "express"
import { addCart, getAllCartItems, updateQuantity } from "../Controller/cartController.js"

const cartRoute = express.Router()

cartRoute.post("/addcart",addCart)
cartRoute.put("/updatequantity/:id",updateQuantity)
cartRoute.post("/getallcart/:id",getAllCartItems)

export default cartRoute