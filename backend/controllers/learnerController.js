import Learner from "../models/learnerModel.js";

// Create a new learner
export const createLearner = async (req, res) => {
  try {
    const learner = await Learner.create(req.body);
    res.status(201).json(learner);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get all learners
export const getAllLearners = async (req, res) => {
  try {
    const learners = await Learner.find();
    res.json(learners);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get learner by ID
export const getLearnerById = async (req, res) => {
  try {
    const learner = await Learner.findById(req.params.id);
    if (!learner) return res.status(404).json({ message: "Learner not found" });
    res.json(learner);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update learner
export const updateLearner = async (req, res) => {
  try {
    const learner = await Learner.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!learner) return res.status(404).json({ message: "Learner not found" });
    res.json(learner);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete learner
export const deleteLearner = async (req, res) => {
  try {
    const learner = await Learner.findByIdAndDelete(req.params.id);
    if (!learner) return res.status(404).json({ message: "Learner not found" });
    res.json({ message: "Learner deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
