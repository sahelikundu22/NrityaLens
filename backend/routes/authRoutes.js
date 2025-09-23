import express from "express";
import { authenticateRequest } from "../middleware/auth.js";
import Learner from "../models/learnerModel.js";
import Teacher from "../models/teacherModel.js";
import { createClerkClient } from "@clerk/backend";

const router = express.Router();
const clerkClient = createClerkClient({ secretKey: process.env.CLERK_SECRET_KEY });

// Return the authenticated user and role
router.get("/me", authenticateRequest, async (req, res) => {
  return res.json({ user: req.user });
});

// Sync the Clerk user into our DB as learner/teacher based on role
router.post("/sync", authenticateRequest, async (req, res) => {
  try {
    const { clerkId, email, name, role } = req.user;
    if (role === "teacher") {
      let teacher = await Teacher.findOne({ clerkId });
      if (!teacher) {
        teacher = await Teacher.create({ clerkId, email, name });
      }
      return res.json({ status: "ok", role, profileId: teacher._id });
    }

    // default to learner
    let learner = await Learner.findOne({ clerkId });
    if (!learner) {
      learner = await Learner.create({ clerkId, email, name });
    }
    return res.json({ status: "ok", role: "learner", profileId: learner._id });
  } catch (err) {
    console.error("/api/auth/sync error", err);
    return res.status(500).json({ error: "Failed to sync user" });
  }
});

// Upsert profile and set role. Body: { role: 'learner'|'teacher', ...fields }
router.post("/profile", authenticateRequest, async (req, res) => {
  try {
    const { clerkId } = req.user;
    const { role, ...profile } = req.body || {};
    if (!role || (role !== "learner" && role !== "teacher")) {
      return res.status(400).json({ error: "Invalid role" });
    }

    // Persist role in Clerk public metadata
    await clerkClient.users.updateUser(clerkId, { publicMetadata: { role } });

    if (role === "teacher") {
      const updated = await Teacher.findOneAndUpdate(
        { clerkId },
        { clerkId, email: req.user.email, name: req.user.name, ...profile },
        { new: true, upsert: true }
      );
      return res.json({ status: "ok", role, profileId: updated._id });
    } else {
      const updated = await Learner.findOneAndUpdate(
        { clerkId },
        { clerkId, email: req.user.email, name: req.user.name, ...profile },
        { new: true, upsert: true }
      );
      return res.json({ status: "ok", role: "learner", profileId: updated._id });
    }
  } catch (err) {
    console.error("/api/auth/profile error", err);
    return res.status(500).json({ error: "Failed to save profile" });
  }
});

export default router;



