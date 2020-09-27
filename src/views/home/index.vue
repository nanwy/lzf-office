<template>
  <div class="content">
    <!-- <router-view></router-view> -->

    <div class="col">
      <div
        v-for="(item, index) in list"
        :key="item.id"
        class="article_content wow bounceInUp"
        ref="con"
      >
        <div class="artilcl">
          <nuxt-link :to="'/article/'" tag="h2">
            <img :src="item.pic" class="image" />
          </nuxt-link>
        </div>

        <div class="description">
          <nuxt-link :to="'/article/'" tag="h2" class="overtext">
            <span class="isTop" v-if="item.stay_at_top">置顶</span>
            <span>{{ item }}</span>
          </nuxt-link>
          <div class="article_b">
            <div class="overtext article-content">{{ item }}</div>
            <div class="bottom clearfix">
              <p class="author">
                <i class="el-icon-s-custom"></i>
                {{ item }}
              </p>
              <span class="createtime">
                <i class="el-icon-date"></i>
                {{ item }}
              </span>
              <span>{{ item }}次观看</span>
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