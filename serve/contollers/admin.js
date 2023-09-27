import admin from "../module/Admin.js";

/**
 * 创建用户
 * @param {*} body
 * @returns
 */
export async function addUser(body) {
  return await admin.create(body);
}

/**
 * 修改密码
 */
export async function updatePassword(body) {
  let user = await getUserInfo(body.user);
  user.pass == body.pass && (user.pass = body.newpass) && (await user.save());
  return user;
}

/**
 * 查询用户信息
 */
export async function getUserInfo(username) {
  return await admin.find({ user: username });
}
/**
 * 修改是否启动密码校验
 */
export async function updateIsCheckPassword(body) {
  let user = await getUserInfo(body.user);
  user.state = body.state && (await user.save());
  return user;
}
/**
 * 登录
 */
export async function login(body) {
    let user = await getUserInfo(body.user);
    if(user.pass == body.pass){
        return true
    }else{
        return false
    }
}