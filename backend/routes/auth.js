const router = require("express").Router();
const User = require("../models/User");
const { signUser } = require("../utils/jwt");

// POST /api/auth/register
router.post("/register", async (req, res) => {
  try {
    // implementation next
    return res.json({ ok: true });
  } catch (e) {
    return res.status(500).json({ message: e.message });
  }
});



module.exports = router;