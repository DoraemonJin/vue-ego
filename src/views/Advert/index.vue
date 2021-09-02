<template>
  <div class='advert'>
    <!-- 左侧 -->
    <AdvertTree class="advert-left" @getTreeData='getTreeData' />
    <!-- 右侧 -->
    <AdvertContent class='advert-content' :treeData='treeData' />

  </div>
</template>

<script>
import AdvertTree from "./AdvertTree.vue";
import AdvertContent from './AdvertContent.vue'
export default {
  components: {
    AdvertTree,
    AdvertContent
  },
  data(){
    return{
      treeData:{name:'按钮'}
    }
  },
  methods:{
    getTreeData(val){
      console.log('----',val);
      this.treeData=val;
    }
  }
};
</script>

<style lang='scss' scoped>
.advert{
  margin: 20px;
}
  .advert-left{
    width: 300px;
    float: left;
  }
  .advert-content{
    float: left;
  }
</style>