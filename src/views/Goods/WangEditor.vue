<template>
  <div id="main"></div>
</template>

<script>
import E from "wangeditor";
export default {
  data() {
    return {
      editor: "",
    };
  },
  mounted() {
    this.editor = new E("#main");
    // 或者 const editor = new E( document.getElementById('main') )
    // 设置编辑区域高度为 500px
    // this.editor.config.height = 500
    // 配置 onchange 回调函数
    this.editor.config.onchange =  (newHtml)=> {
    //   console.log("change 之后最新的 html", newHtml);
      //传递输入的内容
      this.$emit('getWangData',newHtml)
    };
    // 配置触发 onchange 的时间频率，默认为 200ms
    this.editor.config.onchangeTimeout = 500; // 修改为 500ms

    // 取消自动 focus
    this.editor.config.focus = false;
    // 默认情况下，显示所有菜单
    this.editor.config.menus = [
      "head",
      "bold",
      "fontSize",
      "fontName",
      "italic",
      "underline",
      //   "strikeThrough",
      //   "indent",
      "lineHeight",
      //   "foreColor",
      //   "backColor",
      "link",
      "list",
      "todo",
      "justify",
      "quote",
      "emoticon",
      "image",
      "video",
      "table",
      "code",
      "splitLine",
      "undo",
      "redo",
    ];
    this.editor.create();
  },
};
</script>

<style>
</style>