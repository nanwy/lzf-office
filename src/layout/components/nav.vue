<template>
  <div>
    <div class="navigator">
      <div class="wrapper">
        <div class="n-inner">
          <div class="n-tab-link" @mouseleave="mouseLeave">
            <div
              ref="nav"
              class="n-btn"
              v-for="(item, index) in navLinks"
              :key="index"
              @click="toPage(item, index)"
              @mouseover="mouseIn(item, index)"
              :class="{ 'n-active': activeIndex === index }"
            >
              <span class="n-text">{{ item.name }}</span>
            </div>
            <div
              class="n-cursor"
              :style="{ width: `${width}px`, left: `${left}px` }"
            ></div>
          </div>
        </div>
      </div>
      <!-- <div id="pause" class="btn login" @click="dialogVisible = true">登录</div> -->
      <nan-button
        class="login"
        type="primary"
        size="small"
        @click="dialogVisible = true"
        >登录</nan-button
      >
    </div>
    <transition name="dialog-fade">
      <div class="login-dialog" key="5" v-show="dialogVisible">
        <transition name="slide">
          <login-dialog
            title="登录"
            :modal-append-to-body="false"
            :visible.sync="dialogVisible"
            width="30%"
            v-if="isLogin"
            ref="submiti"
          >
            <form class="form-confirm">
              <LoginInput
                v-model="uname"
                :width="100"
                @blur="blur"
                @focus="focuClass = true"
              >
                <span class="from" data-placeholder="请输入账号"></span>
              </LoginInput>

              <LoginInput
                v-model="uname"
                :width="100"
                @blur="blur"
                showPassword
              >
                <span class="from" data-placeholder="请输入密码"></span>
              </LoginInput>
              <div class="code">
                <LoginInput
                  v-model="uname"
                  @blur="blur"
                  showPassword
                  style="width: calc(100% - 52px)"
                >
                  <span class="from" data-placeholder="请输入验证码"></span>
                </LoginInput>
                <div class="login-code" @click="refreshCode">
                  <Identify
                    :identifyCode="identifyCode"
                    :fontSizeMin="12"
                    :fontSizeMax="22"
                  ></Identify>
                </div>
              </div>
            </form>

            <span slot="footer" class="dialog-footer">
              <nan-button
                class="login"
                type="success"
                size="small"
                @click="submit"
                >登录</nan-button
              >
              <nan-button
                class="login"
                type="primary"
                size="small"
                @click="isLogin = false"
                >去注册</nan-button
              >
              <div @click="dialogVisible = false">取消</div>
            </span>
          </login-dialog>
        </transition>
        <transition name="slide">
          <login-dialog
            title="登录"
            :modal-append-to-body="false"
            :visible.sync="dialogVisible"
            v-if="!isLogin"
            key="2"
            width="30%"
          >
            <LoginInput
              v-model="uname"
              :width="100"
              @blur="blur"
              @focus="focuClass = true"
            >
              <span class="from" data-placeholder="请输入账号"></span>
            </LoginInput>

            <LoginInput v-model="uname" :width="100" @blur="blur" showPassword>
              <span class="from" data-placeholder="请输入密码"></span>
            </LoginInput>
            <div class="code">
              <LoginInput
                v-model="uname"
                @blur="blur"
                showPassword
                style="width: calc(100% - 52px)"
              >
                <span class="from" data-placeholder="请输入验证码"></span>
              </LoginInput>
              <div class="login-code" @click="refreshCode">
                <Identify
                  :identifyCode="identifyCode"
                  :fontSizeMin="12"
                  :fontSizeMax="22"
                ></Identify>
              </div>
            </div>

            <span slot="footer" class="dialog-footer">
              <nan-button
                class="login"
                type="success"
                size="small"
                @click="isLogin = true"
                >去登录</nan-button
              >
              <nan-button class="login" type="primary" size="small"
                >注册</nan-button
              >
            </span>
          </login-dialog>
        </transition>
        <transition name="v-modal">
          <div class="v-modal" v-show="dialogVisible"></div>
        </transition>
      </div>
    </transition>
  </div>
</template>

<script>
import LoginDialog from "@/components/dialog";
import Identify from "@/components/identify";
import LoginInput from "@/components/from/input";
import NanButton from "@/components/Button";
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
      dialogVisible: false,
      identifyCodes: "吉林化工学院凌之风工作室",
      identifyCode: "",
      uname: "",
      focuClass: false,
      blurClass: false,
      isLogin: true,
    };
  },
  components: {
    LoginDialog,
    Identify,
    LoginInput,
    NanButton,
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
    this.refreshCode();
    console.log(this.identifyCode);
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
    submit(name) {
      console.log(this.$refs["submiti"]);
    },
    blur() {},
    refreshCode() {
      this.identifyCode = "";
      this.makeCode(this.identifyCodes, 4);
      console.log(this.identifyCode);
    },
    makeCode(o, l) {
      for (let i = 0; i < l; i++) {
        this.identifyCode += this.identifyCodes[
          this.randomNum(0, this.identifyCodes.length)
        ];
      }
    },
    randomNum(min, max) {
      return Math.floor(Math.random() * (max - min) + min);
    },
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
.login-dialog {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 100;
}
// .dialog-fade-enter-active {
//   animation: dialog-fade-in 3s;
// }

// .dialog-fade-leave-active {
//   animation: dialog-fade-out 3s;
// }

// @keyframes dialog-fade-in {
//   0% {
//     transform: translate3d(0, -20px, 0);
//     opacity: 0;
//   }
//   100% {
//     transform: translate3d(0, 0, 0);
//     opacity: 1;
//   }
// }

// @keyframes dialog-fade-out {
//   0% {
//     transform: translate3d(0, 0, 0);
//     opacity: 1;
//   }
//   100% {
//     transform: translate3d(0, -20px, 0);
//     opacity: 0;
//   }
// }
.dialog-fade-enter-active,
.dialog-fade-leave-active {
  transition: all 0.3s;
}
.dialog-fade-enter {
  // transform: translateY(-100px);
  opacity: 0;
}
.dialog-fade-leave-to {
  // transform: translateY(100px);
  opacity: 0;
}

.slide-enter-active,
.slide-leave-active {
  transition: all 0.3s;
}
.slide-enter {
  transform: translateX(-100%);
}
.slide-leave-to {
  transform: translateX(100%);
}
.n-text {
  color: #a0a0a1;
  font-size: 14px;
  transition: all 0.2s;
}
.slide {
  transform: translateX(-100%);
}
.title {
}
.from::before {
  content: attr(data-placeholder);
  position: absolute;
  width: 100%;
  top: 0;
  left: 0;
  padding: 10px 0;
  transition: all 0.5s ease-in-out;
  pointer-events: none;
}
.navigator {
  margin-bottom: 10px;
  position: relative;
  overflow: hidden;
  background-color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  .wrapper {
    // width: 1100px;
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
  .login {
    margin: 0 10px;
  }
}

.focus {
  top: -18px;
  font-size: 12px;
  left: 0;
  color: #03a9f4;
}
.code {
  display: flex;
  justify-content: space-between;
  align-items: center;
  .login-code {
    margin-top: 10px;
  }
}
</style>