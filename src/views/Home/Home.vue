<template>
  <div class="home">
    <div class="header">
      <div class="search"><van-search left-icon v-model="search" placeholder="请输入搜索关键词"/></div>
      <div class="verticalBar"/>
      <div class="icon" @click="showQueryPopup"><div>筛选</div><van-icon name="filter-o" size="0.5rem"/></div>
    </div>
    <div class="body">
      <div v-for="item in data">
        <div class="item-header">
          <div>产品条码：{{item.Barcode}}</div>
        </div>
        <div class="item-content" @click="showItemPopup(item)">
          <div>数量：{{item.Quantity}}{{item.Unit}}</div>
          <div>单据编号：{{item.ID}}</div>
          <div>单据日期：{{item.SO_DealDate}}</div>
          <div>网上订单单号：{{item.SO_ClientOrderID}}</div>
          <div>客户姓名：{{item.Ct_Name}}</div>
          <div>产品名称：{{item.Pt_Name}}</div>
          <div>客户地址：{{item.Jc_Name}}</div>
          <div>别称：{{item.BillSpecPara01}}</div>
          <div class="lhw">
            <div>长：{{item.BillSpecPara02}}</div>
            <div>高：{{item.BillSpecPara03}}</div>
            <div>宽：{{item.BillSpecPara05}}</div>
            <div>墙厚：{{item.BillSpecPara08}}</div>
          </div>
          <div>扇数：{{item.BillSpecPara09}}</div>
          <div>终端：{{item.BillSpecPara12}}</div>
          <div>型号：{{item.BillSpecPara15}}</div>
          <div>颜色：{{item.BillSpecPara16}}</div>
          <div>卖出：{{item.buyOut}}</div>
        </div>
        <div class="item-button">
          <van-button type="primary" @click="showBuyOutPopup(item)">卖出</van-button>
          <van-button type="warning" @click="showBuyInPopup(item)">买入</van-button>
        </div>
      </div>
    </div>
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
               :style="{ height: '50%' }"
               close-on-click-overlay>
      <div>
        <van-divider>产品规格</van-divider>
        <div class="attrItem">{{order.Spec}}</div>
        <van-divider>产品主规格</van-divider>
        <div>{{order.SpecMain}}</div>
        <van-divider>产品辅规格</van-divider>
        <div>{{order.SpecSubsidiary}}</div>
      </div>
    </van-popup>
    <van-dialog v-model="buyOutShow" title="卖出" show-cancel-button @confirm="updateBuyOut()">
      <van-field v-model="buyOut" type="digit" label="整数" />
    </van-dialog>
    <van-dialog v-model="buyInShow" title="卖出" show-cancel-button @confirm="updateBuyIn()">
      <van-field v-model="buyIn" type="digit" label="整数" />
    </van-dialog>
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
        //买入卖出
        buyOutShow:false,
        buyOut:0,
        buyInShow:false,
        buyIn:0,
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
      showBuyOutPopup: function(item){
          this.buyOutShow = true;
          this.order = item;
      },
      updateBuyOut: async function(){
          await postJson("/order/update",{
              Barcode: this.order.Barcode,
              buyOut: this.buyOut
          });
          this.onSearch();
      },
      showBuyInPopup: function(item){
          this.buyInShow = true;
          this.order = item;
      },
      updateBuyIn: async function(){
          await postJson("/order/update",{
              Barcode: this.order.Barcode,
              buyIn: this.buyIn
          });
          this.onSearch();
      }

  },
  //计算属性
  computed: {},
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
      height:0.7rem;
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
