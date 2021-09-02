<template>
  <div class="form-box">
    <el-tabs type="border-card" v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="登录" name="login">
        <el-form
          :model="loginForm"
          status-icon
          :rules="rules"
          ref="loginForm"
          label-width="100px"
          class="demo-ruleForm"
        >
          <el-form-item label="账号" prop="username">
            <el-input
              type="text"
              v-model="loginForm.username"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input
              type="password"
              v-model="loginForm.password"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('loginForm')"
              >登录</el-button
            >
            <el-button @click="resetForm('loginForm')">重置</el-button>
          </el-form-item>
        </el-form>
      </el-tab-pane>
      <el-tab-pane label="注册" name="zhuce">
        <el-form
          :model="loginForm"
          status-icon
          :rules="rules"
          ref="loginForm"
          label-width="100px"
          class="demo-ruleForm"
        >
          <el-form-item label="账号" prop="username">
            <el-input
              type="text"
              v-model="loginForm.username"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input
              type="password"
              v-model="loginForm.password"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('loginForm')"
              >注册</el-button
            >
            <el-button @click="resetForm('loginForm')">重置</el-button>
          </el-form-item>
        </el-form>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import jwt from "jwt-decode";
import { mapMutations } from "vuex";
export default {
  data() {
    return {
      activeName: "login",
      loginForm: {
        //登录表单数据
        username: "",
        password: "",
      },
      rules: {
        //校验验证规则
        username: [
          { required: true, message: "请输入账号名称", trigger: "blur" },
          { min: 1, max: 5, message: "长度在 1 到 5 个字符", trigger: "blur" },
        ],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
      },
    };
  },
  methods: {
    ...mapMutations("loginModule", ["setUser"]),
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          //判断当前点击的是登录区域 还是注册
          if (this.activeName === "login") {
            console.log("登录事件");
            let { username, password } = this.loginForm;
            this.$api
              .getLogin({
                username,
                password,
              })
              .then((res) => {
                console.log(res);
                if (res.status === 200) {
                  //解析token字段
                  console.log(jwt(res.data));
                  let obj = {
                    user: jwt(res.data).username,
                    token: res.data,
                  };
                  //存储vuex
                  this.setUser(obj);
                  //存储本地
                  localStorage.setItem("userinfo", JSON.stringify(obj));
                  //跳转首页
                  this.$router.push("/");
                } else {
                  console.log("错误");
                   this.$message.error('错了哦，账号或者密码错误');
                }
              });
          } else {
            console.log("注册事件");
            //信息窗口提示信息 

          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    //tab
    handleClick(tab) {
      console.log("tab", tab.name);
      //重置表单
      this.$refs.loginForm.resetFields();
    },
  },
};
</script>

<style lang='scss' scoped>
.form-box {
  width: 600px;
  height: 400px;
  margin: 120px auto;
}
</style>