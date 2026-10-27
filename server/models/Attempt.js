const mongoose = require("mongoose");

const attemptSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    topic: String,
    level: String,
    score: Number,
    totalQuestions: Number,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Attempt", attemptSchema);