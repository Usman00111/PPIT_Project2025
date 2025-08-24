const router = require("express").Router();
const User = require("../models/User");
const { signUser } = require("../utils/jwt");
const { requireAuth } = require("../middleware/auth");

// POST /api/auth/register
router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body || {};
    if (!name || !email || !password) {
      return res.status(400).json({ message: "Name, email and password are required." });
    }

    // Basic duplicate check
    const exists = await User.findOne({ email });
    if (exists) return res.status(400).json({ message: "Email already in use." });

    // Create user (password hashed via pre-save) and sign JWT
    const user = await User.create({ name, email, password });
    const token = signUser(user);

    return res.json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        accountNumber: user.accountNumber
      }
    });
  } catch (e) {
    return res.status(500).json({ message: e.message });
  }
});

// GET /api/auth/me
router.get("/me", requireAuth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: "User not found." });
    return res.json({
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      accountNumber: user.accountNumber
    });
  } catch (e) {
    return res.status(500).json({ message: e.message });
  }
});

module.exports = router;
