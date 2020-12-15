<template>
  <div class="home">
    <div class="header">
      <div class="search"><van-search left-icon v-model="search" placeholder="请输入单据编号/地址等关键词" @blur="onSearch()"/></div>
      <div class="verticalBar"/>
      <div class="icon" @click="showQueryPopup"><div>筛选</div><van-icon name="filter-o" size="0.5rem"/></div>
    </div>
    <div class="body">
      <div v-for="(row,i) in orderListTemp">
        <div class="item-header">
          <div>单据编号：{{row[0].ID}}</div>
        </div>
        <div class="item-content" >
            <div v-for="(item,j) in row" @click="showItemPopup(item)">
              <van-row>
                <van-col span="15"><div>产品条码：{{item.Barcode}}</div></van-col>
                <van-col span="9"><div>数量：{{item.Quantity}}{{item.Unit}}</div></van-col>
              </van-row>
              <div>单据日期：{{item.SO_DealDate}}</div>
              <div>网上订单单号：{{item.SO_ClientOrderID}}</div>
              <!--<div>客户姓名：{{item.Ct_Name}}</div>-->
              <div>产品名称：{{item.Pt_Name}}</div>
              <div>别称：{{item.BillSpecPara01}}</div>
              <div>客户地址：{{item.Jc_Name}}</div>
              <van-row>
                <van-col span="8"><div>长：{{item.BillSpecPara02}}</div></van-col>
                <van-col span="8"><div>高：{{item.BillSpecPara03}}</div></van-col>
                <van-col span="8"><div>宽：{{item.BillSpecPara05}}</div></van-col>
              </van-row>
              <van-row>
                <van-col span="8"><div>墙厚：{{item.BillSpecPara08}}</div></van-col>
                <van-col span="8"><div>扇数：{{item.BillSpecPara09}}</div></van-col>
                <van-col span="8"><div>终端：{{item.BillSpecPara12}}</div></van-col>
              </van-row>
              <van-row>
                <van-col span="8"><div>型号：{{item.BillSpecPara15}}</div></van-col>
                <van-col span="8"><div>颜色：{{item.BillSpecPara16}}</div></van-col>
              </van-row>
                <van-divider
                        :style="{ color: '#1989fa', borderColor: '#1989fa'}"
                        v-if="(row.length-1)!=j"
                />
            </div>
        </div>
        <div class="item-button">
          <van-button type="primary" @click="showSalePopup(row[0])">卖出</van-button>
          <van-button type="warning" @click="showPayPopup(row[0])">支出</van-button>
          <van-button type="danger" @click="showIncomePopup(row[0])">回款</van-button>
        </div>
      </div>
    </div>
      <div class="space"></div>
    <div class="pagination">
      <van-pagination
              v-model="currentPage"
              :total-items="total"
              :show-page-size="4"
              force-ellipses
              @change="onSearch"
      >
        <template #prev-text>
          <van-icon name="arrow-left" />
        </template>
        <template #next-text>
          <van-icon name="arrow" />
        </template>
      </van-pagination>
    </div>
    <van-popup v-model="queryShow"
               position="right"
               :style="{ width: '70%',height: '100%' }"
               close-on-click-overlay>
    </van-popup>
    <van-popup v-model="itemShow"
               position="bottom"
               :style="{ height: '70%' }"
               close-on-click-overlay>
      <div>
        <van-divider>产品规格</van-divider>
        <div class="attrItem">{{order.Spec}}</div>
        <van-divider>产品主规格</van-divider>
        <div class="attrItem">{{order.SpecMain}}</div>
        <van-divider>产品辅规格</van-divider>
        <div class="attrItem">{{order.SpecSubsidiary}}</div>
      </div>
    </van-popup>

    <!--日期弹窗-->
    <van-popup  v-model="dateShow1"
                position="bottom"
                :style="{ height: '40%' }"
                close-on-click-overlay>
      <van-datetime-picker
              v-model="saleInfo.sale_time"
              type="date"
              title="销售时间"
              @confirm="showDatePopup1(false)"
              @cancel="showDatePopup1(false)"
      />
    </van-popup>
    <van-popup  v-model="dateShow2"
                position="bottom"
                :style="{ height: '40%' }"
                close-on-click-overlay>
      <van-datetime-picker
              v-model="payInfo.pay_time"
              type="date"
              title="支出时间"
              @confirm="showDatePopup1(false)"
              @cancel="showDatePopup2(false)"
      />
    </van-popup>
    <van-popup  v-model="dateShow3"
                position="bottom"
                :style="{ height: '40%' }"
                close-on-click-overlay>
      <van-datetime-picker
              v-model="incomeInfo.income_time"
              type="date"
              title="回款时间"
              @confirm="showDatePopup1(false)"
              @cancel="showDatePopup3(false)"
      />
    </van-popup>

    <!--记账弹窗-->
    <van-popup v-model="saleShow"
               position="bottom"
               :style="{ height: '90%' }">
      <van-cell-group>
        <div class="record-header">卖出记账</div>
      </van-cell-group>
      <van-cell-group>
          <van-field v-model="saleInfo.fee" type="digit" label="销售总价" />
      </van-cell-group>
      <van-cell-group>
          <van-field v-model="saleInfo.salor" label="销售人员" placeholder="请输入销售人员" />
      </van-cell-group>
      <van-cell-group>
        <van-field v-model="sale_time_show"
                   label="销售时间"
                   placeholder="请输入销售时间"
                   @click="showDatePopup1(true)"
                   />
      </van-cell-group>
      <div class="record-footer">
        <van-button type="primary" @click="showSalePopup(false)">取消</van-button>
        <van-button type="danger" @click="saveSale()">保存</van-button>
      </div>
      <div class="recordTable">
        <div class="recordRow">
          <div class="recordCell">费用</div>
          <div class="recordCell">销售人</div>
          <div class="recordCell">时间</div>
        </div>
        <div class="recordRow" v-for="(item,k) in saleListTemp" :key="k">
          <div class="recordCell">{{item.fee}}</div>
          <div class="recordCell">{{item.salor}}</div>
          <div class="recordCell">{{item.sale_time}}</div>
        </div>
      </div>
    </van-popup>
    <van-popup v-model="payShow"
               position="bottom"
               :style="{ height: '90%' }">
      <van-cell-group>
        <div class="record-header">支出记账</div>
      </van-cell-group>
      <van-cell-group>
        <van-field v-model="payInfo.fee" type="digit" label="支出费用" />
      </van-cell-group>
      <van-cell-group>
        <van-radio-group v-model="payInfo.fee_type" class="radio-group">
          <van-radio name="1">买货</van-radio>
          <van-radio name="2">人工</van-radio>
          <van-radio name="3">材料</van-radio>
          <van-radio name="4">杂项</van-radio>
        </van-radio-group>
      </van-cell-group>
      <van-cell-group>
        <van-field v-model="pay_time_show"
                   label="支出时间"
                   placeholder="请输入支出时间"
                   @click="showDatePopup2(true)"/>
      </van-cell-group>
      <div class="record-footer">
        <van-button type="primary" @click="showPayPopup(false)">取消</van-button>
        <van-button type="danger" @click="savePay()">保存</van-button>
      </div>
      <div class="recordTable">
        <div class="recordRow">
          <div class="recordCell">费用</div>
          <div class="recordCell">支出类型</div>
          <div class="recordCell">时间</div>
        </div>
        <div class="recordRow" v-for="(item,k) in payListTemp" :key="k">
          <div class="recordCell">{{item.fee}}</div>
          <div class="recordCell">{{item.fee_type}}</div>
          <div class="recordCell">{{item.pay_time}}</div>
        </div>
      </div>
    </van-popup>
    <van-popup v-model="incomeShow"
               position="bottom"
               :style="{ height: '90%' }">
      <van-cell-group>
        <div class="record-header">回款记账</div>
      </van-cell-group>
      <van-cell-group>
        <van-field v-model="incomeInfo.fee" type="digit" label="回款" />
      </van-cell-group>
      <van-cell-group>
        <van-radio-group v-model="incomeInfo.fee_type" class="radio-group">
          <van-radio name="1">定金</van-radio>
          <van-radio name="2">尾款</van-radio>
        </van-radio-group>
      </van-cell-group>
      <van-cell-group>
        <van-field v-model="incomeInfo.incomor" label="收款人" placeholder="请输入收款人" />
      </van-cell-group>
      <van-cell-group>
        <van-field v-model="income_time_show" label="回款时间" placeholder="请输入收款时间" @click="showDatePopup3(true)"/>
      </van-cell-group>
      <div class="record-footer">
        <van-button type="primary" @click="showIncomePopup(false)">取消</van-button>
        <van-button type="danger" @click="saveIncome()">保存</van-button>
      </div>
      <div class="recordTable">
        <div class="recordRow">
          <div class="recordCell">费用</div>
          <div class="recordCell">回款类型</div>
          <div class="recordCell">回款人</div>
          <div class="recordCell">时间</div>
        </div>
        <div class="recordRow" v-for="(item,k) in incomeListTemp" :key="k">
          <div class="recordCell">{{item.fee}}</div>
          <div class="recordCell">{{item.fee_type}}</div>
          <div class="recordCell">{{item.incomor}}</div>
          <div class="recordCell">{{item.income_time}}</div>
        </div>
      </div>
    </van-popup>
  </div>
