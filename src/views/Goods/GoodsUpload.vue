<template>
  <el-upload
    class="upload-demo"
    ref="upload"
    :action="url"
    :on-preview="handlePreview"
    :on-remove="handleRemove"
    :on-success='handleSucess'
    :file-list="fileList"
    :auto-upload="false"
  >
    <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
    <el-button
      style="margin-left: 10px"
      size="small"
      type="success"
      @click="submitUpload"
      >上传到服务器</el-button
    >
    <div slot="tip" class="el-upload__tip">
      只能上传jpg/png文件，且不超过500kb
    </div>
  </el-upload>
</template>

<script>
import base from '../../api/config'
export default {
  data() {
    return {
      fileList: [],
      url:base.baseUrl+base.uploadUrl,
    };
  },
  methods: {
    submitUpload() {//提交上传功能
      this.$refs.upload.submit();
    },
    handleSucess(response, file, fileList){
        // console.log(response.url);
        //传递图片路径--回显图片
        console.log(base.baseUrl+'/'+response.url.slice(7));
        let imgUrl=base.baseUrl+'/'+response.url.slice(7)
        this.$emit('showImage',imgUrl)
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    },
  },
};
</script>

<style>
</style>