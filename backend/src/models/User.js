const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    passwordHash: {
      type: String,
      required: true
    },
    role: {
      type: String,
      enum: ["author", "reviewer", "editor", "admin"],
      required: true
    },
    mfaEnabled: {
      type: Boolean,
      default: false
    }
  },
  { timestamps: true } // adds createdAt & updatedAt
);

module.exports = mongoose.model("User", userSchema);
