import express from "express"
import { addCart } from "../Controller/cartController.js"

const cartRoute = express.Router()

cartRoute.post("/addcart",addCart)

export default cartRoute