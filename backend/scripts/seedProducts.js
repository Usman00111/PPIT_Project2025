require("dotenv").config();
const mongoose = require("mongoose");
const connectDB = require("../config/db");
const Product = require("../models/Product");

async function run() {
  // connects to MongoDB
  await connectDB();

  // sample product list to preload into DB
  const sample = [
    { 
      name: "Apples 1kg", 
      price: 2.0, 
      imageUrl: "", 
      stock: 14, 
      description: "Fresh Irish apples." 
    },
    { 
      name: "Milk 2L", 
      price: 2.1, 
      imageUrl: "", 
      stock: 20, 
      description: "Semi-skimmed milk." 
    }
  ];

  // inserts sample products into collection
  await Product.insertMany(sample);
  console.log("Seeded products:", sample.length);

  // close DB connection and exit
  await mongoose.connection.close();
  process.exit(0);
}

// handles unexpected errors
run().catch(e => { 
  console.error(e); 
  process.exit(1); 
});
