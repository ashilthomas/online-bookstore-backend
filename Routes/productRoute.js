import express from "express"
import { addBooks, getAllBooks,getBookDetails, removeBooks, searchBooks,getCategories, pagination } from "../Controller/productController.js"
import { upload } from "../middleware/upload.js"



const productRoute = express.Router()

productRoute.post("/addbooks",upload.single("image"),addBooks)
productRoute.get("/allbooks",getAllBooks)
productRoute.get("/bookdetails/:id",getBookDetails)
productRoute.get("/searchbooks",searchBooks)
productRoute.get("/pagination",pagination)
productRoute.get("/categories",getCategories)
productRoute.post("/removebooks/:id",removeBooks)

export default productRoute
