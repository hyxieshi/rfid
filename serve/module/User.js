import { Schema, model } from "mongoose";

const User = new Schema(
  {
    rfid: { type: String, required: true },
    name: { type: String, required: true },
    remark: { type: String, required: false },
  },
  {
    timeseries: true,
  }
);
const user = model("Users", User);
export default user;
