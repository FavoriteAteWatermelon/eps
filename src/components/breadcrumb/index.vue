<template>
  <div class="breadcrumb">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :key="router" v-for="router in breadcrumbList" >{{router}}</el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>

<script>
export default {
  data () {
    return {
      breadcrumbList: []
    }
  },
  // 将路由循环
  mounted () {
    this.breadcrumbList = this.$router.currentRoute.matched.map((item) => { return item.name })
    // 监控页面刷新事件
    window.onload = () => {
      // if ()
      this.breadcrumbList = this.$router.currentRoute.matched.map((item) => { return item.name })
      // console.log(this.breadcrumbList)
    }
  },
  // 观测路由的变化
  watch: {
    $route (now) {
      // console.log(now)
      // console.log(now.matched)
      this.breadcrumbList = now.matched.map((item) => { return item.name })
      console.log(this.breadcrumbList)
    }
  }

}
</script>
<style lang="scss" scoped>
.breadcrumb{
  display: inline-block;
  margin-left: 20px;
}

</style>
