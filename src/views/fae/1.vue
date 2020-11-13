<template>
  <div class="invoice">
    <div class="excel">
      <h2>开发票申请单 V2.0</h2>
      <table border="1" cellpadding="0" cellspacing="0">
        <tr style="height: 40px">
          <td style="width: 220px;font-weight: 900" colspan="2">所属事业部名称:</td>
          <td style="width: 220px" colspan="2">{{invoce_data.business_name}}</td>
          <td style="width: 100px;font-weight: 900">部门编号:</td>
          <td style="width: 210px" colspan="2">100002</td>
          <td style="width: 210px;font-weight: 900">客户经理:</td>
          <td style="width: 210px" colspan="2">{{invoce_data.manager_name}}</td>
        </tr>
        <tr style="background: #00BFFF;font-weight: 900">
          <td style="width: 50px">序号</td>
          <td>发票抬头(客户公司)</td>
          <td>开票内容</td>
          <td>发票金额</td>
          <td>对应工作量月份</td>
          <td>预计回款时间</td>
          <td>对应项目名称</td>
          <td>发票类型</td>
          <td>税率</td>
          <td>备注</td>
        </tr>
        <tr  style="height: 40px">
          <td style="width: 50px">1</td>
          <td>{{invoce_data.invoice_rise}}</td>
          <td>{{invoce_data.content}}</td>
          <td></td>
          <td>{{invoce_data.month}}</td>
          <td></td>
          <td>{{invoce_data.project_name}}</td>
          <td>
            <p  v-for="(ele,index) in invoce_data.contract_type" :key="index">
              <span v-if="ele.status==false"><b style="display: inline-block;width: 12px;height: 12px;border: 1px solid #ccc;"></b> {{ele.name}}</span>
              <span v-if="ele.status==true" ><b style="display: inline-block;width: 14px;height: 14px;background: #000"></b> {{ele.name}}</span>
            </p>
          </td>
          <td>{{invoce_data.taxes}}%</td>
          <td></td>
        </tr>
        <tr>
          <td colspan="10">  </td>
        </tr>
        <tr  style="height: 30px">
          <td colspan="2" style="background: #00BFFF;font-weight: 900">发票抬头</td>
          <td colspan="5">{{invoce_data.invoice_rise}}</td>
        </tr>
        <tr  style="height: 30px">
          <td colspan="2" style="background: #00BFFF;font-weight: 900">纳税人识别号</td>
          <td colspan="5">{{invoce_data.identification_number}}</td>
        </tr>
        <tr  style="height: 30px">
          <td colspan="2" style="background: #00BFFF;font-weight: 900">客户方地址、电话</td>
          <td colspan="5">{{invoce_data.address_mobile}}</td>
        </tr>
        <tr  style="height: 30px">
          <td colspan="2" style="background: #00BFFF;font-weight: 900">开户行及账号</td>
          <td colspan="5">{{invoce_data.bank_account}}</td>
        </tr>
      </table>
    </div>
    <el-button @click="downloadExl(jsono)" style="margin: 10px 0;background: #b52636;color: #fff">导出</el-button>
    <router-view/>
  </div>
</template>

