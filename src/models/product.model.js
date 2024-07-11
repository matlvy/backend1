import mongoose from "mongoose";
import paginate from "mongoose-paginate-v2";

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

productSchema.plugin(paginate);

const ProductModel = mongoose.model("product", productSchema);

export default ProductModel;
