
import ProductModel from "../models/productModel.js";
import fs from "fs";

// create books

const addBooks = async (req, res) => {
  console.log(req.body);
  const { name, description, price, author, category } = req.body;
  try {
    const newBooks = new ProductModel({
      name: name,
      description: description,
      price: price,
      author: author,
      category: category,
      image: req.file.filename,
    });
    const books = await newBooks.save();
    res.status(200).json({
      success: true,
      message: "books added",
      books,
    });
  } catch (error) {
    console.log(error);
  }
};
// get all books
const getAllBooks = async (req, res) => {
  try {
 
    const books = await ProductModel.find({});
    if (!books) {
      return res.json({ success: false, message: "NO Books Available" });
    }
    res.status(200).json({ success: true, books });
  } catch (error) {
    console.log(error);
    res.status(404).json({ success: false, message: error.message });
  }
};
// remove books 

const removeBooks = async (req, res) => {
  const { id } = req.params;

  try {
    if (!id) {
      return res
        .status(400)
        .json({ success: false, message: "Missing required parameter: id" });
    }

    const book = await ProductModel.findOne({ _id: id });
    if (!book) {
      return res
        .status(404)
        .json({ success: false, message: "No book found with that ID" });
    }

    try {
      deletedImage = await fs.promises.unlink(`uploads/${book.image}`);
    } catch (error) {
      console.error("Error deleting image file:", error);
    }

    await ProductModel.findByIdAndDelete(req.params.id);

    res
      .status(200)
      .json({ success: true, message: "Book removed successfully" });
  } catch (error) {
    console.error("Error during book removal:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// get one book detailes
const getBookDetails = async (req, res) => {
  
  const userId = req.params.id; 

  try {
    const bookDetails = await ProductModel.findById(userId);

    if (bookDetails.length === 0) {
      // Check if array is empty
      return res.json({ message: "No book found" });
    }

    res.json({ bookDetails });
  } catch (error) {
    console.error("Error finding single book:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const searchBooks = async (req,res)=>{
  
  const query = req.query.query;
  

console.log(req.query.query);

  try {
    const books = await ProductModel.find({
      $or: [
        { name: { $regex: query, $options: 'i' } }, // Case-insensitive search by title
        { author: { $regex: query, $options: 'i' } }, // Case-insensitive search by author
        { keywords: { $regex: query, $options: 'i' } } ,// Case-insensitive search by keywords
        { category: { $regex: query, $options: 'i' } } // Case-insensitive search by keywords
      ]
    });

    res.json(books);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
}
// pagination

const pagination = async (req, res) => {
  const page = parseInt(req.query.page) || 2;
  const limit = parseInt(req.query.limit) || 7;

  try {
    const totalCount = await ProductModel.countDocuments();

    const totalPages = Math.ceil(totalCount / limit);

    const skip = (page - 1) * limit;

    const products = await ProductModel.find().skip(skip).limit(limit);

    res.json({
      page,
      totalPages,
      totalCount,
      products,
    });
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
const getCategories = async (req, res) => {
  try {
    const allBooks = await ProductModel.find({});
    
    // Extract unique categories
    const categories = Array.from(new Set(allBooks.map(book => book.category)));

    if (categories.length === 0) {
      return res.status(404).json({ success: false, message: "No categories available" });
    }

    res.status(200).json({ success: true, categories });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};


export {
  addBooks,
  getAllBooks,
  getBookDetails,
  searchBooks,
  pagination,
  removeBooks,
  getCategories
};
