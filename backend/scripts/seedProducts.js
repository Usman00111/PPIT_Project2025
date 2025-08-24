require("dotenv").config();
const mongoose = require("mongoose");
const connectDB = require("../config/db");
const Product = require("../models/Product");

async function run() {
  await connectDB();
  // seeding will go here
  await mongoose.connection.close();
  process.exit(0);
}
