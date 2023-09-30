import data from "../module/Data.js";

// ------------------------------操作------------------------------

/**
 * 查询所有数据
 */
export async function getAllData() {
  return await data.find();
}

/**
 * 根据rfid查数据
 */
export async function getDataById(id) {
  let date = await data.find({ rfid: id }).sort({ createdAt: -1 });
  console.log(date.length)
  if(date.length >0){
    let r = date.map((item=>{
      return Object.assign({},item._doc, {
        createdAtChina: item.createdAtChinaTime,
        updatedAtChina: item.updatedAtChinaTime,
      });
    }))
    console.log(r)
  return r

  }
  
  return date
}

/**
 * 根据id提交数据
 */
export async function postOneData(item) {
  return await data.create({
    rfid: item.rfid,
    title: item.title,
    imgurl: item.imgurl,
    videourl: item.videourl
  });
}
/**
 * 清除rfid是id 的所有记录
 */
export async function deleteDataById(id) {
  return await data.deleteMany({ rfid: id });
}
