<template>
  <div id="app">
    <bnner :list="list" :height="350"></bnner>
    <router-view></router-view>
  </div>
</template>

<script>
import Bnner from "components/barousel";
import axios from "axios";
import HelloWorld from "./components/HelloWorld.vue";

export default {
  name: "App",
  data() {
    return {
      list: [],
    };
  },
  components: {
    HelloWorld,
    Bnner,
  },
  created() {
    this.setData();
  },
  methods: {
    async setData() {
      var res = await axios.get("http://blog.nanwayan.cn/api/banner?type=1");
      console.log(res);
      this.list = res.data.banners;
    },
  },
};
</script>

<style lang='scss'>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;

  color: #2c3e50;
  // margin-top: 60px;
}
</style>
