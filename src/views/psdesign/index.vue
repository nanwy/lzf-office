<template>
  <div class="content">
    <div class="col">
      <tabs>
        <tabs-panes label="部门公告">视觉</tabs-panes>
        <tabs-panes label="编译器下载">视觉1</tabs-panes>
        <tabs-panes label="授课视频">视觉2</tabs-panes>
        <tabs-panes label="Web教程">视觉3</tabs-panes>
      </tabs>
    </div>
  </div>
</template>

<script>
import Tabs from "@/layout/components/tabs/tabs";
import TabsPanes from "@/layout/components/tabs/tabPanes";
export default {
  components: {
    Tabs,
    TabsPanes,
  },
};
</script>

<style lang="scss" scoped>
</style>