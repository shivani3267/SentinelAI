import { GoogleGenAI } from "@google/genai";

console.log("Gemini Key:", process.env.GEMINI_API_KEY);
const genAI = new GoogleGenAI({apiKey:process.env.GEMINI_API_KEY});
export default genAI;