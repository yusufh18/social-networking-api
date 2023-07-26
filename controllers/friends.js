const User = require("../models/User");

const addFriendsLists = async (req, res) => {
  const userId = req.params.userId;
  const friendId = req.params.friendId;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    if (user.friends.includes(friendId)) {
      return res.status(400).json({ error: "Friend already added" });
    }

    user.friends.push(friendId);

    await user.save();

    return res.json(user);
  } catch (err) {
    return res.status(500).json({ error: "Server error" });
  }
};

const deleteFriendsList = async (req, res) => {
  const userId = req.params.userId;
  const friendIdToDelete = req.params.friendId;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const friendIndex = user.friends.indexOf(friendIdToDelete);
    if (friendIndex === -1) {
      return res
        .status(404)
        .json({ error: "Friend not found in the user's list" });
    }

    user.friends.splice(friendIndex, 1);

    await user.save();

    return res.json(user);
  } catch (err) {
    return res.status(500).json({ error: "Server error" });
  }
};

module.exports = {
  addFriendsLists,
  deleteFriendsList,
};
