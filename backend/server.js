import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import teacherRoutes from "./routes/teacherRoutes.js";
import learnerRoutes from "./routes/learnerRoutes.js";
import authRoutes from "./routes/authRoutes.js";
dotenv.config();

const app = express();

// Middleware
app.use(cors({
  origin: ['http://localhost:3000', 'http://127.0.0.1:3000'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'clerk-session']
}));
app.use(express.json());

// DB Connection
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// Example route
app.get("/", (req, res) => {
  res.send("Backend is running 🚀");
});
// Routes
app.use("/api/teachers", teacherRoutes);
app.use("/api/learners", learnerRoutes);
app.use("/api/auth", authRoutes);
// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
