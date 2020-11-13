<template>
  <div>
  <div style="display:flex;justify-content: space-between;margin-bottom:10px">
  <div style="display:flex">
    <span class="title" style="margin-left: 20px;">日期 :</span>
    <el-date-picker
      v-model="valueDate"
      type="daterange"
      range-separator="至"
      format="yyyy 年 MM 月 dd 日"
      value-format="yyyy-MM-dd 00:mm:ss"
      start-placeholder="开始日期"
      end-placeholder="结束日期">
    </el-date-picker>
  </div>
   <div>

  <el-button class="exportExcel"  @click="_exportExcel" style="margin-right: 20px;text-align:right;background:#77A1D3"  type="primary" icon="el-icon-download">導出Excel</el-button>
  <el-button class="exportExcel" @click="_addItem" style="margin-right: 20px;text-align:right;background:#20BDFF"  type="primary" icon="el-icon-plus">新增Training項目</el-button>
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
    <!-- title ,status  ,summarize , imgStart, imgStartDes, imgDoing, imgDoingDes, imgEnd, imgEndDes, trainUser, completionTime,  guider, createUser ,createDate -->
    <el-table-column
    align="center"
      property="title"
      width="100px"
      label="課題"
     >
    </el-table-column>
    <el-table-column
     align="center"
      property="status"
      label="狀態"
   >
   </el-table-column>
    <el-table-column
     align="center"
      property="machineNum"
      label="機種"
   >
   </el-table-column>
    <el-table-column
     align="center"
      property="summarize"
      width="100px"
      label="概要"
   ></el-table-column>

    <el-table-column
     align="center"
      property="imgStart"
      label="初始圖"
   >
    <template   slot-scope="scope">
      <el-image v-if="scope.row.imgStart"  min-width="70" height="70" :src="scope.row.imgStart" :preview-src-list="[scope.row.imgStart]"></el-image>
    <!-- <img v-if="scope.row.imgStart" :src="scope.row.imgStart"    /> -->
    </template>
   </el-table-column>
    <el-table-column
     align="center"
    width="100px"
      property="imgStartDes"
      label="初始圖說明"
   ></el-table-column>
    <el-table-column
     align="center"
      property="imgDoing"
      label="過程圖"
   >
    <template   slot-scope="scope">
    <el-image v-if="scope.row.imgStart"  min-width="70" height="70" :src="scope.row.imgDoing" :preview-src-list="[scope.row.imgDoing]"></el-image>
        </template>
   </el-table-column>
    <el-table-column
     align="center"
    width="100px"
      property="imgDoingDes"
      label="過程圖說明"
   ></el-table-column>
    <el-table-column
      property="imgEnd"
      label="完成圖"
   >
    <template   slot-scope="scope">
<el-image v-if="scope.row.imgStart"  min-width="70" height="70" :src="scope.row.imgEnd" :preview-src-list="[scope.row.imgEnd]"></el-image>
        </template>
   </el-table-column>
    <el-table-column
  width="100px"
      property="imgEndDes"
      label="完成圖說明"
   ></el-table-column>
    <el-table-column
      property="trainUser"
      label="受訓人"
   ></el-table-column>
    <el-table-column
    width="100px"
      property="completionTime"
      label="完成時間"
   ></el-table-column>
    <el-table-column
      property="guider"
      label="導師"
   >
    </el-table-column>
    <el-table-column
      property="createUser"
      label="上傳人員"
   >
    </el-table-column>
    <el-table-column
    align="center"
     width="100px"
      property="createTime"
      label="創建時間"
   >
    </el-table-column>
      <el-table-column
      fixed="right"
      label="操作"
      width="100">
      <template slot-scope="scope">
        <el-popconfirm
         v-show="userInfo.username === scope.row.username || userInfo.username === 'root'"
        @confirm="handleClick(scope.row)"
  title="这是一段内容确定删除吗？"
>
  <el-button  type="text" size="small" slot="reference">删除</el-button>
