import fs from "fs";
import path from "path";
const PATH = 'http://192.168.31.237:3000'

/**
 * 保存文件到本地
 * @param{string} path 保存路径
 * @param{File } file 保存的文件
 * @returns {string} 保存到本地的路径
 */
export function saveFile(path, file) {
  return new Promise((resolve, reject) => {
    // console.log(file)
    // 指定文件保存路径
    const filePath = path + file.originalFilename;

    //创建可读流和可写流;
    const reader = fs.createReadStream(file.filepath);
    const writer = fs.createWriteStream(filePath);

    reader.on("error", (error) => {
      console.error("可读流出错:", error);
      // 可读流出错，文件上传失败，可以进行相应的错误处理操作
    });

    // 监听可写流的 'error' 事件
    writer.on("error", (error) => {
      console.error("可写流出错:", error);
      // 可写流出错，文件上传失败，可以进行相应的错误处理操作
    });

    // 监听可写流的 'finish' 事件
    writer.on("finish", () => {
      console.log("文件上传成功");
      resolve({
        code: 200,
        msg: "文件上传成功",
        path: filePath,
      });
      // 文件上传成功后的操作
    });

    // 将上传的文件流写入到指定路径
    reader.pipe(writer);
  });
}

/**
 * 读取本地文件
 * @param{string} filePath
 *
 */
export async function readFile(ctx, filePath) {
  try {
    const data = fs.readFileSync(filePath);
    const ext = filePath.split(".").pop().toLowerCase();
    let contentType = "";

    // 根据文件扩展名设置相应的 MIME 类型
    if (ext === "png") {
      contentType = "image/png";
    } else if (ext === "jpg" || ext === "jpeg") {
      contentType = "image/jpeg";
    } else if (ext === "gif") {
      contentType = "image/gif";
    } else if (ext === "mp4") {
      contentType = "video/mp4";
    } else {
      contentType = "application/octet-stream";
    }

    ctx.type = contentType;
    ctx.status = 200;
    ctx.body = data;
  } catch (err) {
    console.error(err);
    ctx.status = 500; // 设置状态码为 500 表示服务器内部错误
    ctx.body = "Internal Server Error";
  }
}
