<template>
  <div>
    <bnner :list="list"></bnner>
    <Nav />
    <Content>
      <transition name="fade" slot="routerView">
        <router-view></router-view>
      </transition>
    </Content>
  </div>
</template>

<script>
import Bnner from "components/barousel";
import axios from "axios";
import Nav from "./components/nav";
import Content from "./components/content";
export default {
  data() {
    return {
      list: [],
    };
  },
  components: {
    Nav,
    Content,

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

<style lang='scss' scoped>
.fade-enter {
  opacity: 0;
  transform: translateY(-20px);
}
.fade-enter-active,
.fade-leave-active {
  transition: all 0.3s;
}
.fade-leave-to {
  opacity: 0;
  transform: translateY(20px);
}

.slide-enter-active,
.slide-leave-active {
  transition: all 0.2s;
}
.slide-enter {
  transform: translateY(-100px);
}
.slide-leave-to {
  opacity: 0;
}
</style>