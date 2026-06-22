import "dotenv/config";
import connectDB from "./config/connectDB.js"
import express from "express";
import cors from "cors";
import dashboard from "./routes/dashboardroute.js";
import analyzeRoutes from "./routes/analyzeroute.js"

// dotenv.config();

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("SentinelAI backend is running");
});

app.use(
  cors({
    origin: [
      "http://localhost:5173",
    ],
    credentials: true,
  })
);

app.use("/api/dashboard",dashboard);
app.use("/api/analyze", analyzeRoutes);






const PORT = process.env.PORT || 3000;

const startServer = async () => {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.log("Failed to start server:", error.message);
    process.exit(1);
  }
};

startServer();