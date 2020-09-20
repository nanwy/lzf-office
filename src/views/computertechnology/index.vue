<template>
  <div class="content">
    <div class="col">
      <tabs>
        <tabs-panes label="部门公告">电脑</tabs-panes>
        <tabs-panes label="编译器下载">电脑1</tabs-panes>
        <tabs-panes label="授课视频">电脑2</tabs-panes>
        <tabs-panes label="Web教程">电脑3</tabs-panes>
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