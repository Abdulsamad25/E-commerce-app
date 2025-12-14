import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: {type: String, required: true},  // e.g., "Dove White Tee"
  description: {type: String, required: true},
  price: {type: Number, required: true},
  image: {type: Array, required: true},
  category: {type: String, required: true},  // "Men", "Women", or "Unisex"
  subCategory: {type: Array, required: true},  // "Topwear", "Bottomwear", etc.
  brand: {type: String},  // "Dove Collection", "Eye Collection", "Blessed Croptop", etc. (optional)
  sizes: {type: Array, required: true},
  colors: {type: Array, required: true},  // NEW: ["Black", "White", "Black & White", etc.]
  bestSeller: {type: Boolean},
  date: {type: Number, required: true}
})

const productModel = mongoose.models.product || mongoose.model("product", productSchema);
export default productModel