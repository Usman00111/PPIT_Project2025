const router = require("express").Router();
const Product = require("../models/Product");

// GET /api/products (public) — real DB query
router.get("/", async (_req, res) => {
  try {
    const list = await Product.find().sort({ createdAt: -1 });
    res.json(list);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});

// GET /api/products/:id (public) — placeholder
router.get("/:id", async (_req, res) => {
  try {
    // real implementation next
    res.status(501).json({ message: "Not implemented" });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});

module.exports = router;
