const router = require("express").Router();
const User = require("../models/User");
const { signUser } = require("../utils/jwt");
const { requireAuth } = require("../middleware/auth");

// POST /api/auth/register
// Register a new user
router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body || {};

    // check required fields
    if (!name || !email || !password) {
      return res.status(400).json({ message: "Name, email and password are required." });
    }

    // prevent duplicate accounts
    const exists = await User.findOne({ email });
    if (exists) return res.status(400).json({ message: "Email already in use." });

    // create user - password hashed via pre-save hook
    const user = await User.create({ name, email, password });

    // generates JWT token for session
    const token = signUser(user);

    // returns safe user info + token
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
// Returns the current logged-in user's details (requires JWT)
router.get("/me", requireAuth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id); // req.user comes from JWT
    if (!user) return res.status(404).json({ message: "User not found." });

    // returns limited safe user info
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
