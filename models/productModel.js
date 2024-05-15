import mongoose from "mongoose";

const productSchema = new mongoose.Schema({

    name:{type:String,},
    description:{type:String,},
    price:{type:String},
    author:{type:String},
    category:{type:String},
    image:{type:String}
    
})

const ProductModel =  mongoose.model("books", productSchema);

export default ProductModel;