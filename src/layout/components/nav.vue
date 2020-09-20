<template>
  <div>
    <div class="navigator">
      <div class="wrapper">
        <div class="n-inner">
          <div class="n-tab-link" @mouseleave="mouseLeave">
            <div
              ref="nav"
              class="n-btn"
              v-for="(item,index) in navLinks"
              :key="index"
              @click="toPage(item,index)"
              @mouseover="mouseIn(item,index)"
              :class="{'n-active':activeIndex === index}"
            >
              <span class="n-text">{{item.name}}</span>
            </div>
            <div class="n-cursor" :style="{width: `${width}px`, left:`${left}px`}"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      navLinks: [
        {
          name: "首页",
          path: "/home",
        },
        {
          name: "研发中心",
          path: "/researchcenter",
        },
        {
          name: "视觉设计部",
          path: "/psdesign",
        },

        {
          name: "电脑科技部",
          path: "/computertechnology",
        },
        {
          name: "企业策划部",
          path: "/enterpriseplanningdepartment",
        },
        {
          name: "人工智能部",
          path: "/AIdepartment",
        },
      ],
      width: 0,
      left: 0,
      widthEnd: 0,
      leftEnd: 0,
      activeIndex: 0,
    };
  },
  watch: {
    $route(to, from) {
      // 本地存储
      console.log(to, from);
      sessionStorage.setItem(
        "navActive",
        JSON.stringify({
          left: this.activeIndex || "0",
        })
      );
      // this.getRouterBran();
    },
  },
  // computed: {
  //   moveBar(targetBar, index) {
  //     console.log("index", index, this.$refs.nav[index].offsetLeft);
  //     // return this.$refs.nav[index].offsetLeft;
  //     // console.log(this.left);
  //   },
  // },
  created() {},
  mounted() {
    // 初始化选中菜单
    this.__initNavBar();
    // this.left = this.$refs.nav[0].offsetLeft;
    // this.width = this.$refs.nav[0].offsetWidth;
    // this.leftEnd = this.$refs.nav[0].offsetLeft;
    // this.widthEnd = this.$refs.nav[0].offsetWidth;
    // window.addEventListener("beforeunload", () => {
    //   localStorage.removeItem("navActive");
    // });

    // window.onbeforeunload = function () {
    //   localStorage.removeItem("navActive");
    // };
  },

  methods: {
    moveBarLeft(index) {
      // console.log("index", index, this.$refs.nav[index].offsetLeft);
      return this.$refs.nav[index].offsetLeft;
      // console.log(this.left);
    },
    moveBarWidth(index) {
      // console.log("index", index, this.$refs.nav[index].offsetLeft);
      return this.$refs.nav[index].offsetWidth;
      // console.log(this.left);
    },
    __initNavBar() {
      let r = sessionStorage.getItem("navActive");
      if (r) {
        r = JSON.parse(r);
        this.activeIndex = r.left;
        console.log("r.left: ", r.left);
        // this.moveBar("this.left", r.left);

        this.left = this.moveBarLeft(r.left);
        this.leftEnd = this.moveBarLeft(r.left);

        // this.moveBar(this.width, r.left, "offsetWidth");
        this.width = this.moveBarWidth(r.left);
        // this.moveBar(this.leftEnd, r.left);
        console.log("this.leftEnd: ", this.leftEnd);

        // this.moveBar(this.widthEnd, r.left, "offsetWidth");
        this.widthEnd = this.moveBarWidth(r.left);
        return;
      }
      this.left = this.moveBarLeft(0);
      this.width = this.moveBarWidth(0);
      this.leftEnd = this.moveBarLeft(0);
      this.widthEnd = this.moveBarWidth(0);
    },

    toPage(item, index) {
      this.$router.push(`${item.path}`);
      this.leftEnd = this.moveBarLeft(index);
      this.widthEnd = this.moveBarWidth(index);
      this.activeIndex = index;
    },
    mouseIn(item, index) {
      this.left = this.moveBarLeft(index);
      this.width = this.moveBarWidth(index);
    },
    mouseLeave() {
      this.left = this.leftEnd;
      this.width = this.widthEnd;
    },
  },
};
</script>

<style lang='scss' scoped>
.n-text {
  color: #a0a0a1;
  font-size: 14px;
  transition: all 0.2s;
}
.title {
}
.navigator {
  margin-bottom: 10px;
  position: relative;
  overflow: hidden;
  background-color: #fff;
  .wrapper {
    width: 1100px;
    margin: 0 auto;
    position: relative;
    .n-inner {
      height: 66px;
      background: #fff;
      padding: 0 20px;
      // font-size: 0;
      .n-tab-link {
        display: flex;
        justify-content: center;
        align-items: center;
        // font-size: 0;
        position: relative;
        vertical-align: middle;
        margin: 0 auto;
        .n-active {
          .n-text {
            color: #0ba5d8;
          }
        }
        .n-btn {
          display: inline-block;
          // width: 100px;
          // font-size: 0;
          line-height: 66px;
          margin-right: 16px;
          // position: relative;
          cursor: pointer;

          &:hover .n-text {
            color: #0ba5d8;
          }
        }
        .n-cursor {
          display: flex;
          justify-content: space-between;
          align-items: center;
          background: #00a1d6;
          width: 20px;
          padding: 10;
          font-size: 12px;
          // height: 3px;
          transition: all 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
          position: absolute;
          bottom: -1px;
          left: 0;
        }
        .n-cursor::after {
          content: "";
          position: absolute;
          width: 100%;
          height: 4px;
          background-color: #0ba5d8;
          transform: scalex(0.8) translatey(-5px);
        }
      }
    }
  }
}
</style>