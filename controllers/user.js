const User = require("../models/User");

const getAllUsers = async (req, res) => {
  const allDbUsers = await User.find({});
  return res.json(allDbUsers);
};

const getUserById = async (req, res) => {
  const userId = req.params.id;
  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    return res.json(user);
  } catch (err) {
    return res.status(500).json({ error: "Error finding user" });
  }
};

const createUser = async (req, res) => {
  const body = req.body;
  if (
    !body ||
    !body.userName ||
    !body.email ||
    !body.thoughts ||
    !body.friends
  ) {
    return res.status(400).json({ msg: "All fields are required.." });
  }

  try {
    const friendObjectIds = [];
    for (const friendId of body.friends) {
      const friendUser = await User.findById(friendId);
      console.log(friendUser);
      if (friendUser) {
        friendObjectIds.push(friendUser);
      }
    }

    const result = await User.create({
      userName: body.userName,
      email: body.email,
      thoughts: body.thoughts,
      friends: friendObjectIds || [],
    });

    res.status(200).json({ success: true, data: result });
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ success: false, error: "Failed to create user." });
  }
};

const updateUser = async (req, res) => {
  const userId = req.params.id;
  const body = req.body;

  if (
    !body ||
    !body.userName ||
    !body.email ||
    !body.thoughts ||
    !body.friends
  ) {
    return res.status(400).json({ msg: "All fields are required.." });
  }

  try {
    const updatedUser = await User.findByIdAndUpdate(userId, body, {
      new: true,
      runValidators: true,
    });

    if (!updatedUser) {
      return res.status(404).json({ error: "User not found" });
    }

    return res.json(updatedUser);
  } catch (err) {
    return res.status(500).json({ error: "Error updating user" });
  }
};

const deleteUser = async (req, res) => {
  const userId = req.params.id;
  try {
    const deletedUser = await User.findByIdAndDelete(userId);

    if (!deletedUser) {
      return res.status(404).json({ error: "User not found" });
    }

    return res.json({ message: "User deleted successfully" });
  } catch (err) {
    return res.status(500).json({ error: "Error deleting user" });
  }
};

module.exports = {
  getAllUsers,
  createUser,
  getUserById,
  updateUser,
  deleteUser,
};