</template>

<script>
import { postJson } from '@/utils/axios';
import moment from 'moment';
import { Dialog } from 'vant';
export default {
  name: 'home',
  data() {
    return {
        //查询
        search:'',
        queryShow:false,
        //卡片
        orderList:[],
        order:{},
        itemShow:false,
        //分页
        currentPage: 1,
        total:125,
        /*
        ======================
         */
        //卖出
        saleShow:false,
        saleInfo:{
            fee:0,
            salor:'',
            sale_time: new Date(),
        },
        dateShow1:false,
        saleList:[],
        //支出
        payShow:false,
        payInfo:{
            fee:0,
            fee_type: '1',
            pay_time: new Date(),
        },
        dateShow2:false,
        radio: '1',
        payList:[],
        //回款
        incomeShow:false,
        incomeInfo:{
            fee:0,
            fee_type:'1',
            incomor:'',
            income_time: new Date(),
        },
        dateShow3:false,
        incomeList:[],
    }
  },
  //生命周期函数
  created() {
      this.onSearch();
  },
  //方法
  methods: {
      onSearch: function(){
          postJson("/order/query",{
              data: {
                  search:this.search,
              },
              pageQuery: {
                  orderBy: " id desc ",
                  pageNum: this.currentPage,
                  pageSize: 10,
              }
          }).then((res)=>{
              this.orderList = res.data;
              this.total = res.extra.total;
          })
      },
      showQueryPopup: function(){
          this.queryShow = true;
      },
      showItemPopup: function(item){
        this.itemShow = true;
        this.order = item;
      },

      //时间组件pupop
      showDatePopup1: function(dateShow){
          this.dateShow1 = dateShow;
      },
      showDatePopup2: function(dateShow){
          this.dateShow2 = dateShow;
      },
      showDatePopup3: function(dateShow){
          this.dateShow3 = dateShow;
      },

      //记账popup
      showSalePopup: async function(item){
          this.saleShow = true;
          this.order = item;
          this.querySale();
      },
      showPayPopup: async function(item){
          this.payShow = true;
          this.order = item;
          this.queryPay();
      },
      showIncomePopup: function(item){
          this.incomeShow = true;
          this.order = item;
          this.queryIncome();
      },

      //业务操作：账目查询和保存
      querySale: async function(){
          let res = await postJson("/sale/query",{
              data:{
                  "order_id":this.order.ID
              },
              pageQuery: {
                  orderBy: " id desc ",
                  pageNum: 1,
                  pageSize: 100,
              }
          });
          this.saleList = res.data;
      },
      saveSale: async function(){
          Dialog.confirm({
              title: '保存销售记录',
              message: '是否保存',
          }).then(async () => {
              await postJson("/sale/save",Object.assign(this.saleInfo,{order_id:this.order.ID}));
              this.querySale();
          });
      },
      queryPay: async function(){
          let res = await postJson("/pay/query",{
              data:{
                  "order_id":this.order.ID
              },
              pageQuery: {
                  orderBy: " id desc ",
                  pageNum: 1,
                  pageSize: 100,
              }
          });
          this.payList = res.data;
      },
      savePay: async function(){
          await postJson("/pay/save",Object.assign(this.payInfo,{order_id:this.order.ID}));
          this.queryPay();
      },
      queryIncome: async function(){
          let res = await postJson("/income/query",{
              data:{
                  "order_id":this.order.ID
              },
              pageQuery: {
                  orderBy: " id desc ",
                  pageNum: 1,
                  pageSize: 100,
              }
          });
          this.incomeList = res.data;
      },
      saveIncome: async function(){
          await postJson("/income/save",Object.assign(this.incomeInfo,{order_id:this.order.ID}));
          this.queryIncome();
      }
  },
  //计算属性
  computed: {
      //list集合处理
      orderListTemp: function () {
          let list = this.orderList;
          //格式：[[],[],[]...]
          let arrTemp = [];
          let index = 0;
          for (let i = 0; i < list.length; i++) {
              //指定文字加粗
              let item = list[i];
              if(item.Jc_Name != null && item.Jc_Name != ''){

              }
              //转换格式
              if (i == 0) {
                  arrTemp.push([]);
              }
              if (i > 0 && (list[i-1].ID != list[i].ID)) {
                  arrTemp.push([]);
              }
              arrTemp[arrTemp.length-1].push(item);
          }
          return arrTemp;
      },
      saleListTemp: function (){
          let list = this.saleList;
          return list.map((item)=>{
              return Object.assign(item,{"sale_time": moment(item.sale_time).format('YYYY-MM-DD')})
          })
      },
      payListTemp: function (){
          let list = this.payList;
          return list.map((item)=>{
              let fee_type;
              //类型翻译
              if(item.fee_type == '1'){
                  fee_type="买货";
              }else if(item.fee_type == '2'){
                  fee_type="人工";
              }else if(item.fee_type == '3'){
                  fee_type="材料";
              }else if(item.fee_type == '4'){
                  fee_type="杂项";
              }
              return Object.assign(item,{"fee_type":fee_type,"pay_time": moment(item.pay_time).format('YYYY-MM-DD')})
          })
      },
      incomeListTemp: function (){
          let list = this.incomeList;
          return list.map((item)=>{
              let fee_type;
              //类型翻译
              if(item.fee_type == '1'){
                  fee_type="定金";
              }else if(item.fee_type == '2'){
                  fee_type="尾款";
              }
              return Object.assign(item,{"fee_type":fee_type,"income_time": moment(item.income_time).format('YYYY-MM-DD')})
          })
      },
      //日期组件显示
      sale_time_show: function (){
          return moment(this.saleInfo.sale_time).format('YYYY-MM-DD')
      },
      pay_time_show: function (){
          return moment(this.payInfo.pay_time).format('YYYY-MM-DD')
      },
      income_time_show: function (){
          return moment(this.incomeInfo.income_time).format('YYYY-MM-DD')
      }
  },
  //组件
  components: {}
}
</script>

