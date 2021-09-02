## 易购管理后台系统
电商后台管理界面  进行商品发布 更新 修改 等。 订单追踪等等。 

## 安装依赖
1. vue - vue-router vuex 
2. vue add element 
3. npm i axios -S 
4. npm i jwt-decode -S (解析jsonwebtoken)



## 后台系统 （了解）
1. 学习阶段选择模拟接口：node.js 
2. 公司后台技术：java  
3. 安装依赖：
    npm i express cors mysql -S 


## 项目初始化
1. 删除无用组件
2. css初始化
3. iconfont引入  (1.导入网址@import url() 2.打开iconfont网址复制创建本地文件 3.下载到本地引入 )
4. 路由基本配置 页面布局 

## 登录配置
1. element-tabs标签页
2. form表单 
3. 存储登录信息 vuex 本地存储 
4. token解析：jwt-decode   
   1. 语法：npm i jwt-decode -S 
   2. 解析： jwt(token内容)


## 商品列表界面
1. 表格数据 el-table
2. 封装分页功能 公共的组件 paganation 
3. 搜索框 el-input @change=''
4. 弹框：Dialog 
5. 数结构 Tree (懒加载)



## 上传图片
1. upload 图片上传
2. 注意：上传图片操作 给后台服务接口 不能跨域的 
3. 后台配置
   1. 后台安装 multer 模块   同时引入fs模块
   2. router.js入口文件导入模块
       const fs=require('fs')
        const multer=require('multer')
   3. 上传图片 不能跨域  需要配置cors 


## 富文本编译器
1. 百度编辑 
2. wangEdiotor（推荐）

## wangEditor 
1. 官网：https://www.wangeditor.com/
2.  安装：npm i wangeditor --save
3.  导入：import E from "wangeditor"
4.  创建生命周期函数使用
     data(){
        return{
            editor:''
        }
    }
    mounted(){
        this.editor = new E("#div1")
        this.editor.create()
    } 


## 延迟加载
    this.$nextTick(()=>{
        //延迟语句
        
    })


## 国际化
vuei18:https://kazupon.github.io/vue-i18n/zh/

## vuei18n使用
1. 介绍：Vue I18n 是 Vue.js 的国际化插件
2. 安装：npm install vue-i18n -S
3. 使用语法：
   1. 创建lang文件  vuei18.js 
   2. 引入vuei18 
     import Vue from 'vue'
     import VueI18n from 'vue-i18n'
   
     Vue.use(VueI18n)
    3. 准备翻译的语言环境信息
       const messages = {
            en: {//英语
                home: {//首页界面 英文翻译
                    product: 'product Message',
                    ....
                }
            },
            zh: {//汉语
                home: {
                    product: '商品管理',
                    ...
                }
            }
        }
    4. 通过选项创建 VueI18n 实例
       const i18n = new VueI18n({
            locale: 'zh', // 设置地区
            messages, // 设置地区信息
        })
    5.  通过 `i18n` 选项创建 Vue 实例
        new Vue({ i18n }).$mount('#app')

    6. template模板语法使用 vuei18 
       <p>{{ $t("home.product") }}</p>

## element-ui 国际化
1. 兼容 vue-i18n@6.x
2. 导入
        import Element from 'element-ui'
        import VueI18n from 'vue-i18n'
        import enLocale from 'element-ui/lib/locale/lang/en'//语言包
        import zhLocale from 'element-ui/lib/locale/lang/zh-CN'

3. const messages = {
    en: {
        message: 'hello',
        ...enLocale // 或者用 Object.assign({ message: 'hello' }, enLocale)
    },
    zh: {
        message: '你好',
        ...zhLocale // 或者用 Object.assign({ message: '你好' }, zhLocale)
    }
    }
4. 使用element 
    1. vue-i18n@6.x 
        Vue.use(Element, {
            i18n: (key, value) => i18n.t(key, value)
        })
    2. vue-i18n@8.x 
        Element.i18n((key, value) => i18n.t(key, value))

    
## vue-PDF
参考：gitHub： https://github.com/FranckFreiburger/vue-pdf

步骤：
1. npm install --save vue-pdf
2. import pdf from 'vue-pdf'
3.  components: {
    pdf
  }
4.  <pdf src="./static/relativity.pdf"></pdf>


问题：
    pdf打印的时候 看到视图  乱码的中文

vue-pdf网址:https://github.com/FranckFreiburger/vue-pdf/pull/130/commits/253f6186ff0676abf9277786087dda8d95dd8ea7


## 项目打包
1. 指令：npm run build 
2. 启动项目报错
   1. 启动命令  package.json
   2. 看项目 package.json 看技术点 
   3. 启动项报错了  module not defined (cnpm i) 
       报错xxx.vue
    4. 测试环境 ： node.js  npm yarn 


3. 项目自动化
   1. 写好项目 --上传git仓库 
   2. 自动化部署项目 

4. 特殊情况 
   1. npm run build 
   2. npm run build:配置属性环境

.env.development  开发环境
.env.production  线上环境
.env



## 周末任务
1. ego项目 -- 自己写一遍 
2. 面试题 
3. git视频(主)  vue3视频  ui-app（视频） ts(视频) (angular) 
4. 项目 -- psd稿  源码 
    
