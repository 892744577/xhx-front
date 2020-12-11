<template>
  <div class="home">
    <div class="header">
      <div class="search"><van-search left-icon v-model="search" placeholder="请输入搜索关键词"/></div>
      <div class="verticalBar"/>
      <div class="icon" @click="showQueryPopup"><div>筛选</div><van-icon name="filter-o" size="0.5rem"/></div>
    </div>
    <div class="body">
      <div v-for="(row,i) in listTemp">
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
          <van-button type="primary" @click="showSalePopup(row[0].ID)">卖出</van-button>
          <van-button type="warning" @click="showPayPopup(row[0].ID)">支出</van-button>
          <van-button type="danger" @click="showIncomePopup(row[0].ID)">回款</van-button>
        </div>
      </div>
      <div class="item-button"></div>
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
    <van-popup  v-model="dateShow1"
                position="bottom"
                :style="{ height: '40%' }"
                close-on-click-overlay>
      <van-datetime-picker
              v-model="saleInfo.sale_time"
              type="date"
              title="销售时间"
              :min-date="minDate"
              :max-date="maxDate"
              @confirm="setData()"
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
              :min-date="minDate"
              :max-date="maxDate"
              @confirm="setData()"
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
              :min-date="minDate"
              :max-date="maxDate"
              @confirm="setData()"
              @cancel="showDatePopup3(false)"
      />
    </van-popup>

    <!--记账弹窗-->
    <van-popup v-model="saleShow"
               position="bottom"
               :style="{ height: '90%' }">
      <van-cell-group>
        <div class="saleShow-header">销售</div>
      </van-cell-group>
      <van-cell-group>
          <van-field v-model="saleInfo.fee" type="digit" label="销售总价" />
      </van-cell-group>
      <van-cell-group>
          <van-field v-model="saleInfo.salor" label="销售人员" placeholder="请输入销售人员" />
      </van-cell-group>
      <van-cell-group>
        <van-field v-model="saleInfo.sale_time" label="销售时间" placeholder="请输入销售时间" @click="showDatePopup1(true)"/>
      </van-cell-group>
      <div class="saleShow-footer">
        <van-button type="primary" @click="showDatePopup1(false)">取消</van-button>
        <van-button type="danger" @click="showIncomePopup(row[0].ID)">保存</van-button>
      </div>

      <!--销售录入记录，一般只能录一次-->
    </van-popup>
    <van-popup v-model="payShow"
               position="bottom"
               :style="{ height: '90%' }">
      <van-cell-group>
        <van-field v-model="payInfo.fee" type="digit" label="支出费用" />
      </van-cell-group>
      <van-cell-group>
        <van-radio-group v-model="radio">
          <van-radio name="1">买货</van-radio>
          <van-radio name="2">人工</van-radio>
          <van-radio name="3">材料</van-radio>
          <van-radio name="4">杂项</van-radio>
        </van-radio-group>
      </van-cell-group>
      <van-cell-group>
        <van-field v-model="payInfo.pay_time" label="支出时间" placeholder="请输入支出时间" @click="showDatePopup2(true)"/>
      </van-cell-group>

      <!--支出录入记-->

    </van-popup>
    <van-popup v-model="incomeShow"
               position="bottom"
               :style="{ height: '90%' }">
      <van-cell-group>
        <van-field v-model="incomeInfo.fee" type="digit" label="回款" />
      </van-cell-group>
      <van-cell-group>
        <van-field v-model="incomeInfo.incomor" label="收款人" placeholder="请输入收款人" />
      </van-cell-group>
      <van-cell-group>
        <van-field v-model="incomeInfo.income_time" label="回款时间" placeholder="请输入收款时间" @click="showDatePopup3(true)"/>
      </van-cell-group>

      <!--回款录入记录-->
    </van-popup>
  </div>
</template>

<script>
import { postJson } from '@/utils/axios';
export default {
  name: 'home',
  data() {
    return {
        //查询
        search:'',
        queryShow:false,
        //卡片
        data:[],
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
            sale_time: new Date(),
        },
        dateShow1:false,
        //支出
        payShow:false,
        payInfo:{
            fee:0,
            pay_time: new Date(),
        },
        dateShow2:false,
        radio: '1',
        //回款
        incomeShow:false,
        incomeInfo:{
            fee:0,
            income_time: new Date(),
        },
        dateShow3:false,

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
                  search:'',
              },
              pageQuery: {
                  orderBy: " id desc ",
                  pageNum: this.currentPage,
                  pageSize: 10,
              }
          }).then((res)=>{
              this.data = res.data;
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

      //三大pupop
      showDatePopup1: function(dateShow){
          this.dateShow1 = dateShow;
      },
      showDatePopup2: function(dateShow){
          this.dateShow2 = dateShow;
      },
      showDatePopup3: function(dateShow){
          this.dateShow3 = dateShow;
      },
      showSalePopup: function(item){
          this.saleShow = true;
          this.order = item;
      },
      showPayPopup: function(item){
          this.payShow = true;
          this.order = item;
      },
      showIncomePopup: function(item){
          this.incomeShow = true;
          this.order = item;
      },

      //业务操作
      updateSale: async function(){
          await postJson("/order/update",{
              Barcode: this.order.Barcode,
              buyOut: this.buyOut
          });
          this.onSearch();
      },
      updatePay: async function(){
          await postJson("/order/update",{
              Barcode: this.order.Barcode,
              buyIn: this.buyIn
          });
          this.onSearch();
      },
      updateIncome: async function(){
          await postJson("/order/update",{
              Barcode: this.order.Barcode,
              buyIn: this.buyIn
          });
          this.onSearch();
      }
  },
  //计算属性
  computed: {
      listTemp: function () {
          let list = this.data;
          //格式：[[],[],[]...]
          let arrTemp = [];
          let index = 0;
          for (let i = 0; i < list.length; i++) {
              if (i == 0) {
                  arrTemp.push([]);
              }
              if (i > 0 && (list[i-1].ID != list[i].ID)) {
                  arrTemp.push([]);
              }
              console.info(arrTemp[arrTemp.length-1]);
              arrTemp[arrTemp.length-1].push(list[i]);
          }
          console.info(arrTemp)
          return arrTemp;
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
      height:1rem;
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
}

.saleShow-header{
  padding: 13px;
}
.saleShow-bottom{

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
