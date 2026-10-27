const router = require("express").Router();
const auth = require("../middleware/auth");
const Question = require("../models/Question");
const Attempt = require("../models/Attempt");
const User = require("../models/User");

router.post("/", auth, async (req, res) => {
  try {
    const { topic, level, answers } = req.body;
    let score = 0;
    const details = [];

    for (const a of answers) {
      const q = await Question.findById(a.question);
      const isCorrect = q.correctIndex === a.selected;
      if (isCorrect) score++;
      details.push({
        questionText: q.questionText,
        options: q.options,
        selected: a.selected,
        correctIndex: q.correctIndex,
        isCorrect,
        explanation: q.explanation,
      });
    }

    await Attempt.create({
      user: req.user.id, topic, level, score, totalQuestions: answers.length,
    });
    await User.findByIdAndUpdate(req.user.id, { $inc: { totalScore: score } });

    res.json({ score, total: answers.length, details });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get("/my", auth, async (req, res) => {
  const attempts = await Attempt.find({ user: req.user.id }).sort({ createdAt: -1 });
  res.json(attempts);
});

module.exports = router;