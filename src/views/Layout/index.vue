<template>
  <div class="layout">
    <!-- 左侧导航 -->
    <Mymenu :isCollapse="isCollapse" class="slideNav" />
    <!-- 右侧内容 -->
    <TopHeader class="header" @toggleMenu='toggleMenu' />
    <MainContent  class="main-content" :class="{content:isCollapse}"/>
  </div>
</template>

<script>
import Mymenu from "./Mymenu.vue";
import TopHeader from "./TopHeader.vue";
import MainContent from "./MainContent.vue";

export default {
  components: {
    Mymenu,
    MainContent,
    TopHeader,
  },
  data() {
    return {
      isCollapse: false,
    };
  },
  methods: {
      //切换导航
      toggleMenu(val){
          this.isCollapse=val;
      }
  },
};
</script>

<style lang='scss' scoped>
.layout {
  height: 100%;
  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
  }
  .el-menu {
    border-right: 0;
  }
  .slideNav {
    height: 100%;
    // width: 200px;
    background: #999;
    float: left;
  }
  .header {
    height: 50px;
    line-height: 50px;
    border-bottom: 1px solid #eee;
    overflow: hidden;
  }
  .main-content{
    margin-left: 200px;
  }
  .content{
    margin-left: 64px;
  }
}
</style>