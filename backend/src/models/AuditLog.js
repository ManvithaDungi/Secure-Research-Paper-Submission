const mongoose = require("mongoose");

const auditLogSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },
    action: {
      type: String,
      required: true
    }
  },
  {
    timestamps: true // adds timestamp automatically
  }
);

module.exports = mongoose.model("AuditLog", auditLogSchema);
