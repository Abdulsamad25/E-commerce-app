import userModel from "../models/userModel.js";
import adminModel from "../models/adminModel.js";
import validator from "validator";
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

const createToken = (id) => {
  return jwt.sign({id}, process.env.JWT_SECRET);
}

//Routes for User Login
const loginUser = async (req, res) => {
  try {
    const {email, password} = req.body;

    const user = await userModel.findOne({email});
    
    if (!user) {
      return res.json({success: false, message: "User does not exist"});
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (isMatch) {
      const token = createToken(user._id);
      return res.json({success: true, token});
    } else {
      return res.json({success: false, message: "Invalid credentials"});
    }

  } catch (error) {
    console.log(error);
    return res.json({success: false, message: error.message});
  }
}

//Routes for user registration
const registerUser = async (req, res) => {
  try {
    const {name, email, password} = req.body;
    
    //checking user already exists or not 
    const exists = await userModel.findOne({email});
    if (exists) {
      return res.json({success: false, message: "User already exists"});
    }

    //validating email format & strong password
    if (!validator.isEmail(email)) {
      return res.json({success: false, message: "Please enter a valid Email"});
    }
    if (password.length < 8) {
      return res.json({success: false, message: "Please enter a strong Password"});
    }

    //hashing user password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new userModel({
      name,
      email,
      password: hashedPassword
    });

    const user = await newUser.save();

    const token = createToken(user._id);

    res.json({success: true, token});

  } catch (error) {
    console.log(error);
    res.json({success: false, message: error.message});
  }
}

//Routes for admin Login
const adminLogin = async (req, res) => {
  try {
    const {email, password} = req.body;

    // Find admin by email
    const admin = await adminModel.findOne({email});
    
    if (!admin) {
      return res.json({success: false, message: "Admin does not exist"});
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, admin.password);

    if (isMatch) {
      const token = jwt.sign({id: admin._id, role: 'admin'}, process.env.JWT_SECRET);
      return res.json({success: true, token});
    } else {
      return res.json({success: false, message: "Invalid credentials"});
    }

  } catch (error) {
    console.log(error);
    return res.json({success: false, message: error.message});
  }
}

//Routes for admin Registration (Optional - for creating first admin or additional admins)
const registerAdmin = async (req, res) => {
  try {
    const {name, email, password, secretKey} = req.body;
    
    // Use a secret key to prevent unauthorized admin registration
    if (secretKey !== process.env.ADMIN_SECRET_KEY) {
      return res.json({success: false, message: "Unauthorized admin registration"});
    }

    // Check if admin already exists
    const exists = await adminModel.findOne({email});
    if (exists) {
      return res.json({success: false, message: "Admin already exists"});
    }

    // Validating email format & strong password
    if (!validator.isEmail(email)) {
      return res.json({success: false, message: "Please enter a valid Email"});
    }
    if (password.length < 8) {
      return res.json({success: false, message: "Please enter a strong Password (min 8 characters)"});
    }

    // Hashing admin password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newAdmin = new adminModel({
      name,
      email,
      password: hashedPassword,
      role: 'admin'
    });

    const admin = await newAdmin.save();

    const token = jwt.sign({id: admin._id, role: 'admin'}, process.env.JWT_SECRET);

    res.json({success: true, token, message: "Admin registered successfully"});

  } catch (error) {
    console.log(error);
    res.json({success: false, message: error.message});
  }
}

