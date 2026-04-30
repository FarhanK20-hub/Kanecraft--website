import mongoose from "mongoose";

const AdminConfigSchema = new mongoose.Schema(
  {
    adminPassword: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.models.AdminConfig ||
  mongoose.model("AdminConfig", AdminConfigSchema);
