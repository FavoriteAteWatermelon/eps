<template>
  <div class="listview">
    <div class="add" @click="addItem">+</div>
    <div class="header-title" :style="{'border-bottom': '5px' + ' solid ' + color}">
      <span :style="{background: color}">{{name}}</span>
      </div>
    <div class="list-item-con">
      <span @click="deleItem(name,index)"  v-for="(item,index) in children" :key="index" :style="{background: item.status ?  '#3d7eff' : 'red'}"  class="list-item">{{item.name}}</span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    name: {
      type: String,
      default: 'SPI'
    },
    color: {
      type: String,
      default: '#F09819'
    },
    children: {
      type: Array,
      default: () => {
        return [
          {name: 'ddd', status: true, value: 'SPI'}
        ]
      }
    }
  },
  methods: {
    addItem () {
      // console.log(11122)
      this.$emit('addItem', this.name)
    },
    deleItem (name, index) {
      this.$emit('deleItem', name, index)
    }
  }
}
</script>

<style lang="scss"  scoped>
.listview{
  width: 100%;
  min-height: 86px;
  position: relative;
  .add {
    position: absolute;
    left: 70px;
    top: 0;
    height: 30px;
    width: 30px;
    border-radius: 15px;
    font-size: 30px;
    color: #ffffff;
    background: #409eff;
    text-align: center;
    line-height: 30px;
    cursor: pointer;
  }
  .header-title{
    border-bottom: 5px solid #F09819;
    span {
      text-align: center;
      height: 30px;
      line-height: 30px;
      font-size: 20px;
      font-style: italic;
      font-weight: bold;
      display: inline-block;
      width: 60px;
      background: #F09819;
      color: #fff;
      letter-spacing: 1px;
      border-top-left-radius: 5px;
    }
  }
  .list-item-con{
    margin-left: 50px;
    text-align: center;
    span {
      display: inline-block;
      margin:  12px;
      // background: #3d7eff;
      padding: 4px 8px;
      border-radius: 3px;
      color: #fff;
    }
  }
}

</style>
