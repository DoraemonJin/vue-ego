<template>
  <div>
      
    <el-dialog title="查看合同" :visible.sync="dialogVisible" width="70%">
      <!-- 1. 获取pdf文件  -->
      <!-- <pdf src='./sxt.pdf'/> -->
      <!-- 2.参数配置
        src ：pdf文件路径
        page: 显示第几页pdf内容

     -->
      <!-- {{ currentPage }} / {{ pageCount }} -->
      <!-- <pdf :src="src" :page='currentPage' /> -->

      <!-- 3.遍历展示所有的pdf -->
      <!-- <pdf
			v-for="i in numPages"
			:key="i"
			:src="src"
			:page="i"
			style="display: inline-block; width: 25%"
		></pdf> -->
      <!-- 4. 自己加分页 
            打印：
                1. 提供的方法：print()
                2. 需要打印哪个pdf 需要配置ref
      -->
      <el-button @click="printPdf">打印合同</el-button>
      <pdf ref='mypdf' :src="src" :page="currentPage" />
      <!-- 引入分页组件 -->
      <Pagination :pageSize="pageSize" :total="total" @changeCurrent='changeCurrent'/>

      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
//1. 安装pdf  2.引入pdf  3. 使用组件
import pdf from "vue-pdf";
import Pagination from '../../components/Pagination.vue'
var loadingTask = pdf.createLoadingTask("./sxt.pdf");
export default {
  data() {
    return {
      src: loadingTask,
      currentPage: 1, //当前页
      pageCount: 0, //总页
      pageSize:1,
      total:10,
      numPages: undefined,
      dialogVisible: false,
    };
  },
  components: {
    pdf,
    Pagination
  },
  mounted() {
    this.src.promise.then((pdf) => {//获取所有的pdf的页码数
    //   this.numPages = pdf.numPages;
      this.total = pdf.numPages;
    });
  },
  methods:{
      changeCurrent(num){//获取点击的分页页码
            this.currentPage=num;
      },
      //打印
      printPdf(){
          this.$refs.mypdf.print();//自动调用电脑上的打印操作 
          //打开界面后：1. 黑白色 2. 彩色 3. 页码  4.问题：查看打印的图的时候 pdf乱码
      }
  }
};
</script>

<style>
</style>