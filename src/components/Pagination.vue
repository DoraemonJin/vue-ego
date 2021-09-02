<template>
  <el-pagination background 
    layout="total,prev, pager, next,jumper" 
    :page-size='pageSize'
   :total="total"
   @current-change="changePage"   
   >
  </el-pagination>
</template>

<script>
export default {
    props:{
        pageSize:{
            type:Number,
            default:10
        },
        total:{
            type:Number,
            default:100
        }
    },
    methods:{
        changePage(val){
            //子传父
            this.$emit('changeCurrent',val)
        }
    }
};
</script>

<style>
</style>