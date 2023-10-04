import { defineStore } from "pinia";
import { ref } from "vue";

// 你可以对 `defineStore()` 的返回值进行任意命名，但最好使用 store 的名字，同时以 `use` 开头且以 `Store` 结尾。(比如 `useUserStore`，`useCartStore`，`useProductStore`)
// 第一个参数是你的应用中 Store 的唯一 ID。
export const useAlertsStore = defineStore("userInfo", () => {
  const Url = "http://192.168.31.237:3000";
  const userInfo = ref(null);
  const msg = ref(null);
  const show = ref(false);

  const login = (option) => {
    return new Promise((resolve, reject) => {
      fetch("/api" + `/login?user=${option.username}&pass=${option.password}`)
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          if (data) {
            userInfo.value = data;
          } else {
            userInfo.value = null;
          }
          resolve(userInfo.value);
        });
    });
  };
  const ShowTip = function (date) {
    return new Promise((resolve, reject)=>{
      show.value = true;
      msg.value = date;
      let timer = setTimeout(function () {
        show.value = false;
        clearTimeout(timer);
        console.log("关闭提示")
        resolve()
      }, 1000);
    })
   
  };
  return {
    login,
    Url,
    userInfo,
    msg,
    show,
    ShowTip
  };
});
