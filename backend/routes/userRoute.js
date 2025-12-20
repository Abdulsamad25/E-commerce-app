import express from 'express';
import { loginUser, registerUser, adminLogin, registerAdmin, forgotPassword, resetPassword } from '../controllers/userController.js';

const userRouter = express.Router();

userRouter.post('/register', registerUser);
userRouter.post('/login', loginUser);
userRouter.post('/admin', adminLogin);
userRouter.post('/admin/register', registerAdmin);

// Password Reset Routes
userRouter.post('/forgot-password', forgotPassword);
userRouter.post('/reset-password/:token', resetPassword);

export default userRouter;