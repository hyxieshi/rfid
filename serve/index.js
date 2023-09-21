import Koa from "koa";
import { koaBody } from "koa-body";
import Router from "koa-router";
import cors from "koa2-cors";
import mongoose from "./db.js";
import { getAllData, getDataById, postOneData } from "./contollers/data.js";
import { saveFile, readFile } from "./util/File.js";
import fs from "fs";

const PATH = "C:/Users/303/Desktop/rfid/serve/data/";

const app = new Koa();

app.use(cors());
app.use(koaBody({ multipart: true }));

// -----------------------------------------------------------------路由-------------------------------------------
const route = new Router({
  //prefix: "/api", //配置统一前缀
});
/**
 * 获取所有数据
 */
route.get("/", async (ctx) => {
  ctx.body = await getAllData();
});
/**
 * 根据插入一条数据
 */
route.post("/postData", async (ctx) => {
  const { rfid, title, imgurl, videourl } = ctx.request.body;
  ctx.body = await postOneData({ rfid, title, imgurl, videourl });
  ctx.status = 200;
});
/**
 * 根据id 获取数据
 */
route.get("/id", async (ctx) => {
  ctx.status = 200;
  ctx.body = await getDataById(ctx.query.id);
});
/**
 * 提交文件获取保存的路径
 */
route.post("/upload", async (ctx) => {
  ctx.body = await saveFile(PATH, ctx.request.files.file);
});
/**获取想要的媒体资源 */
route.get("/file", async (ctx) => {
  await readFile(ctx, ctx.query.id);
});

app.use(route.routes());
app.use(route.allowedMethods());

// ------------------------------------------------------------本地数据存储-----------------------------

/**
 * 返回写入路径
 */
const getPath = (id) => {
  return new Promise((resolve, reject) => {
    const day = new Date();
    const year = day.getFullYear();
    const month =
      day.getMonth() + 1 < 10 ? "0" + (day.getMonth() + 1) : day.getMonth() + 1;
    const date = day.getDate() < 10 ? "0" + day.getDate() : day.getDate();
    const time = year + "-" + month + "-" + date;

    /**
     * 获取id层文件夹名
     */
    const getIdPath = () => {
      return fs
        .readdirSync(PATH, { withFileTypes: true })
        .filter((item) => item.isDirectory())
        .map((item) => item.name);
    };
    /**
     * 获取日期层文件夹名
     */
    const getDatePath = () => {
      return fs
        .readdirSync(PATH + `/${id}`, { withFileTypes: true })
        .filter((item) => item.isDirectory())
        .map((item) => item.name);
    };
    try {
      if (getIdPath().includes(id)) {
        if (getDatePath().includes(time)) {
          resolve(PATH + `/${id}/${time}`);
        } else {
          fs.mkdirSync(PATH + `/${id}/${time}`, { recursive: true });
          resolve(PATH + `/${id}/${time}`);
        }
      } else {
        fs.mkdirSync(PATH + `/${id}`, { recursive: true });
        fs.mkdirSync(PATH + `/${id}/${time}`, { recursive: true });
        resolve(PATH + `/${id}/${time}`);
      }
    } catch (error) {
      reject(error);
    }
  });
};

app.listen(3000, () => {
  console.log(3000);
});
