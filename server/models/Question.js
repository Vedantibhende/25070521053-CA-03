const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema({
  topic: String,
  level: String,
  questionText: String,
  options: [String],
  correctIndex: Number,
  explanation: String,
});

module.exports = mongoose.model("Question", questionSchema);