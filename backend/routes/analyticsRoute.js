import express from 'express';
import { trackVisitor, getAnalytics, getActiveUsers } from '../controllers/analyticsController.js';
import adminAuth from '../middleware/adminAuth.js';

const analyticsRouter = express.Router();

// Public route - track visitors (no auth needed)
analyticsRouter.post('/track', trackVisitor);

// Protected routes - only admin can view analytics
analyticsRouter.get('/stats', adminAuth, getAnalytics);
analyticsRouter.get('/active', adminAuth, getActiveUsers);

export default analyticsRouter;