<template>
  <div class="header_nav_bar">
      <cube :class="opened ? 'cubeRotate': 'noRotate'"  @handleClick="toggleSideBar" />
      <breadcrumb/>
      <avatar  @showBox="showLoginBox"/>
      <div class="btn-fullscreen" @click="handleFullScreen">
  <el-tooltip  effect="dark" :content="fullscreen ? `取消全屏`:`全屏`" placement="bottom">
    <i class="el-icon-full-screen"></i>
      <!-- <div class="msi">msi</div> -->
  </el-tooltip>
</div>
</div>

</template>

<script>
import cube from '@/components/cube'
import breadcrumb from '@/components/breadcrumb'
import avatar from '@/components/avatar'
import { mapState, mapMutations } from 'vuex'
export default {
  data () {
    return {
      fullscreen: false
    }
  },
  components: {
    cube,
    breadcrumb,
    avatar
  },
  computed: {
    ...mapState({
      opened: state => state.opened
    })
  },
  methods: {
    handleFullScreen () {
      let element = document.documentElement
      if (this.fullscreen) {
        if (document.exitFullscreen) {
          document.exitFullscreen()
        } else if (document.webkitCancelFullScreen) {
          document.webkitCancelFullScreen()
        } else if (document.mozCancelFullScreen) {
          document.mozCancelFullScreen()
        } else if (document.msExitFullscreen) {
          document.msExitFullscreen()
        }
      } else {
        if (element.requestFullscreen) {
          element.requestFullscreen()
        } else if (element.webkitRequestFullScreen) {
          element.webkitRequestFullScreen()
        } else if (element.mozRequestFullScreen) {
          element.mozRequestFullScreen()
        } else if (element.msRequestFullscreen) {
          // IE11
          element.msRequestFullscreen()
        }
      }
      this.fullscreen = !this.fullscreen
    },

    showLoginBox () {
      this.$emit('showUserBox')
    },
    toggleSideBar () {
      if (this.opened) {
        this.setOpened(false)
      } else {
        this.setOpened(true)
      }
    },
    ...mapMutations({
      setOpened: 'SET_OPENED'
    })
  }

}
</script>

<style lang="scss" scoped>
.header_nav_bar{
  position: relative;
  display: flex;
  align-items: center;
}
.cubeRotate {
  transition: all 0.4s;
  transform: rotate(90deg);
}
.noRotate{
  transition: all 0.4s;
}
.btn-fullscreen{
  position: absolute;
  height: 50px;
  right: 100px;
  top: 12px;
  width: 50px;
  font-size: 24px;
  cursor: pointer;
  font-weight: bold;
}
</style>
