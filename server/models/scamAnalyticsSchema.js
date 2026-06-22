import mongoose from "mongoose";

const scamAnalyticsSchema = new mongoose.Schema(
  {
    isScam: {
      type: Boolean,
      required: true,
    },

    category: {
      type: String,
      enum: [
        "Digital Arrest Scam",
        "Banking Scam",
        "UPI Scam",
        "KYC Scam",
        "Investment Scam",
        "Job Scam",
        "Lottery Scam",
        "Phishing Scam",
        "Government Impersonation Scam",
        "Social Engineering Scam",
        "Cryptocurrency Scam",
        "Fake Customer Care Scam",
        "QR Code Scam",
        "Unknown",
      ],
      required: true,
    },

    riskScore: {
      type: Number,
      min: 0,
      max: 100,
      required: true,
    },

    confidence: {
      type: Number,
      min: 0,
      max: 100,
      required: true,
    },

    threatLevel: {
      type: String,
      enum: ["LOW", "MEDIUM", "HIGH", "CRITICAL"],
      required: true,
    },

    detectedLanguage: {
      type: String,
      required: true,
    },

    source: {
      type: String,
      enum: ["TEXT", "IMAGE"],
      required: true,
    },

    analysisDate: {
      type: String,
      default: () =>
        new Date().toISOString().split("T")[0],
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model(
  "ScamAnalytics",
  scamAnalyticsSchema
);