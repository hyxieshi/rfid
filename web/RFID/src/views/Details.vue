<template>
  <div class="body">
    <nav>
      <h3>ID:{{ idinfo.userinfo.rfid }}</h3>
      <h3>名字：{{ idinfo.userinfo.name }}</h3>
      <h3>备注：{{ idinfo.userinfo.remark }}</h3>
      <h3>创建时间：{{ idinfo.userinfo.createdAtChina }}</h3>
      <div v-show="showId">新Id：<input type="text" v-model="newID" /></div>
      <button style="margin-top: 20px" @click="postID">补卡</button>
    </nav>
    <div class="msg">
      <div
        v-for="item in idinfo.history"
        :key="item._id"
        style="border-bottom: 1px solid #c6c6c6; margin-bottom: 10px"
      >
        <h3
          style="
            width: 100%;
            display: flex;
            flex-direction: column;
            align-content: flex-start;
            flex-wrap: wrap;
          "
        >
          <span>记录时间：{{ item.createdAtChina }}</span
          >备注信息：{{ item.title }}<span></span>
        </h3>
        <img :src="getmedia(item.imgurl)" alt="" />
        <!-- <video   controls :src="getmedia(r)" v-for="r in item.videourl" :key="r" ></video> -->
      </div>
    </div>
  </div>
</template>
<style scoped>
.body {
  width: 100vw;
  height: 100vh;
  display: flex;
  /* flex-direction: column; */
  justify-content: space-around;
  align-content: center;
  overflow: scroll;
}
nav {
  width: 30%;
  padding-top: 60px;
}
.msg {
  padding-top: 60px;
  flex: 1;
}
img {
  width: 140px;
  height: auto;
}
video {
  /* width: 260px; */
  /* height: auto; */
}
</style>
<script setup>
import { reactive, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useAlertsStore } from "@/store.js";
const router = useRouter();
const route = useRoute();
const id = ref(route.params.id);
const store = useAlertsStore();
const idinfo = reactive({
  userinfo: {},
  history: [],
});
// 获取id详情
const getid = () => {
  fetch("/api/getUser?id=" + id.value)
    .then((res) => res.json())
    .then((data) => {
      idinfo.userinfo = data;
      gethistory(data._id).then((res) => {
        idinfo.history = res;
      });
    });
};
//获取id历史记录
const gethistory = (id) => {
  return new Promise((res, rej) => {
    fetch("/api/id?id=" + id)
      .then((res) => res.json())
      .then((data) => {
        res(data);
      });
  });
};
//获取本地媒体资源
const getmedia = (url) => {
  //   console.log(url);
  if (url) {
    return store.Url + "/file?id=" + url;
  }
  return "";
};
const newID = ref("");
const showId = ref(false);
const postID = () => {
  if (showId.value) {
    fetch(`/api/updateIdUser?id=${id.value}&rfid=${newID.value}`)
      .then((res) => {
        console.log(res);
        return res.json();
      })
      .then((date) => {
        console.log(date);
        store.ShowTip("补卡成功").then((res) => {
          router.push("/Index");
        });
      });
  } else {
    showId.value = true;
  }
};
getid();
</script>
