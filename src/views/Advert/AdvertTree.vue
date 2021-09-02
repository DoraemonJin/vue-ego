<template>
  <div>
    <el-tree
      :data="data"
      :expand-on-click-node="false"
      :render-content="renderContent"
      :props="props"
      lazy
      :load="loadNode"
      node-key="pid"
      :default-expanded-keys="[1001]"
      @node-click="handleNodeClick"
    >
    </el-tree>

    <!-- 弹框 -->
    <el-dialog :title="title" :visible.sync="dialogVisible" width="40%">
      <p>当前出于的广告位置：{{ advertInfo.name }}</p>
      <el-input type="text" v-model="advertName" />

      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitAdvert">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>


<script>
export default {
  data() {
    return {
      dialogVisible: false, //弹框状态关闭
      title: "添加广告",
      advertName: "", //广告名字
      advertInfo: {}, //点击广告节点内容
      props: {
        label: "name",
        children: "zones",
        isLeaf: "leaf",
      },
      data: [],
    };
  },
  methods: {
      //点击tree节点---发送数据
    handleNodeClick(data) {
      console.log(data);
      this.$emit('getTreeData',data)
    },
    http(){
        this.$api.getAdvertlist().then((res) => {
          console.log("广告分类", res);
          this.data=res.result;
        });
    },
    //进入组件懒加载数据
    loadNode(node, resolve) {
      if (node.level === 0) {
        //第一次请求
        this.$api.getAdvertlist().then((res) => {
          console.log("广告分类", res);
          return resolve(res.result);
        });
      }
      if (node.level >= 1) {
        this.$api
          .getAdvertlist({
            id: node.data.pid,
          })
          .then((res) => {
            console.log("广告分类---22---", res);
            if (res.status === 200) {
              return resolve(res.result);
            } else {
              return resolve([]);
            }
          });
      }
    },
    //render-content
    //增加
    append(data) {
      console.log(data);
      //显示弹框
      this.dialogVisible = true;
      this.title = "添加广告";
      //获取点击的节点内容
      this.advertInfo = data;
    },
    //删除
    remove(node, data) {},

    //修改
    update(data) {
      //显示弹框
      this.dialogVisible = true;
      this.title = "修改广告名称";
      //获取点击的节点内容
      this.advertInfo = data;
    },
    //提交确定按钮
    submitAdvert() {
      if (this.title == "添加广告") {
        console.log("添加事件");
        this.$api
          .addvertChild({
            pid: this.advertInfo.pid,
            name: this.advertName,
          })
          .then((res) => {
            console.log(res);
            if (res.status === 200) {
              //添加成功
              this.$message({
                message: "恭喜你，这是一条成功消息",
                type: "success",
              });
              //隐藏弹框--清空数据
              this.dialogVisible = false;
              this.advertName = "";
              //更新tree
              this.http()
              
            } else {
              //错误信息提示
            }
          });
      } else {
        console.log("修改事件");
      }
    },
    renderContent(h, { node, data, store }) {
      return (
        <span class="custom-tree-node">
          <span>{node.label}</span>
          <span>
            <el-button
              size="mini"
              type="text"
              on-click={() => this.append(data, "add")}
            >
              增加
            </el-button>
            <el-button
              size="mini"
              type="text"
              on-click={() => this.update(data, "update")}
            >
              修改
            </el-button>
            <el-button
              size="mini"
              type="text"
              on-click={() => this.remove(node, data)}
            >
              删除
            </el-button>
          </span>
        </span>
      );
    },
  },
};
</script>

<style>
</style>