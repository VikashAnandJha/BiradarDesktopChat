const express = require("express");
const User = require("../schema/userSchema");
const router = express.Router();

// Existing routes...

// Search route
router.get("/user", async (req, res) => {
  const { email } = req.query;

  if (!email) {
    return res.status(400).json({ message: "Please provide an email address" });
  }

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({ user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
