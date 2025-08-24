const router = require("express").Router();
const Product = require("../models/Product");

// GET /api/products (public) — placeholder first
router.get("/", async (_req, res) => {
  try {
    // will query DB in next step
    res.json([]);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});

module.exports = router;
