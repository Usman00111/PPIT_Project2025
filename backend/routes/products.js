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

// GET /api/products/:id (public)
router.get("/:id", async (req, res) => {
  try {
    const p = await Product.findById(req.params.id);
    if (!p) return res.status(404).json({ message: "Product not found" });
    res.json(p);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});

module.exports = router;
