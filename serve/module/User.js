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
// 定义一个虚拟属性来显示中国时间（北京时间，UTC+8）  
User.virtual('createdAtChinaTime').get(function() {  
  return new Date(this.createdAt).toLocaleString("zh-CN", { timeZone: "Asia/Shanghai" });  
});  
User.virtual('updatedAtChinaTime').get(function() {  
  return new Date(this.updatedAt).toLocaleString("zh-CN", { timeZone: "Asia/Shanghai" });  
});

// 将虚拟属性的值包含在返回的JSON数据中  
User.set('toObject', { virtuals: true });  
User.set('toJson', { virtuals: true });  
const user = model("Users", User);
export default user;
