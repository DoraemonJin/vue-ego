<template>
  <el-tree :props="props" 
  :load="loadNode" lazy 
  @node-click="handleNodeClick"
    accordion
  >
  </el-tree>
</template>

<script>
export default {
  data() {
    return {
      props: {
        label: "name",
        children: "zones",
        isLeaf: "leaf",
      },
    };
  },
  methods: {
      //获取点击的node的界面的数据--发送给弹框
    handleNodeClick(data,node) {
      console.log(data);
      //把点击的tree的数据 传递给父组件弹框组件
      this.$emit('getTreeData',data)
      // console.log(data.name,'-------',node.parent);
    },
    //懒加载
    loadNode(node, resolve) {
      if (node.level === 0) {
        this.$api.selectCategory().then((res) => {
          if (res.status === 200) {
            return resolve(res.result);
          }
        });
      } else {
        this.$api
          .selectCategory({
            id: node.data.cid,
          })
          .then((res) => {
            if (res.status === 200) {
              return resolve(res.result);
            } else {
              return resolve([]);
            }
          });
      }
    },
  },
};
</script>

<style>
</style>