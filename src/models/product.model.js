import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  title: String,
  description: String,
  price: Number,
  code: String,
  category: String,
  img: String,
  stock: String,
  status: Boolean,
  thumbnails: [],
});

const ProductModel = mongoose.model("product", productSchema);

export default ProductModel;
