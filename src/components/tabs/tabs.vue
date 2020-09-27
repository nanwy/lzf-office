<!--<template>
  <div>
    <div v-for="(pane,index) in panes" :key="index">
      {{pane.label}}
      <div><slot name='pane.$slots'></slot></div>
      &lt;!&ndash;{this.panes.map(pane => {
      return pane.$slots.label || pane.label
      })}&ndash;&gt;
    </div>
    <div class="tabs-content">
      <slot></slot>
    </div>
  </div>
</template>-->
<script>
export default {
  name: `Tabs`,
  props: {
    value: {
      type: String,
      default: "tab-1",
    },
    change: Function,
    beforeLeave: {
      type: Function,
      default: function () {
        return true;
      },
    },
    showContent: {
      // 是否显示切换内容
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      panes: [],
      active: this.value,
      tabName: 0, // tabPane的name值
    };
  },
  watch: {
    value(val) {
      this.active = val;
    },
  },
  mounted() {},
  methods: {
    _onTabClick(item, index) {
      if (!item.disabled && this.beforeLeave(item.tabName)) {
        this.active = item.tabName;
        this.$emit("input", item.tabName); // v-model时双向绑定
        this.change && this.change(item.tabName, item.label, index + 1);
        this.$emit("change", item.tabName, item.label, index + 1);
      }
    },
  },
  render() {
    let index = 0;
    let that = this;
    return (
      <div class={`nan-tabs`}>
        <div class="tabs-nav clearfix">
          <div
            class="active-bar is-left"
            style={`transform: translateY(${40 * that.index}px); height: 40px;`}
          ></div>
          {this.panes.map((pane, index) => {
            return (
              <div
                class={{
                  "tabs-tab": true,
                  active: this.active === pane.tabName,
                  disabled: pane.disabled,
                }}
                on-click={(ev) => {
                  this._onTabClick(pane, index, ev);
                  that.index = index;
                }}
              >
                {pane.$slots.label || pane.label}
              </div>
            );
          })}
        </div>
        {this.$slots.content}
        <div
          class="tabs-content"
          style={{ display: this.showContent ? null : "none" }}
        >
          {this.$slots.default}
        </div>
      </div>
    );
  },
};
</script>
<style lang="scss" scoped>
.nan-tabs {
  height: 200px;
  overflow: hidden;
  .tabs-nav {
    position: relative;
    height: 100%;
    float: left;
    margin-right: 10px;
    cursor: pointer;

    &:after {
      content: "";
      position: absolute;
      height: 100%;
      width: 2px;
      left: auto;
      right: 0;
      top: 0;
      background-color: #e4e7ed;
      z-index: 1;
    }
    .active-bar {
      position: absolute;
      bottom: 0;
      left: 0;
      height: 2px;
      background-color: #409eff;
      z-index: 5;
      transition: transform 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
      list-style: none;
    }
    .is-left {
      top: 0;
      bottom: auto;
      width: 2px;
      height: auto;
      left: auto;
      right: 0;
    }
    .tabs-tab {
      // float: left;
      padding: 0 20px;
      height: 40px;
      box-sizing: border-box;
      line-height: 40px;
      // display: inline-block;
      list-style: none;
      font-size: 14px;
      font-weight: 500;
      color: #303133;
      position: relative;
      transition: all 0.2s;
      // &.active:after {
      //   opacity: 1;
      //   width: 100%;
      // }
      // &:after {
      //   content: "";
      //   display: block;
      //   margin: 0 auto;
      //   height: 2px;
      //   background: #409eff;
      //   opacity: 0;
      //   width: 0;
      //   -webkit-transition: all 0.3s;
      //   transition: all 0.3s;
      // }
      &:hover {
        color: #409eff;
      }
    }
    .active {
      color: #409eff;
    }
  }
  .tabs-content {
    position: relative;
    overflow: hidden;
  }
}
</style>