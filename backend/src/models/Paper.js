const mongoose = require("mongoose");

const paperSchema = new mongoose.Schema(
  {
    authorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    encryptedFile: {
      type: String,
      required: true
    },
    encryptedAESKey: {
      type: String,
      required: true
    },
    integrityHash: {
      type: String,
      required: true
    },
    status: {
      type: String,
      enum: ["submitted", "under_review", "accepted", "rejected"],
      default: "submitted"
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Paper", paperSchema);
