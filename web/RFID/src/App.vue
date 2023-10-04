<script setup>
import { ref } from "vue";
import TipsVue from "./components/Tips.vue";
import { useAlertsStore } from "@/store.js";
const store = useAlertsStore();



</script>

<template>
  <router-view></router-view>
  <TipsVue v-show="store.show"></TipsVue>
</template>

<style scoped>
</style>
