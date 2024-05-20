import express from "express";
import cors from "cors";
import { connectDB } from "./Config/db.js";
import userRoute from "./Routes/userRoute.js";
import productRouter from "./Routes/ProductRoute.js";
import path from "path";
import cartRoute from "./Routes/cartRoute.js";
import cookieParser from "cookie-parser";

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
    credentials: true,
    origin: true,
  })
);
app.use(cookieParser());

// router
app.use("/user", userRoute);
app.use("/products", productRouter);
app.use("/cart", cartRoute);

app.listen(port, () => {
  console.log(`app listening on port ${port}`);
});
