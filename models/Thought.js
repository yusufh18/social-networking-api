const mongoose = require("mongoose");
const Reaction = require("./Reaction");

const thoughtSchema = new mongoose.Schema({
  thoughtText: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 280,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    get: formatDate,
  },
  userName: {
    type: String,
    required: true,
  },
  reactions: [Reaction],
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

// Getter method to format the timestamp on query
function formatDate(timestamp) {
  // Format the timestamp using a library like Moment.js or date-fns
  // Here, we're using date-fns to format the timestamp as a string
  const { format } = require("date-fns");
  return format(timestamp, "yyyy-MM-dd HH:mm:ss");
}

const Thought = mongoose.model("thought", thoughtSchema);

module.exports = Thought;
