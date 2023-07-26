const Thought = require("../models/Thought");
const User = require("../models/User");

const createThought = async (req, res) => {
  const body = req.body;
  if (!body || !body.thoughtText || !body.username || !body.userId) {
    return res.status(400).json({ msg: "All fields are required." });
  }

  try {
    const user = await User.findOne({ _id: body.userId });

    if (!user) {
      return res.status(404).json({ success: false, error: "User not found." });
    }

    const result = await Thought.create({
      thoughtText: body.thoughtText,
      userName: body.username,
      reactions: body.reactions,
      userId: user._id, 
    });

    res.status(200).json({ success: true, data: result });
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ success: false, error: "Failed to create user." });
  }
};

const getAllThoughts = async (req, res) => {
  const allDbThoughts = await Thought.find({});
  return res.json(allDbThoughts);
};

const getThoughtsById = async (req, res) => {
  const userId = req.params.id;
  try {
    const user = await Thought.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "Thought not found" });
    }
    return res.json(user);
  } catch (err) {
    return res.status(500).json({ error: "Error finding thought" });
  }
};

const updateThoughts = async (req, res) => {
  const userId = req.params.id;
  const body = req.body;

  if (!body || !body.thoughtText || !body.username) {
    return res.status(400).json({ msg: "All fields are required.." });
  }

  try {
    const updateThought = await Thought.findByIdAndUpdate(userId, body, {
      new: true,
      runValidators: true,
    });

    if (!updateThought) {
      return res.status(404).json({ error: "User not found" });
    }

    return res.json(updateThought);
  } catch (err) {
    return res.status(500).json({ error: "Error updating user" });
  }
};

const deleteThought = async (req, res) => {
  const thoughtId = req.params.id;
  try {
    const deleteThought = await Thought.findByIdAndDelete(thoughtId);

    if (!deleteThought) {
      return res.status(404).json({ error: "Thought not found" });
    }

    return res.json({ message: "Thought deleted successfully" });
  } catch (err) {
    return res.status(500).json({ error: "Error deleting user" });
  }
};

module.exports = {
  createThought,
  getAllThoughts,
  getThoughtsById,
  updateThoughts,
  deleteThought
};
