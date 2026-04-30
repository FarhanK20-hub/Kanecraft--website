import mongoose, { Schema, Document } from "mongoose";

export interface IProduct extends Document {
  title: string;
  description: string;
  price?: number;
  category: string;
  image?: string;
  esgStats: string[];
  createdAt: Date;
  updatedAt: Date;
}

const ProductSchema: Schema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number },
    category: { type: String, required: true, default: "Stationery" },
    image: { type: String },
    esgStats: [{ type: String }],
  },
  {
    timestamps: true,
  }
);

// Prevent mongoose from compiling the model multiple times in Next.js development
export default mongoose.models.Product || mongoose.model<IProduct>("Product", ProductSchema);
