<template>
     <el-table
     v-loading = "pictLoading"
      element-loading-background = "rgba(0, 0, 0, 0.5)"
      element-loading-text = "数据正在加载中"
      element-loading-spinner = "el-icon-loading"
     :stripe= "true"
     :border="true"
    :data="tableData"
    highlight-current-row
    style="width: 100%">
    <el-table-column
     v-for="(item, index) in tableBarList"
     :key="index"
     :type="item.type"
      :property="item.property"
      :label="item.label"
      :width="item.width">
    </el-table-column>
  </el-table>
</template>

<script>

export default {
  props: {
    tableType: {
      type: String,
      defatult: ''
    },
    pictLoading: {
      type: Boolean,
      default: false
    },
    tableData: {
      type: Array,
      default: () => {
        return []
      }
    },
    tableBarList: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  methods: {
    exportExcel (tHeader, filterVal, filename) {
    // 下载excel选中表单内容
      if (this.tableData.length) {
        import('@/vendor/Export2Excel').then(excel => {
          const list = this.tableData
          const data = this._formatJson(filterVal, list)
          excel.export_json_to_excel({
            header: tHeader,
            data,
            filename
          })
          // this.$refs.multipleTable.clearSelection()
          // this.downloadLoading = false
        })
      } else {
        this.$message({
          message: 'Please select at least one item',
          type: 'warning'
        })
      }
    },
    // 需要json格式化内容
    _formatJson (filterVal, jsonData) {
      return jsonData.map(v => filterVal.map(j => v[j]))
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
