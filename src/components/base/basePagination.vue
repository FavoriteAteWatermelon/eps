<template>
    <el-pagination
       style="text-align:right;margin-top: 10px"
        @size-change="_handleSizeChange"
        @current-change="_handleCurrentChange"
        :page-sizes="[10, 20, 30, 50, 100]"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total">
      </el-pagination>
</template>

<script>
export default {
  props: {
    total: {
      type: Number,
      default: 0
    }
  },
  methods: {
    _handleCurrentChange (index) {
      this.$emit('handleCurrentChange', index)
    },
    _handleSizeChange (size) {
      this.$emit('handleSizeChange', size)
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
