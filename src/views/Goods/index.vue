<template>
  <div>
    <!-- 1. 搜索框 -->
    <div class="header">
      <el-input
        v-model="search"
        placeholder="请输入内容"
        @change="goSearch"
      ></el-input>
      <el-button type="primary">查询</el-button>
      <el-button type="primary" @click="showDialog">添加</el-button>
    </div>

    <!-- 2. 表格数据 -->
    <div class="list">
      <el-table :data="tableData"  style="width: 100%">
      <el-table-column type="selection" width="55"> </el-table-column>
      <el-table-column prop="id" label="商品ID" width="100"> </el-table-column>
      <el-table-column prop="title" label="商品名称" width="120">
      </el-table-column>
      <el-table-column prop="price" label="商品价格" width="100">
      </el-table-column>
      <el-table-column prop="num" label="商品数量" width="100">
      </el-table-column>
      <el-table-column prop="category" label="规格类目"> </el-table-column>
      <el-table-column prop="image" label="商品图片" show-overflow-tooltip>
      </el-table-column>
      <el-table-column prop="sellPoint" label="商品卖点" show-overflow-tooltip>
      </el-table-column>
      <el-table-column prop="descs" label="商品描述" show-overflow-tooltip>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)"
            >编辑</el-button
          >
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

    <!-- 3分页. 表格数据 -->
    <div class="pagination">
      <Pagination
        :pageSize="pageSize"
        :total="total"
        @changeCurrent="changeCurrent"
      />
    </div>

    <!-- 4. 弹框 -->
    <GoodsDialog ref="dialog" :title='title' :rowData='rowData'  />
  </div>
</template>

<script>
import Pagination from "../../components/Pagination.vue";
import GoodsDialog from "./GoodsDialog.vue";
export default {
  components: {
    Pagination,
    GoodsDialog, //弹框组件
  },
  data() {
    return {
      tableData: [], //表格数据 {name,xxx,}
      pageSize: 10,
      total: 100,
      search: "",
      title:'添加商品',
      rowData:{},
    };
  },
  methods: {
    /**
     * 编辑商品
     */
    handleEdit(index, row) {
       console.log("编辑商品",row);
       this.$refs.dialog.dialogVisible = true;
       this.title='编辑商品';//新地址：1. {...}  2. Object.assgin({},row) 
       this.rowData={...row};//row={}

    },
    /**
     * 删除商品
     */
    handleDelete(index, row) {
      console.log(index, row);
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          //删除功能
          this.$api
            .deleteProduct({
              id: row.id,
            })
            .then((res) => {
              console.log(res);
              if (res.status === 200) {
                //更新视图
                this.http(1);
                this.$message({
                  message: "恭喜你，这是一条成功消息",
                  type: "success",
                });
              } else {
                this.$message.error("错了哦，删除失败");
              }
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    //获取点击页码
    changeCurrent(val) {
      this.http(val);
    },
    /**
     * 点击显示添加弹框
     */
    showDialog() {
      console.log("显示弹框");
      this.$refs.dialog.dialogVisible = true;
      this.title='添加商品'

    },
    /**
     * 搜索框事件
     */
    goSearch() {
      console.log("搜索数据", this.search);
      if (this.search) {
        this.$api
          .getSearch({
            search: this.search,
          })
          .then((res) => {
            console.log(res.data);
            if (res.data.status === 200) {
              this.tableData = res.data.result;
              this.pageSize = 8;
              this.total = res.data.result.length;
            } else {
              console.log("查无数据");
              this.tableData = [];
              this.pageSize = 1;
              this.total = 0;
            }
          });
      } else {
        this.http(1);
      }
    },
    /**
     * 网络请求
     */
    http(page) {
      this.$api
        .getProductList({
          page,
        })
        .then((res) => {
          console.log(res);
          if (res.status === 200) {
            this.tableData = res.data;
            //显示每天条数
            this.pageSize = res.pageSize;
            this.total = res.total;
          }
        });
    },
  },
  //网络请求
  created() {
    this.http(1);
  },
};
</script>

<style lang='scss' scoped>
.header {
  display: flex;
  margin-bottom: 30px;
  margin-left:20px;
  margin-right: 20px;
  button {
    margin-left: 20px;
  }
}
.list{
  margin: 10px;
}
.pagination {
  text-align: center;
  margin-top: 20px;
}
</style>