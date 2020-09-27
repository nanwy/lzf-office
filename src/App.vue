<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
import HelloWorld from "./components/HelloWorld.vue";

export default {
  name: "App",

  components: {
    HelloWorld,
  },
};
</script>

<style lang='scss'>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  position: relative;
  color: #2c3e50;
  // margin-top: 60px;
}
</style>
