import { Schema, model } from "mongoose";

const Data = new Schema({
  rfid: { type: String, required: true },
  title: { type: String, required: true },
  imgurl: { type: String, required: false },
  videourl: { type: String, required: false },
},{
  timestamps: true
});
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
