const router = require("express").Router();
const auth = require("../middleware/auth");
const Question = require("../models/Question");

router.get("/", auth, async (req, res) => {
  const { topic, level } = req.query;
  const filter = {};
  if (topic) filter.topic = topic;
  if (level) filter.level = level;

  const questions = await Question.find(filter).select("-correctIndex -explanation");
  res.json(questions);
});

module.exports = router;