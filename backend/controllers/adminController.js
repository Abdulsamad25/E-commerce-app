import adminModel from "../models/adminModel.js";
import validator from "validator";
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';

// Get current admin profile
const getAdminProfile = async (req, res) => {
  try {
    // adminAuth middleware adds adminId to req object (not req.body)
    const adminId = req.adminId;
    
    const admin = await adminModel.findById(adminId).select('-password');
    
    if (!admin) {
      return res.json({success: false, message: "Admin not found"});
    }

    res.json({success: true, admin});

  } catch (error) {
    console.log(error);
    res.json({success: false, message: error.message});
  }
}

// Update admin password
const updatePassword = async (req, res) => {
  try {
    const {currentPassword, newPassword} = req.body;
    const adminId = req.adminId; // Get from req object, not req.body

    // Validate new password
    if (newPassword.length < 8) {
      return res.json({success: false, message: "New password must be at least 8 characters"});
    }

    // Get admin with password
    const admin = await adminModel.findById(adminId);
    
    if (!admin) {
      return res.json({success: false, message: "Admin not found"});
    }

    // Verify current password
    const isMatch = await bcrypt.compare(currentPassword, admin.password);
    
    if (!isMatch) {
      return res.json({success: false, message: "Current password is incorrect"});
    }

    // Hash new password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    // Update password
    admin.password = hashedPassword;
    await admin.save();

    res.json({success: true, message: "Password updated successfully"});

  } catch (error) {
    console.log(error);
    res.json({success: false, message: error.message});
  }
}

// Update admin email
const updateEmail = async (req, res) => {
  try {
    const {newEmail, password} = req.body;
    const adminId = req.adminId; // Get from req object, not req.body

    // Validate email
    if (!validator.isEmail(newEmail)) {
      return res.json({success: false, message: "Please enter a valid email"});
    }

    // Get admin with password
    const admin = await adminModel.findById(adminId);
    
    if (!admin) {
      return res.json({success: false, message: "Admin not found"});
    }

    // Verify password
    const isMatch = await bcrypt.compare(password, admin.password);
    
    if (!isMatch) {
      return res.json({success: false, message: "Password is incorrect"});
    }

    // Check if email already exists
    const emailExists = await adminModel.findOne({email: newEmail, _id: {$ne: adminId}});
    if (emailExists) {
      return res.json({success: false, message: "Email already in use"});
    }

    // Update email
    admin.email = newEmail;
    await admin.save();

    // Generate new token with updated info
    const token = jwt.sign({id: admin._id, role: 'admin'}, process.env.JWT_SECRET);

    res.json({success: true, message: "Email updated successfully", token});

  } catch (error) {
    console.log(error);
    res.json({success: false, message: error.message});
  }
}

// Update admin name
const updateName = async (req, res) => {
  try {
    const {newName} = req.body;
    const adminId = req.adminId; // Get from req object, not req.body

    // Validate name
    if (!newName || newName.trim().length < 2) {
      return res.json({success: false, message: "Name must be at least 2 characters"});
    }

    // Get admin
    const admin = await adminModel.findById(adminId);
    
    if (!admin) {
      return res.json({success: false, message: "Admin not found"});
    }

    // Update name
    admin.name = newName.trim();
    await admin.save();

    res.json({success: true, message: "Name updated successfully", admin: {name: admin.name, email: admin.email}});

  } catch (error) {
    console.log(error);
    res.json({success: false, message: error.message});
  }
}

export {getAdminProfile, updatePassword, updateEmail, updateName};