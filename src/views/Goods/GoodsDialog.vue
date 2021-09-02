<template>
  <div>
    <el-dialog
      :title="title"
      :visible.sync="dialogVisible"
      width="70%"
      :before-close="clearForm"
    >
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="类目选择">
          <el-button type="primary" @click="showInnerVisible"
            >类目选择</el-button
          >
          {{ ruleForm.category }}
        </el-form-item>
        <el-form-item label="商品名称" prop="title">
          <el-input v-model="ruleForm.title"></el-input>
        </el-form-item>
        <el-form-item label="商品价格" prop="price">
          <el-input v-model="ruleForm.price"></el-input>
        </el-form-item>
        <el-form-item label="商品数量" prop="num">
          <el-input v-model="ruleForm.num"></el-input>
        </el-form-item>
        <el-form-item label="商品卖点" prop="sellPoint">
          <el-input v-model="ruleForm.sellPoint"></el-input>
        </el-form-item>
        <el-form-item label="商品图片" prop="image">
          <el-button type="primary" @click="uploadImage">上传图片</el-button>
          <img
            :src="ruleForm.image"
            style="width: 140px; vertical-align: middle; margin-left: 20px"
          />
        </el-form-item>
        <el-form-item label="商品描述" prop="desc">
          <WangEditor @getWangData="getWangData" ref="wangEditor" />
        </el-form-item>

        <el-form-item label="规格参数配置" v-show="rulesShow">
          <el-form
            ref="dynamicForm"
            label-width="100px"
            class="demo-dynamic"
          >
            <!-- 第一层遍历数据结构  -->
            <el-form-item
              v-for="(item, index) in paramData"
              :label="item.title"
              :key="index"
            >
              <div class="list">
                <el-input v-model="item.value"></el-input>
              </div>
              <!-- 第二层 -->
              <el-form-item
                v-for="(ele, n) in item.children"
                :label="ele.title"
                :key="n"
              >
                <div class="list">
                  <el-input v-model="ele.value"></el-input>
                </div>
              </el-form-item>
            </el-form-item>
          </el-form>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="clearForm">取 消</el-button>
        <el-button type="primary" @click="submitForm">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 1. 内弹框---类目选择-- -->
    <el-dialog
      width="40%"
      title="类目选择"
      :visible.sync="innerVisible"
      append-to-body
    >
      <GoodsTree @getTreeData="getTreeData" />
      <span slot="footer" class="dialog-footer">
        <el-button @click="innerVisible = false">取 消</el-button>
        <el-button type="primary" @click="showTreeData">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 2. 内弹框--上传图片 -->
    <el-dialog
      width="40%"
      title="上传图片"
      :visible.sync="imgInnerVisible"
      append-to-body
    >
      <GoodsUpload @showImage="showImage" />
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="imgInnerVisible = false"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
import GoodsTree from "./GoodsTree.vue";
import GoodsUpload from "./GoodsUpload.vue";
import WangEditor from "./WangEditor.vue";
export default {
  components: {
    GoodsTree,
    GoodsUpload,
    WangEditor,
  },
  props: {
    title: {
      type: String,
      default: "添加商品",
    },
    rowData: {
      type: Object,
      default: function () {
        return {};
      },
    },
  },
  watch: {
    rowData(val) {
      //延迟加载  this.$nextTick()
      this.$nextTick(() => {
        console.log("监听数据修改了", val);
        this.ruleForm = val;
        //获取规格配置参数  先判断规格参数是否存在，存在设置显示 转数组对象
        if(val.paramsInfo){
          this.paramData = JSON.parse(val.paramsInfo)
          this.rulesShow=true;
        }
        //清空富文本编译器
        // console.log(this.$refs.wangEditor);
        this.$refs.wangEditor.editor.txt.html(val.descs);
      });
    },
  },
  data() {
    return {
      dialogVisible: false, //外弹框
      innerVisible: false, //内弹框
      imgInnerVisible: false, //内弹框-图片上传
      rulesShow: false, //控制规格配置参数是否显示
      treeData: {}, //tree类目数据
      paramData: [], //规格配置数据
      ruleForm: {
        id: "",
        category: "", //类目名称
        cid: "", //类目标识
        title: "",
        price: "",
        num: "",
        sellPoint: "",
        image: "",
        desc: "",
      },
      rules: {
        title: [
          { required: true, message: "请输入活动名称", trigger: "blur" },
          { min: 1, max: 5, message: "长度在 1 到 5 个字符", trigger: "blur" },
        ],
        price: [{ required: true, message: "请输入商品价格", trigger: "blur" }],
        num: [
          { required: true, message: "请输入商品数量", trigger: "blur" },
          { min: 1, message: "至少一件商品", trigger: "blur" },
        ],
      },
    };
  },
  methods: {
    showInnerVisible() {
      this.innerVisible = true;
    },
    /**
     * 点击tree返回对应的类目数据
     */
    getTreeData(val) {
      this.treeData = val;
    },
    /**
     * 显示tree数据
     */
    showTreeData() {
      //显示类目
      this.ruleForm.category = this.treeData.name;
      this.ruleForm.cid = this.treeData.cid;
      this.innerVisible = false; //关闭内弹框
      //获取规格参数
      this.$api
        .getRulesParams({
          cid: this.ruleForm.cid,
        })
        .then((res) => {
          console.log(res);
          if (res.status === 200) {
            //渲染规格配置
            this.rulesShow = true;
            //解析数据 paramData
            this.paramData = JSON.parse(res.result[0].paramData);
            console.log(this.paramData);
          } else {
            //不显示规格配置
            this.rulesShow = false;
          }
        });
    },
    /**
     * 点击按钮--显示上传图片
     */
    uploadImage() {
      this.imgInnerVisible = true;
    },
    /**
     * 回显图片
     */
    showImage(val) {
      this.ruleForm.image = val;
    },
    /**
     * 富文本编译数据
     */
    getWangData(val) {
      console.log("富文本编译数据", val);
      this.ruleForm.desc = val;
    },
    /**
     * 提交按钮---添加商品
     * 参数： title cid  category sellPoint price num desc paramsInfo image
     */
    submitForm() {
      let { title, cid, category, sellPoint, price, num, desc, image, id } =
        this.ruleForm;
      let paramsInfo=JSON.stringify(this.paramData);//规格参数配置内容
      //判确定按钮功能：添加商品 --修改商品
      if (this.title == "添加商品") {
        this.$api
          .getAddProduct({
            title,
            cid,
            category,
            sellPoint,
            price,
            num,
            desc,
            image,
            paramsInfo
          })
          .then((res) => {
            console.log("---", res);
            if (res.status === 200) {
              this.$message({
                message: "恭喜你，这是一条成功消息",
                type: "success",
              });
              this.clearForm();
              //刷新商品列表--操作父元素里面方法
              this.$parent.http(1);
            } else {
              this.$message.error("错了哦，添加商品失败了");
            }
          });
      } else {
        console.log("编辑商品");
        this.$api
          .updateProduct({
            id,
            title,
            cid,
            category,
            sellPoint,
            price,
            num,
            desc,
            image,
            paramsInfo
          })
          .then((res) => {
            if (res.status === 200) {
              this.$message({
                message: "恭喜你，修改成功消息",
                type: "success",
              });
              this.clearForm();
              //刷新商品列表--操作父元素里面方法
              this.$parent.http(1);
            } else {
              this.$message.error("错了哦，添加商品失败了");
            }
          });
      }
    },
    /**
     * 清空表单
     */
    clearForm() {
      console.log("--------------");
      this.dialogVisible = false; //隐藏弹框
      //清空表单数据 1.初始化ruleForm 2.element-ui提供的重置
      this.ruleForm = {
        category: "", //类目名称
        cid: "", //类目标识
        title: "",
        price: "",
        num: "",
        sellPoint: "",
        image: "",
        desc: "",
      };
      //单独清空富文本编译器 editor.txt.clear() 清空编辑器内容
      this.$refs.wangEditor.editor.txt.clear();
      //清空规格配置
    this.paramData=[];
    this.rulesShow=false;
  },
  },
};
</script>

<style>
</style>