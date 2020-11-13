<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style lang="scss">

// html,body {
//   overflow: hidden;
// }
.el-menu--collapse {
  .el-submenu {
    &>.el-submenu__title {
      &>span {
        height: 0;
        width: 0;
        overflow: hidden;
        visibility: hidden;
        display: inline-block;
      }
    }
  }
}
.el-icon-circle-close{
  color:#fff!important;
  font-size: 50px!important;
}
</style>
