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
// 定义一个虚拟属性来显示中国时间（北京时间，UTC+8）  
Admin.virtual('createdAtChinaTime').get(function() {  
  return new Date(this.createdAt).toLocaleString("zh-CN", { timeZone: "Asia/Shanghai" });  
});  
Admin.virtual('updatedAtChinaTime').get(function() {  
  return new Date(this.updatedAt).toLocaleString("zh-CN", { timeZone: "Asia/Shanghai" });  
});
// 将虚拟属性的值包含在返回的JSON数据中  
Admin.set('toObject', { virtuals: true });  
Admin.set('toJson', { virtuals: true });  
const admin = model("Admins", Admin);
export default admin;
