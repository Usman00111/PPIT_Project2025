require("dotenv").config();
const mongoose = require("mongoose");
const connectDB = require("../config/db");
const Product = require("../models/Product");

async function run() {
  await connectDB();

    const sample = [
    { name: "Apples 1kg", price: 2.0, imageUrl: "", stock: 14, description: "Fresh Irish apples." },
    { name: "Milk 2L", price: 2.1, imageUrl: "", stock: 20, description: "Semi-skimmed milk." }
  ];
    await Product.insertMany(sample);
  console.log("✅ Seeded products:", sample.length);


  await mongoose.connection.close();
  process.exit(0);
}
run().catch(e => { console.error(e); process.exit(1); });

