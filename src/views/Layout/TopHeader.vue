<template>
    <div class="header">
          <i
            class="iconfont"
            :class="flag ? 'icon-left-indent' : 'icon-right-indent'"
            @click="toggleMenu"
          ></i>
        <div class="header-right">
          <el-dropdown style="margin-right: 10px" @command="handleCommand">
            <span class="el-dropdown-link" style="color: #fff">
              下拉菜单<i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="zh">中文</el-dropdown-item>
              <el-dropdown-item command="en">English</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
          <span>hello {{ userinfo.user }}</span>
          <i class="iconfont icon-tuichu" @click="loginout"></i>
        </div>
    </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
export default {
   data() {
    return {
      flag: false,
    };
  },
  computed: {
    ...mapState("loginModule", ["userinfo"]),
  },
  methods: {
    ...mapMutations("loginModule", ["clearUser"]),
    //切换
    toggleMenu(){
      this.flag = !this.flag;
      this.$emit("toggleMenu", this.flag);
    },
    loginout() {
      /**
       * 退出登录
       * 1. 清空vuex  2. 清空存储数据 3.返回登录界面
       */
      localStorage.removeItem("userinfo");
      this.clearUser();
      this.$router.push("/login");
      //刷新：window.localtion.reload()
    },
    /**
     * 切换语法
     */
    handleCommand(command) {
      console.log("切换语言", command);
      // console.log(this.$i18n.locale);
      this.$i18n.locale = command;
    },
  },
}
</script>

<style lang='scss' scoped>
.header {
  background: #1e78bf;
  color: #fff;
  margin-bottom: 20px;
  .iconfont {
    font-size: 26px;
  }
  .header-right {
    float: right;
    color: #fff;
    font-size: 14px;
    .dropMenu{
      color: #fff;
    }
    span {
      margin: 0 10px;
      .iconfont {
        font-size: 20px;
        position: relative;
        top: 2px;
      }
    }
  }
}

</style>