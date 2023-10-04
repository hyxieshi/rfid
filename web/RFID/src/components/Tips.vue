<script setup>
import { useAlertsStore } from "@/store.js";
const store = useAlertsStore();


</script>

<template>
  <div class="msg">{{ store.msg }}</div>
</template>

<style scoped>
.msg{
  position: fixed;
  left: 50%;
  top: 50%;
  background-color: rgba(0, 0, 0, .6);
  padding: 10px 16px;
  transform: translate(-50%, -50%);
  border-radius: 10px;
  color: #fff;
}
</style>
