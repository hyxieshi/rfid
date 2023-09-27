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
    await user.findOne({rfid: item.rfid})
    return await user.create(item);
}
/**
 * 查询是不是在数据库
 */
export async function isUser(rfid){
    return await user.findOne({'rfid':rfid});
}


/**
 * 查询某位用户
 */
export async function getIdUser(id) {
    return await user.find({'rfid':id});
}