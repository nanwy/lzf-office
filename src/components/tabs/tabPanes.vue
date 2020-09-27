<template>
  <div
    class="tab-pane"
    :class="{'active':tabName===$parent.active}"
    v-show="tabName===$parent.active"
  >
    <slot v-if="$parent.showContent"></slot>
  </div>
</template>
<script>
// import { prefixCls } from "../prefix";
export default {
  name: `TabPane`,
  data() {
    return {
      // randomName: this.name || Math.random().toString(36).substr(2, 8)
      tabName: this.name || "tab-" + this.$parent.tabName,
    };
  },
  created() {
    this.$parent.tabName++;
    this.tabName = this.name || "tab-" + this.$parent.tabName;
    console.log(this.$parent.active);
  },
  props: {
    label: String,
    name: String,
    disabled: Boolean,
  },
  mounted() {
    this.$parent.panes.push(this);
    console.log(this.tabName);
  },
  watch: {
    name(val) {
      console.log(val);
    },
  },
};
</script>