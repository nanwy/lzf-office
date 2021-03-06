<template>
  <div
    class="slider-container"
    ref="slider"
    :style="sliderStyle"
    @mouseover="pause()"
    @mouseout="play()"
  >
    <div class="slider-content" :class="mask ? 'mask' : ''">
      <div
        class="slider"
        v-for="(item, index) in list"
        :key="index"
        :class="setClass(index)"
        @click="onClick(index)"
        :style="setBGImg(item.pic)"
      >
        <!-- <img :src="item.pic" alt /> -->
      </div>
      <div class="dots" v-if="dots">
        <span
          v-for="(item, index) in list"
          :key="index"
          :style="setActiveDot(index)"
          @mouseenter.prevent="mouse(index)"
        ></span>
      </div>
      <div v-show="arrow" class="iconfont icon-left" @click="prev()"><</div>
      <div v-show="arrow" class="iconfont icon-right" @click="next()">></div>
    </div>
  </div>
</template>

<script>
import { log } from "util";
// import '../assets/icon.css'
export default {
  data() {
    return {
      currentIndex: 0,
      sliderDomList: [],
      timer: null,
    };
  },
  props: {
    list: {
      required: true,
      type: Array,
      default() {
        return [];
      },
    },
    width: {
      type: Number,
    },
    height: {
      type: Number,
    },
    imgType: {
      type: String,
      default: "percentage",
    },
    autoPlay: {
      type: Boolean,
      default: true,
    },
    mask: {
      type: Boolean,
      default: true,
    },
    interval: {
      type: Number,
      default: 4000,
    },
    dots: {
      type: Boolean,
      default: true,
    },
    arrow: {
      type: Boolean,
      default: true,
    },
    color: {
      type: String,
      default: "rgb(248, 85, 85)",
    },
  },
  computed: {
    sliderStyle() {
      return {
        width: this.width ? this.width + "px" : "100%",
        height: this.height ? this.height + "px" : "calc(100vw / 2.57)",
        perspective: this.width + "px",
        backgroundSize:
          this.imgType == "percentage" ? "100% 100%" : this.imgType,
      };
    },
  },
  mounted() {
    this.sliderDomList = this.$refs.slider.querySelectorAll("div.slider");
    this.play();
  },
  methods: {
    mouse(i) {
      console.log(this.currentIndex, "bar", i);
      this.currentIndex = i;
    },
    setClass(i) {
      let next =
        this.currentIndex === this.list.length - 1 ? 0 : this.currentIndex + 1;
      let prev =
        this.currentIndex === 0 ? this.list.length - 1 : this.currentIndex - 1;
      switch (i) {
        case this.currentIndex:
          return "active";
        case next:
          return "next";
        case prev:
          return "prev";
        default:
          return "";
      }
    },
    setBGImg(src) {
      return {
        backgroundImage: `url(${src})`,
      };
    },
    setActiveDot(index) {
      return index === this.currentIndex
        ? {
            backgroundColor: this.color,
          }
        : {
            backgroundColor: "#ccc",
          };
    },
    play() {
      this.pause();
      if (this.autoPlay) {
        this.timer = setInterval(() => {
          this.next();
        }, this.interval);
      }
    },
    pause() {
      clearInterval(this.timer);
    },
    next() {
      console.log(this.currentIndex);
      this.currentIndex = ++this.currentIndex % this.list.length;
    },
    prev() {
      this.currentIndex =
        this.currentIndex === 0 ? this.list.length - 1 : this.currentIndex - 1;
    },
    onClick(i) {
      if (i === this.currentIndex) {
        this.$emit("sliderClick", i);
      } else {
        let currentClickClassName = this.sliderDomList[i].className.split(
          " "
        )[1];
        console.log(currentClickClassName);
        if (currentClickClassName === "next") {
          this.next();
        } else {
          this.prev();
        }
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.slider-container {
  width: 100%;
  height: 300px;
  text-align: center;
  padding-bottom: 10px;
  position: relative;
  background-color: #ded9d3;
  .slider-content {
    position: relative;
    width: 100%;
    height: 100%;
    left: 0%;
    top: 0%;
    margin: 0px;
    padding: 0px;
    background-size: inherit;
  }
  .slider {
    position: absolute;
    margin: 0;
    padding: 0;
    top: 0;
    left: 50%;
    width: 100%;
    height: 100%;
    // transition: 200ms all cubic-bezier(1, -0.04, 1, 0.8);
    transition-duration: 300ms;
    background-color: #fff;
    background-repeat: no-repeat;
    background-position: center;
    background-size: inherit;
    transform: perspective(0px) translate3d(-50%, 0, -80px);
    z-index: 1;
    opacity: 0;
  }

  .active {
    // transform: perspective(0px) translate3d(-50%, 0, 0);
    // transform-origin: 0 100px;
    z-index: 20;
    opacity: 1;
    transition-duration: 300ms;
    // filter: blur(2px);
  }
  .prev {
    // transform: perspective(0px) translate3d(-75%, 0, -45px);
    z-index: 19;
    opacity: 0;

    filter: brightness(0.3);
  }
  .next {
    // transform: perspective(0px) translate3d(-25%, 0, -45px);
    z-index: 18;
    opacity: 0;

    filter: brightness(0.3);
  }
  .iconfont {
    width: 17.5%;
    // display: none;
    position: absolute;
    // top: 40%;
    height: 100%;
    font-size: 62px;
    color: rgba(255, 255, 255, 0.5);
    text-shadow: 0 0 24px rgba(0, 0, 0, 0.3);
    cursor: pointer;
    z-index: 21;
    line-height: calc(100vw / 2.57);
  }
  .icon-left {
    left: 0;
    background-image: linear-gradient(to right, #000, transparent);
  }
  .icon-right {
    right: 0;
    background-image: linear-gradient(to left, #000, transparent);
  }

  :hover i {
    color: rgba(255, 255, 255, 0.8);
    display: block;
  }
  .mask .slider &.prev,
  .next &:before {
    background-color: rgba(0, 0, 0, 0.5);
  }
  .dots {
    position: absolute;
    bottom: 20px;
    width: 100%;
    height: 20px;
    z-index: 99;
  }
  span {
    display: inline-block;
    width: 20px;
    height: 2px;
    margin: 1px 3px;
    cursor: pointer;
  }
}
</style>