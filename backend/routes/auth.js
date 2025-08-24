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
});



module.exports = router;