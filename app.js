import express from "express";
import cors from "cors";
import { connectDB } from "./Config/db.js";
import userRoute from "./Routes/userRoute.js";
import productRoute from './Routes/productRoute.js';
import path from "path";
import cartRoute from "./Routes/cartRoute.js";
import cookieParser from "cookie-parser";
import paymentRouter from "./Routes/paymentRoutes.js";
import orderRoute from "./Routes/ordersRoutes.js";

const app = express();
const port = 3003;
const dirname = path.resolve();
connectDB();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static(path.join(dirname, "uploads")));

app.use(cookieParser());
app.use(
  cors({ 
    origin: true,
    credentials: true
   
  })
);


// router
app.use("/user", userRoute);
app.use("/products", productRoute);
app.use("/cart", cartRoute);
app.use("/payment",paymentRouter)
app.use("/orders",orderRoute)

app.listen(port, () => {
  console.log(`app listening on port ${port}`);
});