// Forgot Password - Generate reset token and send email
const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    // Validate email
    if (!validator.isEmail(email)) {
      return res.json({ success: false, message: "Please enter a valid email" });
    }

    // Find user
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.json({ success: false, message: "No account found with this email" });
    }

    // Generate reset token (valid for 1 hour)
    const resetToken = crypto.randomBytes(32).toString('hex');
    const resetTokenHash = crypto.createHash('sha256').update(resetToken).digest('hex');
    
    // Save hashed token and expiry to user
    user.resetPasswordToken = resetTokenHash;
    user.resetPasswordExpire = Date.now() + 60 * 60 * 1000; // 1 hour
    await user.save();

    // Create reset URL
    const resetUrl = `${process.env.FRONTEND_URL}/reset-password/${resetToken}`;

    // Send email using Resend
    try {
      await resend.emails.send({
        from: 'Abasi <noreply@shopabasi.com>', // Update with your verified domain
        to: email,
        subject: 'Password Reset Request - Abasi',
        html: `
          <!DOCTYPE html>
          <html>
            <head>
              <style>
                body {
                  font-family: Arial, sans-serif;
                  line-height: 1.6;
                  color: #333;
                }
                .container {
                  max-width: 600px;
                  margin: 0 auto;
                  padding: 20px;
                }
                .header {
                  background-color: #000;
                  color: #fff;
                  padding: 20px;
                  text-align: center;
                }
                .content {
                  padding: 20px;
                  background-color: #f9f9f9;
                }
                .button {
                  display: inline-block;
                  padding: 12px 30px;
                  background-color: #000;
                  color: #fff;
                  text-decoration: none;
                  border-radius: 5px;
                  margin: 20px 0;
                }
                .footer {
                  padding: 20px;
                  text-align: center;
                  font-size: 12px;
                  color: #666;
                }
              </style>
            </head>
            <body>
              <div class="container">
                <div class="header">
                  <h1>Password Reset Request</h1>
                </div>
                <div class="content">
                  <p>Hi ${user.name},</p>
                  <p>We received a request to reset your password for your Abasi account.</p>
                  <p>Click the button below to reset your password:</p>
                  <p style="text-align: center;">
                    <a href="${resetUrl}" class="button">Reset Password</a>
                  </p>
                  <p>Or copy and paste this link into your browser:</p>
                  <p style="word-break: break-all; color: #0066cc;">${resetUrl}</p>
                  <p><strong>This link will expire in 1 hour.</strong></p>
                  <p>If you didn't request a password reset, please ignore this email. Your password will remain unchanged.</p>
                  <p>Best regards,<br>The Abasi Team</p>
                </div>
                <div class="footer">
                  <p>This is an automated email. Please do not reply to this message.</p>
                  <p>&copy; ${new Date().getFullYear()} Abasi. All rights reserved.</p>
                </div>
              </div>
            </body>
          </html>
        `
      });

      res.json({
        success: true,
        message: "Password reset link has been sent to your email"
      });

    } catch (emailError) {
      console.error("Email sending error:", emailError);
      
      // If email fails, clear the reset token
      user.resetPasswordToken = undefined;
      user.resetPasswordExpire = undefined;
      await user.save();

      return res.json({
        success: false,
        message: "Failed to send email. Please try again later."
      });
    }

  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// Reset Password - Verify token and update password
const resetPassword = async (req, res) => {
  try {
    const { token } = req.params;
    const { password } = req.body;

    // Validate password
    if (password.length < 8) {
      return res.json({ success: false, message: "Password must be at least 8 characters" });
    }

    // Hash the token from URL
    const resetTokenHash = crypto.createHash('sha256').update(token).digest('hex');

    // Find user with valid token
    const user = await userModel.findOne({
      resetPasswordToken: resetTokenHash,
      resetPasswordExpire: { $gt: Date.now() }
    });

    if (!user) {
      return res.json({ success: false, message: "Invalid or expired reset token" });
    }

    // Hash new password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Update password and clear reset token
    user.password = hashedPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save();

    // Send confirmation email
    try {
      await resend.emails.send({
        from: 'Abasi <noreply@shopabasi.com>',
        to: user.email,
        subject: 'Password Reset Successful - Abasi',
        html: `
          <!DOCTYPE html>
          <html>
            <head>
              <style>
                body {
                  font-family: Arial, sans-serif;
                  line-height: 1.6;
                  color: #333;
                }
                .container {
                  max-width: 600px;
                  margin: 0 auto;
                  padding: 20px;
                }
                .header {
                  background-color: #000;
                  color: #fff;
                  padding: 20px;
                  text-align: center;
                }
                .content {
                  padding: 20px;
                  background-color: #f9f9f9;
                }
                .footer {
                  padding: 20px;
                  text-align: center;
                  font-size: 12px;
                  color: #666;
                }
              </style>
            </head>
            <body>
              <div class="container">
                <div class="header">
                  <h1>Password Reset Successful</h1>
                </div>
                <div class="content">
                  <p>Hi ${user.name},</p>
                  <p>Your password has been successfully reset.</p>
                  <p>You can now log in to your Abasi account using your new password.</p>
                  <p>If you did not make this change, please contact our support team immediately.</p>
                  <p>Best regards,<br>The Abasi Team</p>
                </div>
                <div class="footer">
                  <p>&copy; ${new Date().getFullYear()} Abasi. All rights reserved.</p>
                </div>
              </div>
            </body>
          </html>
        `
      });
    } catch (emailError) {
      console.error("Confirmation email error:", emailError);
      // Don't fail the password reset if confirmation email fails
    }

    res.json({ success: true, message: "Password reset successful! You can now login with your new password." });

  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

export {loginUser, registerUser, adminLogin, registerAdmin, forgotPassword, resetPassword};