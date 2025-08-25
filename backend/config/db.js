const mongoose = require("mongoose");

// function to connect to MongoDB using mongoose
async function connectDB() {
  const uri = process.env.MONGO_URI; // get database URI from environment variables
  if (!uri) throw new Error("MONGO_URI missing"); // safetye check

  // connect to MongoDB with mongoose
  await mongoose.connect(uri);

  console.log("MongoDB connected"); // confirnm successful connection
}

//  export the function so it can be used in server.js
module.exports = connectDB;
