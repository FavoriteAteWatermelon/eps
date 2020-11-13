<template>
  <div>
  <div style="display:flex;justify-content: space-between;margin-bottom:10px">
   <div></div>
   <div>
  <el-button class="exportExcel"  @click="_exportExcel" style="margin-right: 20px;text-align:right;background:#77A1D3"  type="primary" icon="el-icon-download">導出Excel</el-button>
  <el-button  class="exportExcel" @click="_addItem" style="margin-right: 20px;text-align:right;background:#20BDFF"  type="primary" icon="el-icon-plus">新增Training</el-button>
  <el-button type="primary" style="background:#3CA55C" icon="el-icon-search" @click="_search">搜索</el-button>
   </div>
</div>
<el-table
     v-if ="tableData.length"
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
      type="index"
      label="序號"
      width="55">
    </el-table-column>
    <el-table-column
      property="title"
      label="主題"
     >
    </el-table-column>
    <el-table-column
      property="trainOwner"
      label="受訓人"
     >
    </el-table-column>
    <el-table-column
    width="200px"
      property="trainDuring"
      label="要求完成時間段"
     >
    </el-table-column>

    <el-table-column
      property="requiro"
      width="200px"
      label="详情"
   >
   </el-table-column>
    <el-table-column
      property="guider"
      label="導師"
   ></el-table-column>
    <el-table-column
      property="depart"
      label="部門"
   ></el-table-column>
    <el-table-column
      property="createDate"
      width="200px"
      label="創建時間"
   ></el-table-column>
       <el-table-column
      property="creater"
      label="創建人"
   ></el-table-column>
      <el-table-column
      fixed="right"
      label="操作"
      width="100">
      <template slot-scope="scope">
        <el-popconfirm
         v-show=" userInfo.username === scope.row.creater "
        @confirm="deleteItem(scope.row)"
  title="这是一段内容确定删除吗？">
  <el-button  type="text" size="small" slot="reference">删除</el-button>
</el-popconfirm>
      </template>
    </el-table-column>
  </el-table>

  <BasePagination v-if="tableData.length" @handleCurrentChange="handleCurrentChange" @handleSizeChange="handleSizeChange" :total="total"/>
  <el-dialog
  title="新增Training項目"
  :close-on-click-modal="false"
  :visible.sync="dialogVisible"
  width="500px"
  >
  <div style="display:flex;margin-top: 20px">
    <span class="title">標題:</span><el-input
  placeholder="請輸入標題"
  v-model="trainList.title">
</el-input>
  </div>
  <div style="display:flex;margin-top: 20px">
    <span class="title">指導人:</span><el-input
  placeholder="請輸入指導人"
  v-model="trainList.guider">
</el-input>
  </div>
  <div style="display:flex;margin-top: 20px">
    <span class="title">受訓人:</span><el-input
  placeholder="請輸入Training對象"
  v-model="trainList.trainOwner">
</el-input>
  </div>
  <div style="display:flex;margin-top: 20px">
    <span class="title">要求段選擇:</span>
    <el-date-picker
      v-model="valueDate"
      type="daterange"
      range-separator="至"
      format="yyyy 年 MM 月 dd 日"
      value-format="yyyy-MM-dd"
      start-placeholder="开始日期"
      end-placeholder="结束日期">
    </el-date-picker>
  </div>
  <div style="display:flex;margin-top: 20px">
    <el-input
  type="textarea"
  autosize
  placeholder="請輸入要求明細"
  v-model="trainList.requiro">
</el-input>
  </div>
  <el-button  style="margin-top:20px" @click="addUser" type="primary">新增</el-button>
</el-dialog>
  </div>
</template>

