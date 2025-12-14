import mongoose from "mongoose";
import bcrypt from "bcrypt";
import adminModel from "../models/adminModel.js";
import dotenv from "dotenv";
import readline from "readline";

dotenv.config();

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const question = (query) => {
  return new Promise((resolve) => {
    rl.question(query, resolve);
  });
};

const createFirstAdmin = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log(" Connected to MongoDB\n");

    // Check if admin already exists
    const existingAdmin = await adminModel.findOne({});
    if (existingAdmin) {
      console.log("  Admin already exists!");
      console.log("Email:", existingAdmin.email);
      rl.close();
      process.exit(0);
    }

    console.log("=== CREATE FIRST ADMIN ===\n");

    // Get admin details from user input
    const name = await question("Enter admin name: ");
    const email = await question("Enter admin email: ");
    const password = await question("Enter admin password (min 8 characters): ");

    // Validate input
    if (!name || !email || !password) {
      console.log(" All fields are required!");
      rl.close();
      process.exit(1);
    }

    if (password.length < 8) {
      console.log(" Password must be at least 8 characters!");
      rl.close();
      process.exit(1);
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create admin
    const newAdmin = new adminModel({
      name,
      email,
      password: hashedPassword,
      role: 'admin'
    });

    await newAdmin.save();

    console.log("\n Admin created successfully!");
    console.log("Email:", email);
    console.log("\n  Keep these credentials safe!");

    rl.close();
    process.exit(0);

  } catch (error) {
    console.error(" Error creating admin:", error);
    rl.close();
    process.exit(1);
  }
};

createFirstAdmin();