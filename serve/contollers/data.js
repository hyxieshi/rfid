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
  return await data.findOne({ rfid: id });
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
