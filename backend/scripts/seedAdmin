require("dotenv").config();
const mongoose = require("mongoose");
const connectDB = require("../config/db");
const User = require("../models/User");

function exitWithError(msg, code = 1) {
  console.error(msg);
  process.exit(code);
}

function getAdminEnv() {
  const { ADMIN_EMAIL, ADMIN_PASSWORD, ADMIN_NAME } = process.env;
  return { ADMIN_EMAIL, ADMIN_PASSWORD, ADMIN_NAME };
}

function validateAdminEnv(env) {
  if (!env.ADMIN_EMAIL || !env.ADMIN_PASSWORD || !env.ADMIN_NAME) {
    exitWithError("Missing ADMIN_* env vars");
  }
}

async function ensureAdmin({ ADMIN_EMAIL, ADMIN_PASSWORD, ADMIN_NAME }) {
  let user = await User.findOne({ email: ADMIN_EMAIL });

  if (!user) {
    user = await User.create({
      name: ADMIN_NAME,
      email: ADMIN_EMAIL,
      password: ADMIN_PASSWORD,
      role: "admin",
    });
    console.log(" Admin created:", user.email);
    return;
  }

  if (user.role !== "admin") {
    user.role = "admin";
  }
  if (ADMIN_PASSWORD) {
    user.password = ADMIN_PASSWORD;
  }
  await user.save();
  console.log(" Admin updated:", user.email);
}

async function run() {
  const env = getAdminEnv();
  validateAdminEnv(env);

  await connectDB();
  try {
    await ensureAdmin(env);
  } finally {
    await mongoose.connection.close(); 
  }
  process.exit(0);
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
