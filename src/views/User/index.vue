<template>
  <div>
      个人中心
      <hr>
      <el-button @click="look">查看合同</el-button>
      <UserPdf ref='vuepdf'/>
  </div>
</template>

<script>
import UserPdf from './UserPdf.vue'

export default {
  components:{
    UserPdf
  },
  methods:{
    look(){
      this.$refs.vuepdf.dialogVisible=true;
    }
  }

}
</script>

<style>

</style>