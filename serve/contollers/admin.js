import admin from "../module/Admin.js";

/**
 * 创建用户
 * @param {*} body
 * @returns
 */
export async function addAdminUser(body) {
  return await admin.create(body);
}

/**
 * 修改密码
 */
export async function updatePassword(body) {
  let user = await getUserInfo(body.user);
  if(user.pass == body.pass){
    user.pass = body.newpass
    await user.save()
    return true
  }
  return false
}

/**
 * 查询用户信息
 */
export async function getUserInfo(username) {
  return await admin.findOne({ user: username });
}
/**
 * 修改是否启动密码校验
 */
export async function updateIsCheckPassword(body) {
  console.log(body)
  let user = await getUserInfo(body.user);
  user.state = body.state 
  await user.save()
  return user;
}
/**
 * 登录
 */
export async function login(body) {
    let user = await getUserInfo(body.user);
    if(user){
      console.log(user.pass)
      if(user.pass == body.pass){
          return user
      }else{
          return false
      }
    }else{
      return false
    }
    
}