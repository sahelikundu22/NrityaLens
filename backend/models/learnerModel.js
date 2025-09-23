import mongoose from "mongoose";

const learnerSchema = new mongoose.Schema({
  clerkId: { type: String, required: true, unique: true }, // Clerk user ID
  name: { type: String },
  email: { type: String }, // optional, Clerk can provide
  enrolledCourses: [{ type: String }] // app-specific data
}, { timestamps: true });

const Learner = mongoose.model("Learner", learnerSchema);

export default Learner;