</el-popconfirm>
      </template>
    </el-table-column>
  </el-table>
  <BasePagination v-if="tableData.length" @handleCurrentChange="handleCurrentChange" @handleSizeChange="handleSizeChange" :total="total"/>
  <el-dialog
  title="training詳情表"
  :close-on-click-modal="false"
  :visible.sync="dialogVisible"
  width="1200px"
  >
  <div style="display:flex;justify-content:space-around">
    <div>
  <div style="margin-top: 10px">
    <span class="title">標題:</span><el-input  v-model="training.title" style="width: 220px"></el-input>
  </div>
  <div style="margin-top: 10px">
    <span class="title">狀態:</span><el-select v-model="training.status" placeholder="请选择">
    <el-option
      v-for="item in statusOptions"
      :key="item.value"
      :label="item.label"
      :value="item.value">
    </el-option>
  </el-select>
  </div>
  <div style="margin-top: 10px">
    <span class="title">機種:</span><el-input v-model="training.machineNum" style="width: 220px"></el-input>
  </div>
  <div style="margin-top: 10px">
    <span class="title">概要:</span><el-input v-model="training.summarize" style="width: 220px"></el-input>
  </div>
    <div style="display:flex;margin-top:10px">
    <span class="title">受訓人:</span><el-input style="width: 220px" v-model="training.trainUser"></el-input>
  </div>
    <div style="display:flex;margin-top:10px">
    <span class="title">導師:</span><el-input style="width: 220px" v-model="training.guider"></el-input>
  </div>
  <div style="display:flex;margin-top:10px">

  <span class="title" >完成時間 :</span><el-date-picker
      v-model="training.completionTime"
      type="datetime"
      placeholder="选择日期时间">
    </el-date-picker>
  </div>
    </div>
    <div>
      <div style="margin-top: 10px;text-align:center">
      <ImgCutter rate="1:1" v-on:cutDown="cutDown" label="點擊上傳初始圖"></ImgCutter>
      <img style="margin-top: 20px" :src="imgUrl1" width="200px" height="200px" alt="選擇初始圖">
      <div style="margin-top: 10px">
      <el-input placeholder="初始圖說明" v-model="training.imgStartDes" style="width: 220px"></el-input>
      </div>
      </div>
    </div>
    <div>
      <div style="margin-top: 10px;text-align:center" >
      <ImgCutter  rate="1:1"  v-on:cutDown="cutDown1" label="點擊上傳過程圖"></ImgCutter>
      <img style="margin-top: 20px" :src="imgUrl2" width="200px" height="200px" alt="過程圖">
      <div style="display:flex;margin-top:10px">
    <el-input placeholder="過程圖說明" style="width: 220px" v-model="training.imgDoingDes"></el-input>
  </div>
      </div>
    </div>
    <div>
      <div style="margin-top: 10px;text-align:center" >
      <ImgCutter  rate="1:1"  v-on:cutDown="cutDown2" label="點擊上傳完成圖"></ImgCutter>
      <img style="margin-top: 20px" :src="imgUrl3" width="200px" height="200px" alt="完成圖">
      <div style="display:flex;margin-top:10px">
    <el-input placeholder="完成圖說明"  style="width: 220px" v-model="training.imgEndDes"></el-input>
  </div>
      </div>
    </div>
  </div>
  <div>
  </div>
  <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="uploadIssueInfo">确 定</el-button>
  </span>
</el-dialog>
  </div>
</template>

