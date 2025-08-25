require("dotenv").config();
const mongoose = require("mongoose");
const connectDB = require("../config/db");
const User = require("../models/User");

// helper: exit the script with an error
function exitWithError(msg, code = 1) {
  console.error(msg);
  process.exit(code);
}

// load admin credentials from .env
function getAdminEnv() {
  const { ADMIN_EMAIL, ADMIN_PASSWORD, ADMIN_NAME } = process.env;
  return { ADMIN_EMAIL, ADMIN_PASSWORD, ADMIN_NAME };
}

//ensure required variables exist
function validateAdminEnv(env) {
  if (!env.ADMIN_EMAIL || !env.ADMIN_PASSWORD || !env.ADMIN_NAME) {
    exitWithError("Missing ADMIN_* env vars");
  }
}

//create or update admin user
async function ensureAdmin({ ADMIN_EMAIL, ADMIN_PASSWORD, ADMIN_NAME }) {
  let user = await User.findOne({ email: ADMIN_EMAIL });

  // if no user - create admin
  if (!user) {
    user = await User.create({
      name: ADMIN_NAME,
      email: ADMIN_EMAIL,
      password: ADMIN_PASSWORD, // hashed automatically by User model
      role: "admin",
    });
    console.log(" Admin created:", user.email);
    return;
  }

  // if user exists - ensure role is admin and update password if given
  if (user.role !== "admin") {
    user.role = "admin";
  }
  if (ADMIN_PASSWORD) {
    user.password = ADMIN_PASSWORD;
  }
  await user.save();
  console.log(" Admin updated:", user.email);
}

// main runner
async function run() {
  const env = getAdminEnv(); // load env vars
  validateAdminEnv(env);  // check required values

  await connectDB();  // connect to MongoDB
  try {
    await ensureAdmin(env);  // ensure admin account exists
  } finally {
    await mongoose.connection.close(); // always close DB connection
  }
  process.exit(0); // exit script
}

// catches unexpected errors
run().catch((err) => {
  console.error(err);
  process.exit(1);
});
