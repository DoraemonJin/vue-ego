import Vue from 'vue';
import Element from 'element-ui'
import VueI18n from 'vue-i18n';
//引入自定义语言环境
import enLocale from './enLocale';
import zhLocale from './zhLocale';
//引入element里面的语言包
import eleenLocale from 'element-ui/lib/locale/lang/en'//语言包
import elezhLocale from 'element-ui/lib/locale/lang/zh-CN'

Vue.use(VueI18n)


//准备语法环境
const messages = {
    en: { //英语
       ...enLocale,
       ...eleenLocale
    },
    zh: { //汉语
        ...zhLocale,
        ...elezhLocale
    }
}

// 通过选项创建 VueI18n 实例
const i18n = new VueI18n({
    locale: 'zh', // 设置地区
    messages, // 设置地区信息
})
//配置element支持vuei18n 
Element.i18n((key, value) => i18n.t(key, value))

export default i18n;