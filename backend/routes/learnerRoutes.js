import express from "express";
import {
  createLearner,
  getAllLearners,
  getLearnerById,
  updateLearner,
  deleteLearner
} from "../controllers/learnerController.js";

const router = express.Router();

router.post("/", createLearner);
router.get("/", getAllLearners);
router.get("/:id", getLearnerById);
router.put("/:id", updateLearner);
router.delete("/:id", deleteLearner);

export default router;
