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
export async function addUser(user) {
    return await user.create(user);
}


/**
 * 查询某位用户
 */
export async function getIdUser(id) {
    return await user.find({'rfid':id});
}