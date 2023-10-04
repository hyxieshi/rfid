<script setup>
import { reactive } from "vue";
import { useAlertsStore } from "@/store.js";
import { useRoute, useRouter } from "vue-router";
const store = useAlertsStore();
const route = useRoute();
const router = useRouter();
// console.log(store);
store.userInfo =null 
const form = reactive({
  username: "",
  password: "",
});

const login =async function () {
  let login =await store.login(form);
  // console.log(router);
  if (login) {
    store.ShowTip('登录成功').then(res=>{
      router.push("/Index");

    })
  }else{
    store.ShowTip('密码错误')
  }
};

</script>

<template>
  <div class="body">
    <div class="login">
      <h2>R F I D</h2>
      <div class="input">
        <p>用户名</p>
        <input v-model="form.username" type="text" />
      </div>
      <div class="input">
        <p>密码</p>
        <input v-model="form.password" type="password" />
      </div>
      <button @click="login">登录</button>
    </div>
  </div>
</template>
<style>
.body {
  height: 100vh;
  width: 100vw;
  background: linear-gradient(135deg, #fff886, #f072b6);
  display: flex;
  justify-content: flex-end;
  align-content: center;
  flex-wrap: wrap;
}
.login {
  width: 40vw;
  height: 50vh;
  background: rgb(250, 211, 144, 0.4);
  border: 1px solid #c6c6;
  border-radius: 26px;
  margin-right: 60px;
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  justify-content: space-around;
  align-content: center;
}
.input {
  display: flex;
  justify-content: space-around;
  margin-bottom: 10px;
}
input {
  outline: none;
  border: 0;
  border-bottom: 1px solid #000;
  background: rgba(0, 0, 0, 0);
  height: auto;
  font-size: 20px;
}
button {
  width: 60%;
}
</style>