<style lang='scss' scoped>
.home {
  width: 100vw;
  background: linear-gradient(-45deg, #f037c9, #b535be, #9538ff, rgb(85, 181, 237));
  animation: gradientBG 15s ease infinite;
  background-size: 100% 100%;
  color: black;
  .header{
    width: 100vw;
    background-color: white;
    display: flex;
    justify-content: space-around;
    align-items: center;
    .search{
      width: 79vw;
    }
    .verticalBar {
      width: 0.5px;
      height: 56%;
      background: black;
      display: inline-block;
      vertical-align: top;
      opacity: 0.5;
    }
    .icon{
      display: flex;
      justify-content: center;
      width: 19vw;
      color: #161616;
      background-color: white;
    }
  }
  .body{
    .item-header{
      margin: 20px 5vw 0px 5vw;
      border-radius: 10px 10px 0px 0px;
      padding: 10px;
      background-color: #8654fb;
    }
    .item-content{
      border-width: 1px;
      margin: 0px 5vw;
      padding: 10px;
      background-color: white;
      .lhw{
        display: flex;
        justify-content: flex-start;
        div{
          width: 25%;
        }
      }
    }
    .item-button{
      .van-button{
        width: 100%;
      }
      margin: 0px 5vw;
      border-width:1px;
      display: flex;
      justify-content: center;
    }
  }
    .space{
        height: 20vh;
    }
  .pagination{
    position: fixed;
    margin:auto;
    left:0;
    right:0;
    bottom: 10vh;
    padding: 0 16px;
  }
  .attrItem{
    margin:10px;
  }


  .record-header{
    text-align: center;
    padding: 13px;
  }
  .radio-group{
    padding: 0.26667rem 0.42667rem;
  }
  .record-footer{
    .van-button{
      width: 100%;
    }
    display: flex;
    justify-content: center;
  }
  .recordTable{
    .recordRow{
      .recordCell{
        width: 100%;
      }
      padding: 10px ;
      text-align: center;
      display: flex;
      justify-content: center;
    }
  }

}





@keyframes gradientBG{
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}
</style>
