import { Schema, model } from "mongoose";

const User = new Schema(
  {
    rfid: { type: String, required: true },
    name: { type: String, required: false },
    remark: { type: String, required: false },
  },
  {
    timestamps: true
  }
);
const user = model("Users", User);
export default user;
