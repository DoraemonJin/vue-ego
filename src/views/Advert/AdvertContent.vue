<template>
  <div class="content">
    <el-button @click="addContent">{{ treeData.name }}广告</el-button>
    <!-- 表格 -->
    <el-table :data="tableData" style="width: 100%" border>
      <el-table-column prop="pid" label="PID" width="180"> </el-table-column>
      <el-table-column prop="name" label="名称" width="180"> </el-table-column>
      <el-table-column prop="url" label="访问地址" min-width="240" show-overflow-tooltip>
      </el-table-column>
      <el-table-column prop="image" label="图片地址" min-width="240" show-overflow-tooltip>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  props: {
    treeData: {
      type: Object,
      default: function () {
        return { name: "按钮" };
      },
    },
  },
  data() {
    return {
      tableData: [],
    };
  },
  watch: {
    treeData: function (val) {
      //清空数据
      this.tableData=[];
      this.$api
        .addAdvertContent({
          pid: val.pid,
        })
        .then((res) => {
          console.log('监听修改',res);
          if(res.status===200){
              this.tableData=res.result;
          }else{
            //没有数据
          }
        });
    },
  },
  methods: {
    handleDelete() {},
    //增加广告内容--弹框
    addContent() {},
  },
};
</script>

<style scoped lang='scss'>
.content {
  text-align: center;
  > button {
    margin-bottom: 20px;
  }
}
</style>