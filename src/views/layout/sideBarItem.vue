<template>
  <div v-if="!item.hidden === true">
    <template v-if="(item.children && item.children.length < 2) || (item.meta && item.meta.nav && item.meta.nav === 'last')">
          <router-link :to="resolvePath(item.path)">
      <el-menu-item :index="item.path">
        <i :class="item.icon"></i>
       <span slot="title">{{item.name ? item.name : item.title}}</span>
      </el-menu-item>
    </router-link>
    </template>
    <el-submenu v-else :index="item.path" popper-append-to-body >
        <template slot="title">
        <i :class="item.icon"></i>
        <span>{{item.name}}</span>
        <!-- <span >{{item.name}}</span> -->
      </template>
      <sidebar-item
      :base-path="resolvePath(child.path)"
      :key="index" v-for="(child,index) in item.children"
      :item="child"
      ></sidebar-item>
    </el-submenu>
  </div>
</template>
<script>
// import { isExternal } from '@/utils/validate'
import path from 'path'
import {mapGetters} from 'vuex'
export default {
  name: 'SidebarItem',
  // methods: {
  //   test () {
  //     console.log(this.$router)
  //     console.log(this.item)
  //   }
  // },
  props: {
    item: {
      type: Object,
      required: true
    },
    basePath: {
      type: String,
      default: ''
    }
  },
  computed: {
    ...mapGetters([
      'sidebar'
    ])
  },
  created () {
    // console.log(this.item.children)
  },
  mounted () {
    // console.log(this.item)
  },
  components: {
    // alink
  },
  methods: {
    resolvePath (routePath) {
      // console.log(path.resolve('/a','/b',''))
      if (this.item.children) {
        return path.resolve(this.item.path, this.basePath, routePath)
      } else {
        return path.resolve(this.basePath)
      }
    }
  }
}
</script>
<style lang="scss" scoped>
</style>