<script>
/* eslint-disable */
import BasePagination from '@/components/base/basePagination'
import DataTable from '@/components/datatable'
import ImgCutter from 'vue-img-cutter'
import {uploadImage} from '../../api/upload'
// import{ addIssue, findIssueInfo, deleteIssue} from '../../api/issue'
import { addTraining, findTraingInfo, deleteTraining,findTraingInfoAll , updateTraining} from '../../api/training'
import {utc2beijing} from '../../utils/date'
import table2excel from 'js-table2excel'
import {mapState, mapGetters} from 'vuex'
import { findTrainListInfo } from '../../api/trainList'
export default {
  data () {
    return {
      imgUrl1: '',
      imgUrl2: '',
      imgUrl3: '',
      dialogVisible: false,
      // title ,status  ,summarize , imgStart, imgStartDes, imgDoing, imgDoingDes, imgEnd, imgEndDes, trainUser, completionTime,  guider, createUser ,createDate
      training: {
        title: '',
        status: 'waiting',
        machineNum: '',
        summarize: '',
        imgStart: '1.png',
        imgStartDes: '',
        imgDoing: '1.png',
        imgDoingDes: '',
        imgEnd: '1.png',
        imgEndDes: '',
        trainUser: '',
        completionTime: '',
        guider: ''
      },
      valueDate: '',
      value: '',
      dialogVisible: false,
      coverVal: '',
      statusOptions: [
        {
          label: 'waiting',
          value: 'waiting'
        },
        {
          label: 'doing',
          value: 'doing'
        },
        {
          label: 'completion',
          value: 'completion'
        }
      ],
      coverOptions: [
        {
          label: '可Cover',
          value: 'normalleave'
        },
        {
          label: '不可Cover',
          value: 'errorleave'
        }
      ],
      // 员工工号
      pictLoading: false,
      tableData: [],
      currentPage: 1,
      pageSize: 10,
      userNum: '',
      startDate: '',
      total: 0,
      endDate: '',
      pickerOptionsStart: {
        disabledDate (time) {
          if (!time) {
            return ''
          }
          return time.getTime() > Date.now()
        }
      },
      pickerOptionsEnd: {
        disabledDate (time) {
          if (!time) {
            return ''
          }
          return time.getTime() > Date.now()
        }
      }
    }
  },
  methods: {
    handleClick (item) {
     
      let {_id} = item
       deleteTraining({_id:_id,createUser: this.userInfo.username}).then(res => {
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
    uploadIssueInfo () {
       if (this.isLogin) {
         addTraining(Object.assign({},this.training, {createUser: this.userInfo.username})).then(res => {
            if (!res.data) {
              this.$message({
                message: 'token过期，请重新登录',
                type: 'warning'
              })
              this.dialogVisible = false
            }else{
              if (res.data === 'no_exist') {
                this.$message({
                  message: '用户名不存在',
                  type: 'warning'
                })       
              }else {
                this.$message({
                  message: '上傳成功!',
                  type: 'success'
                })
                this.dialogVisible = false
                this._search()        
              }

            }
          }).catch(err=>{
            console.log(err)
          })
       } else {
        this.$message({
          message: '请登录',
          type: 'warning'
        })
       }

    },
    cutDown (data) {
      // console.log(data)
      let fd = new FormData()
      fd.append("image", data.blob);
      // console.log(fd)
      // fd.append("originalname", data.fileName)
       let that = this
      uploadImage(fd).then(res=> {
        that.training.imgStart=res.data.url
      })
      this.imgUrl1 =  data.dataURL
    },
    cutDown1 (data) {
      // console.log(data)
      let fd = new FormData()
      fd.append("image", data.blob);
      // console.log(fd)
      // fd.append("originalname", data.fileName)
       let that = this
      uploadImage(fd).then(res=> {
        that.training.imgDoing=res.data.url
      })
      this.imgUrl2 =  data.dataURL
    },
    cutDown2 (data) {
      // console.log(data)
      let fd = new FormData()
      fd.append("image", data.blob);
      // console.log(fd)
      // fd.append("originalname", data.fileName)
       let that = this
      uploadImage(fd).then(res=> {
        that.training.imgEnd =res.data.url
      })
      this.imgUrl3 =  data.dataURL
    },
    _addItem () {
      this.dialogVisible = true
    },
    changeStart () {
      if (this.startDate === '' || this.startDate === null) {
        this.endDate = ''
        return
      }
      const that = this
      this.pickerOptionsEnd = {
        disabledDate (time) {
          if (that.startDate === '' || that.startDate === null) {
            return
          }
          return time.getTime() > that.startDate.getTime() + 3600 * 1000 * 24 * 150 || time.getTime() < that.startDate.getTime()
        }
      }
    },
    _search () {
      this.pictLoading = true
      findTraingInfo(this.pageSize,this.currentPage,JSON.stringify(this.valueDate)).then(res =>{
        console.log(res)
        res.data.data.forEach(item => {
          item.completionTime = utc2beijing(item.completionTime)
          item.createTime = utc2beijing(item.createTime)
        });
        this.tableData = res.data.data
        console.log(res.data)
        this.total = res.data.total
        this.pictLoading = false
      })
    },
    _exportExcel () {
      
      findTraingInfoAll(JSON.stringify(this.valueDate)).then(res=> {
        
        res.data.data.forEach(item => {
          // item.happenDate = utc2beijing(item.happenDate)
          item.createTime = utc2beijing(item.createTime)
          item.completionTime = utc2beijing(item.completionTime)
        });
      // title ,status  ,machineNum，summarize , imgStart, imgStartDes, imgDoing, imgDoingDes, imgEnd, imgEndDes, trainUser, completionTime,  guider, createUser ,createDate
      const column = [
        {title: '項目', key: 'title', type: 'text'},
        {title: '完成狀態', key: 'status', type: 'text'},
        {title: '機種', key: 'machineNum', type: 'text'},
        {title: '概要', key: 'summarize', type: 'text'},
        {title: '初始圖', key: 'imgStart', type: 'image',width: 200,height: 200},
        {title: '初始圖說明', key: 'imgStartDes', type: 'text'},
        {title: '過程圖', key: 'imgDoing', type: 'image',width: 200,height: 200},
        {title: '過程圖說明', key: 'imgDoingDes', type: 'text'},
        {title: '結果圖', key: 'imgEnd', type: 'image',width: 200,height: 200},
        {title: '結果圖說明', key: 'imgEndDes', type: 'text'},
        {title: '受訓人', key: 'trainUser', type: 'text'},
        {title: '完成時間', key: 'completionTime', type: 'text'},
        {title: '導師', key: 'guider', type: 'text'},
        {title: '創建時間', key: 'createTime', type: 'text'}
      ]
        const tabelName = this.valueDate.length > 1 ? `培訓完成表 ${this.valueDate[0].substring(0,10)}-${this.valueDate[1].substring(0,10)}` :'培訓完成表'
          // 下载excel选中表单内容
      if (this.tableData.length) {
        table2excel(column, res.data.data, tabelName)
      } else {
        this.$message({
          message: 'Please select at least one item',
          type: 'warning'
        })
      }
      })

      

    },
    handleSizeChange (size) {
      this.currentPage = 1
      this.pageSize = size
      this._search()
    },
    handleCurrentChange (index) {
      this.currentPage = index
      this._search()
    },
  },
  mounted() {
    this._search()
  },
  computed: {
    ...mapState({
      isLogin: state => state.isLogin
    }),
    ...mapGetters([
      'userInfo'
    ])
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
  width: 100px;
  text-align: center;
  font-size: 12px;
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

