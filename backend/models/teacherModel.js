import mongoose from "mongoose";

const teacherSchema = new mongoose.Schema({
  clerkId: { type: String, required: true, unique: true }, // Clerk user ID
  name: { type: String },
  email: { type: String },
  phone: { type: String },
  address: { type: String },
  city: { type: String },
  country: { type: String },
  //core teaching info
  subjects: [{ type: String }] ,       // subjects they teach
  bio: { type: String },              // short description about teacher
  profilePicture: { type: String },
  // Availability / schedule
  availableDays: [{ type: String }],  // e.g., ["Monday", "Wednesday"]
  availableTimeSlots: [{               // optional detailed schedule
    start: String,
    end: String
  }],
  // Stats / achievements
  experience: { type: Number },       // years of teaching
  ratings: { type: Number, default: 0 },
  totalReviews: { type: Number, default: 0 },

}, { timestamps: true });

const Teacher = mongoose.model("Teacher", teacherSchema);

export default Teacher;
