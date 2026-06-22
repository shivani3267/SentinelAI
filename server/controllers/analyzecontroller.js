import scamAnalyticsSchema from "../models/scamAnalyticsSchema.js";
import { fraudIntelligencePrompt } from "../utils/promptTemplates.js";
import genAI from "../config/gemini.js"

export const analyzeText = async (req, res) => {
  try {
    const { message } = req.body;

    if (!message?.trim()) {
      return res.status(400).json({
        success: false,
        message: "Message is required",
      });
    }
 

    const prompt = fraudIntelligencePrompt({
      source: "TEXT",
      content: message,
    });

    const result = await genAI.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt, 
    });

    let responseText = result.text;

    
    responseText = responseText
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    const analysis = JSON.parse(responseText);

    // Non-fraud related query
    if (!analysis.success) {
      return res.status(400).json(analysis);
    }

    // Save only analytics data
    await scamAnalyticsSchema.create({
      isScam: analysis.isScam,
      category: analysis.category,
      riskScore: analysis.riskScore,
      confidence: analysis.confidence,
      threatLevel: analysis.threatLevel,
      detectedLanguage: analysis.detectedLanguage,
      source: "TEXT",
    });

    return res.status(200).json(analysis);

  } catch (error) {
    console.error("Analyze Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to analyze message",
    });
  }
};