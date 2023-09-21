import mongoose from "mongoose";

mongoose.connect("mongodb://127.0.0.1:27017/rfid", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.once("open", () => {
  console.log("连接成功");
});

mongoose.connection.once("error", () => {
  console.log("连接失败");
});

export default mongoose;