<script>
/* eslint-disable */
import XLSX from "xlsx-style"
  export default {
    data() {
      return {
          invoce_data:{},
          wopts:{ bookType: 'xlsx', bookSST: true, type: 'binary', cellStyles: true },
          jsono:[
            {
            "开发票申请单 V2.0": "所属事业部名称:", "列头2": "合并2", "列头3": "移动互联事业部", "列头4": '合并',"列头5": "部门编号:", "列头6": 10002,
              "列头7": "合并","列头8": "客户经理:","列头9": "张傲","列头10": "备注",
            },
          {
            "开发票申请单 V2.0": "序号", "列头2": "发票抬头（客户公司）", "列头3": "开票内容", "列头4": "发票金额", "列头5": "对应工作量月份", "列头6": "预计回款时间",
            "列头7": "对应项目名称","列头8": "发票类型","列头9": "税率","列头10": "备注",
          },
            {
             "开发票申请单 V2.0": "1", "列头2": "上海蔚来汽车有限公司", "列头3": "技术服务费", "列头4": "","列头5": "", "列头6": "",
              "列头7": "","列头8": "","列头9": "","列头10": "",
          },
            {
              "开发票申请单 V2.0": "", "列头2": "", "列头3": "", "列头4": "","列头5": "", "列头6": "",
              "列头7": "","列头8": "","列头9": "","列头10": "",
            },
            {
              "开发票申请单 V2.0": "发票抬头", "列头2": "", "列头3": "", "列头4": "","列头5": "", "列头6": "",
              "列头7": "","列头8": "","列头9": "","列头10": "",
            },
            {
              "开发票申请单 V2.0": "纳税人识别号", "列头2": "", "列头3": "", "列头4": "","列头5": "", "列头6": "",
              "列头7": "","列头8": "","列头9": "","列头10": "",
            },
            {
              "开发票申请单 V2.0": "客户方地址、电话", "列头2": "", "列头3": "", "列头4": "","列头5": "", "列头6": "",
              "列头7": "","列头8": "","列头9": "","列头10": "",
            },
            {
              "开发票申请单 V2.0": "开户行及账号", "列头2": "", "列头3": "", "列头4": "","列头5": "", "列头6": "",
              "列头7": "","列头8": "","列头9": "","列头10": "",
            }
          ]
      };
    },
    methods: {
      saveAs(obj,fileName){
        var tmpa = document.createElement("a");
        tmpa.download = fileName || "下载";
        tmpa.href = URL.createObjectURL(obj);
        tmpa.click();
        setTimeout(function () {
          URL.revokeObjectURL(obj);
        }, 100);
      },
      downloadExl(json, type){
        var tmpdata = json[0];
        json.unshift({});
        var keyMap = []; //获取keys
        for (var k in tmpdata) {
          keyMap.push(k);
          json[0][k] = k;
        }
        console.log(keyMap)
        console.log(json)
        var tmpdata = [];//用来保存转换好的json
        json.map((v, i) => keyMap.map((k, j) => Object.assign({}, {
          v: v[k],
          position: (j > 25 ? this.getCharCol(j) : String.fromCharCode(65 + j)) + (i + 1)
        }))).reduce((prev, next) => prev.concat(next)).forEach((v, i) => tmpdata[v.position] = {
          v: v.v
        });
        console.log(tmpdata)
        var outputPos = Object.keys(tmpdata); //设置区域,比如表格从A1到D10
        // console.log(tmpdata)
        tmpdata["!merges"] = [{
          s: { c: 0, r: 0 },//开始 A1
          e: { c: 9, r: 0 }//结束F1
        },
          {
            s: { c: 0, r: 1 },//开始 A2
            e: { c: 1, r: 1 }//结束B2
          },
          {
            s: { c: 2, r: 1 },//开始 C2
            e: { c:3, r: 1 },//结束D2
          },
          {
            s: { c: 5, r: 1 },//开始 F2
            e: { c:6, r: 1 }
          },
          {
            s: { c: 8, r: 1 },//开始 I2
            e: { c:9, r: 1 }
          },
          {
            s: { c:0, r:5 },//第六行
            e: { c:1, r:5 }
          },
          {
            s: { c:2, r:5 },//第六行
            e: { c:6, r:5 }
          },
          {
            s: { c:0, r:6 },//第七行
            e: { c:1, r:6 }
          },
          {
            s: { c:2, r:6 },//第七行
            e: { c:6, r:6 }
          },
          {
            s: { c:0, r:7 },//第八行
            e: { c:1, r:7 }
          },
          {
            s: { c:2, r:7 },//第八行
            e: { c:6, r:7 }
          },
          {
            s: { c:0, r:8 },//第九行
            e: { c:1, r:8 }
          },
          {
            s: { c:2, r:8 },//第九行
            e: { c:6, r:8 }
          },
        ];//合并单元格
//        边框样式
        let border = {bottom:{style:"thin",color:{rgb: "000000"}},top:{style:"thin",color:{rgb: "000000"}},
          left:{style:"thin",color:{rgb: "000000"}},right:{style:"thin",color:{rgb: "000000"}}};
        //加粗
        let style0 = {border:border, alignment:{horizontal:'center',wrapText: true ,vertical: "center"},font: { sz: 18, bold: true, color: { rgb: "000000" },outline:true } };
        let style1 = {border:border, alignment:{horizontal:'center',wrapText: true,vertical: "center"},font: { sz: 12, bold: true, color: { rgb: "000000" },outline:true } };
        //不加粗
        let style2 = {border:border, alignment:{horizontal:'center',wrapText: true,vertical: "center"},font: { sz: 12,  color: { rgb: "000000" },outline:true }  };
        //蓝底加粗
        let style3 = {border:border, alignment:{horizontal:'center',wrapText: true,vertical: "center"},font: { sz: 12, bold: true, color: { rgb: "000000" },outline:true }, fill: { fgColor: {rgb: "00BFFF" } } };
//        第一二行样式
        tmpdata["A1"].s = style0;
        tmpdata["A2"].s = style1;
        tmpdata["B2"].s = style2;
        tmpdata["C2"].s = style2;
        tmpdata["D2"].s = style2;
        tmpdata["E2"].s = style1;
        tmpdata["F2"].s = style2;
        tmpdata["G2"].s = style2;
        tmpdata["H2"].s = style1;
        tmpdata["I2"].s = style2;
        tmpdata["J2"].s = style2;
//第三行样式
        tmpdata["A3"].s = style3;
        tmpdata["B3"].s = style3;
        tmpdata["C3"].s = style3;
        tmpdata["D3"].s = style3;
        tmpdata["E3"].s = style3;
        tmpdata["F3"].s = style3;
        tmpdata["G3"].s = style3;
        tmpdata["H3"].s = style3;
        tmpdata["I3"].s = style3;
        tmpdata["J3"].s = style3;
//  第四行样式
        tmpdata["A4"].s = style2;
        tmpdata["B4"].s = style2;
        tmpdata["C4"].s = style2;
        tmpdata["D4"].s = style2;
        tmpdata["E4"].s = style2;
        tmpdata["F4"].s = style2;
        tmpdata["G4"].s = style2;
        tmpdata["H4"].s = style2;
        tmpdata["I4"].s = style2;
        tmpdata["J4"].s = style2;
//剩余行样式
        for(let i = 6;i<=9;i++){
          tmpdata["A"+i].s = style3;
          tmpdata["B"+i].s = style3;
          tmpdata["C"+i].s = style2;
          tmpdata["D"+i].s = style2;
          tmpdata["E"+i].s = style2;
          tmpdata["F"+i].s = style2;
          tmpdata["G"+i].s = style2;
        }

        tmpdata["!cols"]=[//设置列宽度
          {wpx: 50},//序号
          {wpx: 180},//发票抬头
          {wpx: 100},//开票内容
          {wpx: 100},//发票金额
          {wpx: 90},//对应工作量月份
          {wpx: 100},//预计回款时间
          {wpx: 100},//对应项目名称
          {wpx: 128},//发票类型
          {wpx: 100},//税率
          {wpx: 150},//备注
        ];
        tmpdata["!rows"]=[//设置行高度
          {hpt: 50},//序号
          {hpt: 150},//发票抬头
          {hpt: 100},//开票内容
          {hpt: 100},//发票金额

        ];
        var tmpWB = {
          SheetNames: ['发票申请单'], //保存的表标题
          Sheets: {
            '发票申请单': Object.assign({},
              tmpdata, //内容
              {
                '!ref': outputPos[0] + ':' + outputPos[outputPos.length - 1] //设置填充区域
              })
          }
        };
       var tmpDown = new Blob([this.s2ab(XLSX.write(tmpWB,
          { bookType: (type == undefined ? 'xlsx' : type), bookSST: false, type: 'binary' }//这里的数据是用来定义导出的格式类型
        ))], {
          type: ""
        });
        this.saveAs(tmpDown, this.invoce_data.project_name + '.' + (this.wopts.bookType == "biff2" ? "xls" : this.wopts.bookType))
      },
      getCharCol(n) {
          s = '',
          m = 0
        while (n > 0) {
          m = n % 26 + 1
          s = String.fromCharCode(m + 64) + s
          n = (n - m) / 26
        }
        return s
      },
      s2ab(s) {
        if (typeof ArrayBuffer !== 'undefined') {
          var buf = new ArrayBuffer(s.length);
          var view = new Uint8Array(buf);
          for (var i = 0; i != s.length; ++i) view[i] = s.charCodeAt(i) & 0xFF;
          return buf;
        } else {
          var buf = new Array(s.length);
          for (var i = 0; i != s.length; ++i) buf[i] = s.charCodeAt(i) & 0xFF;
          return buf;
        }
      }
    },
    created(){
        let id = this.$route.query.id;
        let status = this.$route.query.status;
        this.server_get("accounts/invoice",{id:id,status:status},data=>{
            if(data.data.status=='success'){
                this.invoce_data = data.data.result;
                let contract_type = this.invoce_data.contract_type;//处理发票类型
                let contract_type_str = "";
                contract_type.forEach(e=>{
                    if(e.status==false){
                      contract_type_str+="□ "+e.name
                    }else{
                      contract_type_str+="■ "+e.name
                    }
                });
                this.jsono[0]["列头3"] = this.invoce_data.business_name;//事业部
                this.jsono[0]["列头9"] = this.invoce_data.manager_name;//客户经理
                this.jsono[2]["列头2"] = this.invoce_data.invoice_rise;//公司抬头
                this.jsono[2]["列头3"] = this.invoce_data.content;//开票内容
                this.jsono[2]["列头5"] = this.invoce_data.month;//月份
                this.jsono[2]["列头6"] = this.invoce_data.business_code;//部门编号
                this.jsono[2]["列头7"] = this.invoce_data.project_name;//项目
                this.jsono[2]["列头8"] = contract_type_str;//发票类型
                this.jsono[2]["列头9"] = this.invoce_data.taxes+"%";//税率

                this.jsono[4]["列头3"] = this.invoce_data.invoice_rise;//发票抬头
                this.jsono[5]["列头3"] = this.invoce_data.identification_number;//纳税人识别号
                this.jsono[6]["列头3"] = this.invoce_data.address_mobile;//客户地址
                this.jsono[7]["列头3"] = this.invoce_data.bank_account;//开户方账号
            }
        });
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.invoice{
  .excel{
    width: 1200px;
    overflow: auto;
    h2{
      width: 1200px;
      text-align: center;
    }
   table{
     td{
       text-align: center;
     }
   }
  }
}
</style>
