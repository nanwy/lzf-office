<template>
  <div class="content">
    <!-- <router-view></router-view> -->

    <div class="col">
      <div class="banner">
        <div class="honour">
          <h3 class="honour-title">工作室荣誉</h3>
          <div class="honour-content" v-for="item in honourList">
            <img src="@/assets/image/0.jpg" alt />
            <div class="content-r">
              <div class="detail">{{item.createtime}}</div>

              <div class="detail">{{item.detail}}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Bnner from "components/barousel";
export default {
  name: "home",
  data() {
    return {
      list: [],
      honourList: [
        {
          createtime: 154515431,
          img: "图片",
          detail: "第一次获奖",
        },
        {
          createtime: 154515431,
          img: "图片",
          detail: "第一次获奖",
        },
        {
          createtime: 154515431,
          img: "图片",
          detail: "第一次获奖",
        },
        {
          createtime: 154515431,
          img: "图片",
          detail: "第一次获奖",
        },
      ],
    };
  },
  created() {
    this.setData();
    console.log(this.list);
  },
  methods: {
    async setData() {
      var res = await axios.get("http://blog.nanwayan.cn/api/banner?type=1");
      console.log(res);
      this.list = res.data.banners;
    },
  },
  components: {
    Bnner,
  },
};
</script>

<style lang='scss' scoped>
.banner {
  display: flex;
  justify-content: space-between;
  align-items: center;
  .honour {
    width: 50%;
    .honour-title {
      color: #000;
      font-size: 20px;
      font-weight: 400;
      line-height: 33px;
      padding: 0 0 15px;
      position: relative;
    }
    .honour-content {
      display: flex;
      justify-content: flex-start;
      margin-bottom: 10px;

      img {
        height: 50px;
        width: 150px;
        margin-right: 10px;
      }
      .content-r {
        display: flex;
        flex-direction: column;
      }
    }
  }
}
</style>