<script>
/* eslint-disable */
import BasePagination from '@/components/base/basePagination'
import DataTable from '@/components/datatable'
import ImgCutter from 'vue-img-cutter'
import  {addTrainList,findTrainListInfo,deleteTrainList} from '../../api/trainList'
import {utc2beijing} from '../../utils/date'
import {mapGetters} from 'vuex'
// import {queryVacation} from '@/api/hr'
// import {dateFormat} from '@/utils/date'
export default {
  data () {
    return {
      imgUrl: '',
      dialogVisible: false,
      trainList: {
        title: '',
        requiro: '',
        guider: '',
        trainOwner: ''
      },
      valueDate: '',
      valueDay: '',
      // value: 'Te',
      dialogVisible: false,
      // 员工工号
      pictLoading: false,
      tableData: [],
      currentPage: 1,
      pageSize: 10,
      userNum: '',
      startDate: '',
      total: 0,
      endDate: '',
      tableBarList: [
        {label: '序號', width: '200px', type: 'index'},
        {property: 'username', label: '姓名'},
        {property: 'depart', label: '部門'},
        {property: 'createTime', label: '創建時間'},
        {property: 'auth', label: '權限'}
      ]
    }
  },
  computed: {
    ...mapGetters([
      'isLogin',
      'userInfo'
    ])
  },
  methods: {
    deleteItem (item) {
      let {_id} = item
      deleteTrainList({_id:_id,username: this.userInfo.username}).then(res => {
        if(res.data === 'error') {
          this.$message({
            message: '删除失败!',
            type: 'warning'
          })         
        }else if (res.data === 'ok') {
          this.$message({
            message: '删除成功!',
            type: 'success'
          })
          this._search()       
        }else{
          this.$message({
            message: '未知错误请联系管理员!',
            type: 'error'
          })        
        }
      }) 
    },
    addUser () {
      // console.log(this.userInfo)
      this.loading = true
      if (!this.isLogin) {
        this.$message({
          message: '請登錄!',
          type: 'warning'
        })
        this.dialogVisible = false
        return
      }
      if (!this.userInfo.username) {
        this.loading = false
        this.$message({
          message: '請輸入新增用戶名!',
          type: 'warning'
        })
      
      }
      else {     
        // const that = this
        addTrainList(Object.assign({},this.trainList,{creater: this.userInfo.username,trainDuring: this.valueDate[0] + ' ~ ' + this.valueDate[1] }) ).then(res => {
          this.loading = false
          if (!res.data) {
            this.$message({
              message: 'token过期请退出重新登录!',
              type: 'error'
            })
            this.dialogVisible = false
          } else if (res.data === 'exist') {
             this.$message({
              message: '此用戶名已存在!',
              type: 'warning'
            })
          }else {
            this.$message({
              message: '新增成功!',
              type: 'success'
            })
            this.dialogVisible = false
            this._search()
            // console.log(this.$store)
          }
        })
      }
    },

    _addItem () {
      this.dialogVisible = true
    },
    _search () {
      this.pictLoading = true
      findTrainListInfo(this.pageSize,this.currentPage,JSON.stringify(this.valueDay)).then(res =>{
        res.data.data.forEach(item => {
          item.createDate = utc2beijing(item.createDate)
        });
        this.tableData = res.data.data
        this.total = res.data.total
        this.pictLoading = false
      })
      // userInfo().then(res =>{
      //   res.data.forEach(item => {
      //     item.createTime = utc2beijing(item.createTime)
      //   });
      //   this.tableData = res.data
      //   this.pictLoading = false
      // })

    },
    _exportExcel () {
      const tHeader = ['工號', '姓名', '部門代碼', '部門名稱', '申請時間', '休假時數', '休假開始時間', '休假結束時間', '休假類別', '請假原因']
      const filterVal = ['userNo', 'userName', 'deptNo', 'deptName', 'applyDate', 'absenceHours', 'startTime', 'endTime', 'absenceName', 'reason']
      const tabelName = '休假記錄表'
      this.$refs.doorTable.exportExcel(tHeader, filterVal, tabelName)
    },
    handleSizeChange (size) {
      this.currentPage = 1
      this.pageSize = size
      this._search()
    },
    handleCurrentChange (index) {
      this.currentPage = index
      this._search()
    }
  },
  mounted () {
    this._search()
    console.log(this.isLogin)
  },
  components: {
    // DateAndTitle,
    BasePagination,
    DataTable,
    ImgCutter
  }

}
</script>

<style lang="scss" scoped>
.title {
  display: inline-block;
  height: 40px;
  line-height: 40px;
  color: #fff;
  width: 80px!important;
  text-align: center;
  font-size: 14px;
  padding: 0 5px;
  background: #409eff;
  // margin-left: 10px;
  border-top-left-radius: 4px;
  border-bottom-left-radius: 4px;
}
.idCon{
    display: inline-block;
    font-size: 0;
}
// 截图
.cropper-content {
    .cropper {
        width: auto;
        height: 300px;
    }
}
>>>.el-input__inner{
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
}
</style>
