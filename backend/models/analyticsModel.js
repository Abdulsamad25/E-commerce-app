import mongoose from "mongoose";

const analyticsSchema = new mongoose.Schema(
  {
    ipAddress: { type: String, required: true },
    userAgent: { type: String },
    page: { type: String, required: true },
    sessionId: { type: String, required: true },
    timestamp: { type: Date, default: Date.now },
    country: { type: String },
    city: { type: String },
  },
  { timestamps: true }
);

// Index for faster queries
analyticsSchema.index({ timestamp: -1 });
analyticsSchema.index({ sessionId: 1 });
analyticsSchema.index({ ipAddress: 1 });

const analyticsModel = mongoose.models.analytics || mongoose.model('analytics', analyticsSchema);

export default analyticsModel;