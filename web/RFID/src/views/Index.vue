<template>
  <div class="body">
    <div class="l">
      <h2 @click="menuOptions = 1" :class="{ select: menuOptions == 1 }">
        RFID列表
      </h2>
      <h2 @click="menuOptions = 2" :class="{ select: menuOptions == 2 }">
        设置
      </h2>
    </div>
    <div class="r">
      <div v-show="menuOptions == 1">
        <div style="display: flex; justify-content: center">
          <div class="select-container">
            <select
              id="selectOption"
              v-model="selectedOption"
              class="select-dropdown"
            >
              <option
                v-for="option in options"
                :key="option.id"
                :value="option.id"
                class="select-option"
              >
                {{ option.name }}
              </option>
            </select>
          </div>
          <input
            type="text"
            v-model="search"
            class="filter"
            :placeholder="optionTitle"
            style="text-align: left; margin-left: 20px"
          />
        </div>

        <table>
          <tr>
            <th>ID</th>
            <th>名字</th>
            <th>加入时间</th>
            <th>查看详情</th>
          </tr>
          <tr v-for="item in Users" :key="item._id">
            <td>{{ item.rfid }}</td>
            <td>{{ item.name }}</td>
            <td>{{ item.createdAtChina }}</td>
            <td><button @click="getid(item.rfid)">查看</button></td>
          </tr>
        </table>
      </div>
      <div v-show="menuOptions == 2">
        <div style="width: 500px; display: flex; justify-content: space-around">
          是否开始移动端密码校验
          <label class="switch">
            <input type="checkbox" v-model="isCheck" />
            <span class="slider"></span>
          </label>
        </div>
        <div
          style="
            width: 400px;
            display: flex;
            flex-direction: column;
            padding: 0 20px;
            margin-top: 20px;
          "
        >
          修改登录密码
          <input
            style="margin: 10px 0"
            type="text"
            v-model="form.pass"
            placeholder="请输入旧密码"
          />
          <input
            style="margin: 10px 0"
            type="text"
            v-model="form.newpass"
            placeholder="请输入新密码"
          />
          <button style="margin: 10px 0" @click="postPass">确定</button>
        </div>
      </div>
    </div>
  </div>
</template>
<style>
.body {
  display: flex;
  width: 100vw;
  min-height: 100vh;
}
.l {
  flex: 1;
  padding-top: 30px;
  box-sizing: border-box;
  /* background-color: aqua; */
}
.r {
  flex: 5;
  /* background-color: antiquewhite; */
  height: 100vh;
  padding-top: 30px;
  box-sizing: border-box;
}
h2 {
  margin: 8px 0;
  padding: 10px;
}
.select {
  background: linear-gradient(135deg, #ffe985, #fa742b);
  border-radius: 10px;
}
table {
  width: 100%;
  padding: 20px;
}
.switch {
  position: relative;
  display: inline-block;
  width: 60px;
  height: 34px;
}

.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  border-radius: 9999em;
  background-color: #ccc;
  -webkit-transition: 0.4s;
  transition: 0.4s;
}

.slider:before {
  position: absolute;
  content: "";
  height: 26px;
  width: 26px;
  left: 4px;
  bottom: 4px;
  border-radius: 50%;
  background-color: white;
  -webkit-transition: 0.4s;
  transition: 0.4s;
}

input:checked + .slider {
  background-color: #fd9644;
}

input:focus + .slider {
  box-shadow: 0 0 1px #fd9644;
}

input:checked + .slider:before {
  -webkit-transform: translateX(26px);
  -ms-transform: translateX(26px);
  transform: translateX(26px);
}
.select-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
}

.select-label {
  font-size: 16px;
  margin-bottom: 10px;
}

.select-dropdown {
  width: 200px;
  padding: 8px;
  border-radius: 4px;
  border: 1px solid #ccc;
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  background-image: url("data:image/svg+xml;utf8,<svg fill='black' height='24' viewBox='0 0 24 24' width='24' xmlns='http://www.w3.org/2000/svg'><path d='M7 10l5 5 5-5z'/><path d='M0 0h24v24H0z' fill='none'/></svg>");
  background-repeat: no-repeat;
  background-position-x: right;
  background-position-y: center;
}

.select-option {
  padding: 8px;
}

.selected-option {
  margin-top: 10px;
  font-size: 16px;
}
</style>
<script setup>
import { useAlertsStore } from "@/store.js";
import { computed, onMounted, reactive, ref, watch } from "vue";
import { useRouter } from "vue-router";

const store = useAlertsStore();
const router = useRouter();

// 获取id列表
const RawUsers = ref(null);
// 输入框过滤
const search = ref("");
const selectedOption = ref(""); // 这个属性将存储用户选择的选项的值
const options = ref([
  { id: 1, name: "ID" },
  { id: 2, name: "姓名" },
]);
selectedOption.value = 1;
const optionTitle = ref("");
watch(selectedOption, (n, o) => {
  optionTitle.value =
    "请输入查询" + options.value.find((item) => item.id == n).name;
},{
  deep:true,
  immediate:true,
});
// 左侧菜单选项
const menuOptions = ref(1);
const getUserids = () => {
  return new Promise((resolve, reject) => {
    fetch("/api" + "/idList")
      .then((res) => res.json())
      .then((data) => {
        RawUsers.value = data;
        resolve(data);
      });
  });
};
const getid = (id) => {
  router.push("/details/" + id);
};
getUserids();
let Users = computed(() => {
  if (search.value == "") return RawUsers.value;
  if(selectedOption.value==1){
    return RawUsers.value.filter((item) => item.rfid.includes(search.value));
  }else if(selectedOption.value==2) {
    return RawUsers.value.filter((item) => item.name.includes(search.value));
  }
  
});
const isCheck = ref(false);
isCheck.value = store.userInfo.state;
const form = reactive({
  pass: "",
  newpass: "",
});
const postPass = () => {
  if (form.pass == "" || form.newpass == "") return;
  fetch("/api/updatePass", {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      user: store.userInfo.user,
      pass: form.pass,
      newpass: form.newpass,
    }),
  })
    .then((res) => res.json())
    .then((data) => {
      if (data) {
        store.userInfo = {};
        store.ShowTip("密码修改成功，请重新登录").then((res) => {
          router.push("/");
        });
      } else {
        store.ShowTip("密码修改失败！请验证旧密码").then((res) => {});
      }
    });
};
onMounted(() => {});
watch(isCheck, (newValue, oldValue) => {
  if (newValue != oldValue) {
    const body = {
      user: store.userInfo.user,
      state: newValue,
    };
    console.log(body);
    fetch("/api/passState", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          store.userInfo.state = data.state;
          store.ShowTip("密码校验状态已更新").then((res) => {
            // console.log(store.userInfo.state);
          });
        }
      });
  }
});
</script>