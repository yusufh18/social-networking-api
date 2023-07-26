const Thought = require("../models/Thought");

const addReactions = async (req, res) => {
  const thoughtId = req.params.thoughtId;
  const { reactionBody, username } = req.body;

  try {
    const thought = await Thought.findById(thoughtId);
    if (!thought) {
      return res.status(404).json({ error: "Thought not found" });
    }

    const newReaction = {
      reactionBody,
      username,
      createdAt: new Date(),
    };

    // Add the reaction to the reactions array
    thought.reactions.push(newReaction);

    // Save the updated thought with the new reaction added
    await thought.save();

    // Return the updated thought object as the response
    return res.json(thought);
  } catch (err) {
    return res.status(500).json({ error: "Server error" });
  }
};

const deleteReactions = async (req, res) => {
  const thoughtId = req.params.thoughtId;
  const reactionIdToDelete = req.params.deleteReaction; // Assuming you pass the reactionId to delete as a URL parameter
  console.log(thoughtId)

  try {
    const thought = await Thought.findById(thoughtId);
    if (!thought) {
      return res.status(404).json({ error: "Thought not found" });
    }

    // Find the index of the reaction to delete in the reactions array
    const reactionIndex = thought.reactions.findIndex(
      (reaction) => reaction._id.toString() === reactionIdToDelete
    );

    // If the reaction is not found, return a 404 response
    if (reactionIndex === -1) {
      return res
        .status(404)
        .json({ error: "Reaction not found in the thought" });
    }

    // Remove the reaction from the reactions array
    thought.reactions.splice(reactionIndex, 1);

    // Save the updated thought with the reaction removed
    await thought.save();

    // Return the updated thought object as the response
    return res.json(thought);
  } catch (err) {
    return res.status(500).json({ error: "Server error" });
  }
};

module.exports = {
  addReactions,
  deleteReactions,
};
