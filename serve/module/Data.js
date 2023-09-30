import { Schema, model } from "mongoose";

const Data = new Schema({
  rfid: { type: String, required: true },
  title: { type: String, required: true },
  imgurl: { type: String, required: false },
  videourl: { type: String, required: false },
},{
  timestamps: true,
});
// 定义一个虚拟属性来显示中国时间（北京时间，UTC+8）  
Data.virtual('createdAtChinaTime').get(function() {  
  return new Date(this.createdAt).toLocaleString("zh-CN", { timeZone: "Asia/Shanghai" });  
});  
Data.virtual('updatedAtChinaTime').get(function() {  
  return new Date(this.updatedAt).toLocaleString("zh-CN", { timeZone: "Asia/Shanghai" });  
});
// 将虚拟属性的值包含在返回的JSON数据中  
Data.set('toObject', { virtuals: true });  
Data.set('toJson', { virtuals: true });  
const data = model("Datas", Data);
export default data;

/**
 * ```{
 *      rfid：{
 *          2023.9.8：[
 *              {
 *                  title:"CAOZUO",
 *                  imgurl:"http://,
 *                  videourl:"http://      
 *              },       
 *          ]
 *      }
 *  }```
 */
