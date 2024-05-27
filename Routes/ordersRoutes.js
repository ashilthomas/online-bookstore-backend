import express from "express"
import { getallOrders } from "../Controller/orderController"
const orderRoute = express.Router()

orderRoute.get("/orders",getallOrders)

export default orderRoute