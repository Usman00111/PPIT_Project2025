const router = require("express").Router();
const User = require("../models/User");
const { signUser } = require("../utils/jwt");

// POST /api/auth/register
router.post("/register", async (req, res) => {
    try {
        const { name, email, password } = req.body || {};
        if (!name || !email || !password) {
            return res.status(400).json({ message: "Name, email and password are required." });
        }
        return res.json({ ok: true });
    } catch (e) {
        return res.status(500).json({ message: e.message });
    }
    const exists = await User.findOne({ email });
    if (exists) return res.status(400).json({ message: "Email already in use." });

    const user = await User.create({ name, email, password }); // hashed in model pre-save
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



module.exports = router;