import express from "express";
import { analyzeText } from "../controllers/analyzecontroller.js";

const router = express.Router();

router.post("/", analyzeText);

export default router;