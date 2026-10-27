const router = require("express").Router();
const auth = require("../middleware/auth");
const User = require("../models/User");

router.get("/", auth, async (req, res) => {
  const users = await User.find().sort({ totalScore: -1 }).limit(10).select("name totalScore");
  res.json(users);
});

module.exports = router;