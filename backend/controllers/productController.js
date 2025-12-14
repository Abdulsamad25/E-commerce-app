import { v2 as cloudinary } from "cloudinary";
import productModel from "../models/productModel.js";

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_SECRET_KEY,
});

//function for add product
const addProduct = async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      category,
      subCategory,
      brand,
      sizes,
      colors,
      bestSeller,
    } = req.body;

    const image1 = req.files.image1 && req.files.image1[0];
    const image2 = req.files.image2 && req.files.image2[0];
    const image3 = req.files.image3 && req.files.image3[0];
    const image4 = req.files.image4 && req.files.image4[0];

    const images = [image1, image2, image3, image4].filter(
      (item) => item !== undefined
    );

    // Validate that at least one image is provided
    if (images.length === 0) {
      return res.status(400).json({
        success: false,
        message: "At least one product image is required",
      });
    }

    let imagesUrl = await Promise.all(
      images.map(async (item) => {
        console.log("Uploading image:", item.path);
        console.log("Cloudinary config check:", {
          cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
          api_key: process.env.CLOUDINARY_API_KEY,
          api_secret: process.env.CLOUDINARY_SECRET_KEY ? "Set" : "Not Set",
        });

        let result = await cloudinary.uploader.upload(item.path, {
          resource_type: "image",
        });
        console.log("Upload successful:", result.secure_url);
        return result.secure_url;
      })
    );

    let parsedSizes;
    try {
      parsedSizes = JSON.parse(sizes);
    } catch (e) {
      return res.status(400).json({
        success: false,
        message: "Invalid sizes format. Must be a JSON array.",
      });
    }

    let parsedColors;
    try {
      parsedColors = JSON.parse(colors);
    } catch (e) {
      return res.status(400).json({
        success: false,
        message: "Invalid colors format. Must be a JSON array.",
      });
    }

    const productData = {
      name,
      description,
      category,
      price: Number(price),
      subCategory,
      brand,
      bestSeller: bestSeller === "true",
      sizes: parsedSizes,
      colors: parsedColors,
      image: imagesUrl,
      date: Date.now(),
    };

    console.log(productData);

    const product = new productModel(productData);
    await product.save();

    res.json({ success: true, message: "product added", product: productData });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

//function for list product
const listProducts = async (req, res) => {
  try {
    const products = await productModel.find({});
    res.json({ success: true, products });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

//function for removing product
const removeProduct = async (req, res) => {
  try {
    await productModel.findByIdAndDelete(req.body.id);
    res.json({ success: true, message: "Product removed" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

//function for single product
const singleProduct = async (req, res) => {
  try {
    const { productId } = req.body;
    const product = await productModel.findById(productId);

    res.json({ success: true, product });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

export { listProducts, addProduct, removeProduct, singleProduct };