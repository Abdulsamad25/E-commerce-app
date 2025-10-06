import { v2 as cloudinary } from "cloudinary";

const connectCloudinary = async () => {
  // Debug: Log environment variables
  console.log("Environment Variables Check:");
  console.log("CLOUDINARY_CLOUD_NAME:", process.env.CLOUDINARY_CLOUD_NAME);
  console.log("CLOUDINARY_API_KEY:", process.env.CLOUDINARY_API_KEY);
  console.log(
    "CLOUDINARY_SECRET_KEY:",
    process.env.CLOUDINARY_SECRET_KEY ? "Set" : "Not Set"
  );

  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_SECRET_KEY,
  });

  console.log("Cloudinary configured successfully!");
};

export default connectCloudinary;
