import express from 'express';
import { getAdminProfile, updatePassword, updateEmail, updateName } from '../controllers/adminController.js';
import adminAuth from '../middleware/adminAuth.js';

const adminRouter = express.Router();

// All routes require admin authentication
adminRouter.post('/profile', adminAuth, getAdminProfile);
adminRouter.post('/update-password', adminAuth, updatePassword);
adminRouter.post('/update-email', adminAuth, updateEmail);
adminRouter.post('/update-name', adminAuth, updateName);

export default adminRouter;