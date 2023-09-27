import { Schema, model } from "mongoose";

const Admin = new Schema(
  {
    user: { type: String, required: true },
    pass: { type: String, required: true },
    state: { type: Boolean, required: false, default: true },
  },
  {
    timestamps: true,
  }
);
const admin = model("Admins", Admin);
export default admin;
