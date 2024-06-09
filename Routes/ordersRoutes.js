import express from "express"
import { getallOrders } from "../Controller/orderController.js"
import authenticateUser from "../middleware/userAuth.js"
const orderRoute = express.Router()

orderRoute.get("/allorders",authenticateUser,getallOrders)

export default orderRoute