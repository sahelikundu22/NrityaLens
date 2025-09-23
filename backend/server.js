import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import teacherRoutes from "./routes/teacherRoutes.js";
import learnerRoutes from "./routes/learnerRoutes.js";
dotenv.config();

const app = express();

// Middleware
app.use(cors());
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
// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
