import user from "../module/User.js";

/**
 * 获取所有用户
 */
export async function getAllUser() {
  return await user.find();
}

/**
 * 新增用户
 */
export async function addUser(item) {
  // console.log(user);
  await user.findOne({ rfid: item.rfid });
  return await user.create(item);
}
/**
 * 查询是不是在数据库
 */
export async function isUser(rfid) {
  return await user.findOne({ rfid: rfid });
}

/**
 * 查询某位用户
 */
export async function getIdUser(id) {
  console.log("id", id);
  let date = await user.findOne({ rfid: id });
  if(date) {
    date = Object.assign({},date._doc, {
        createdAtChina: date.createdAtChinaTime,
        updatedAtChina: date.updatedAtChinaTime,
      });
  }

  console.log("date", date);

  return date;
}

/**
 * 将用户的rfid 字段更新
 *
 */
export async function updateUser(id, rfid) {
  try {
    let date = await getIdUser(id);
    date.rfid = rfid;
    await date.save();
    return true;
  } catch (error) {
    return false;
  }
}
/**
 * 清除某用户
 */
export async function deleteUser(id) {
  try {
    let date = await getIdUser(id);
    let _id = date._id;
    await date.deleteOne();
    return _id.toString();
  } catch (error) {
    return false;
  }
}
