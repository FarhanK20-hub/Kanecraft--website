import mongoose from "mongoose";

const SampleRequestSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    company: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      default: "Pending", // Options: Pending, Contacted, Sent
    },
  },
  { timestamps: true }
);

export default mongoose.models.SampleRequest ||
  mongoose.model("SampleRequest", SampleRequestSchema);
