import express from "express"
import { addBooks, getAllBooks,getBookDetails, pagination, removeBooks, searchBooks,getCategories } from "../Controller/productController.js"
import { upload } from "../middleware/upload.js"
import authenticateUser from "../middleware/userAuth.js"


const productRouter = express.Router()

productRouter.post("/addbooks",upload.single("image"),addBooks)
productRouter.get("/allbooks",getAllBooks)
productRouter.get("/bookdetails/:id",getBookDetails)
productRouter.post("/searchbooks",searchBooks)
productRouter.get("/pagination",pagination)
productRouter.get("/categories",getCategories)
productRouter.post("/removebooks/:id",removeBooks)

export default productRouter
