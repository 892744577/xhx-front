<template>
  <div class="record">
    <van-tabs v-model="activeName">
      <van-tab title="全部" name="a">
        <div class="recordTable">
          <div class="recordRow">
            <div class="recordCell">费用</div>
            <div class="recordCell">费用类型</div>
            <div class="recordCell">人员</div>
            <div class="recordCell">时间</div>
          </div>
          <div class="recordRow" v-for="(item,k) in allList" :key="k">
            <div class="recordCell">{{item.fee}}</div>
            <div class="recordCell">{{item.fee_type}}</div>
            <div class="recordCell">{{item.feezer}}</div>
            <div class="recordCell">{{item.fee_time}}</div>
          </div>
        </div>
      </van-tab>
      <van-tab title="卖出" name="b">内容 2</van-tab>
      <van-tab title="支出" name="c">内容 3</van-tab>
      <van-tab title="回款" name="c">内容 3</van-tab>
    </van-tabs>
  </div>
</template>

<script>
import { postJson } from '@/utils/axios';
import moment from 'moment';
export default {
  name: 'record',

  data() {
    return {
        activeName:'a',
        allRecord:[],
    }
  },
  //生命周期函数
  created() {
      this.onSearch();
  },
  //方法
  methods: {
      onSearch:async function(){
          let res1 = await postJson("/order/allRecord",{
              pageQuery: {
                  orderBy: " id desc ",
                  pageNum: 1,
                  pageSize: 1000,
              }
          });
          this.allRecord = res1.data;
      },
  },
  //计算属性
  computed: {
      allList:function (){
          let allRecordTemp = this.allRecord.map((item)=>{
              let fee_type;
              if(item.table_name=='sale') {
                  fee_type = item.fee_type;
              }
              //类型翻译
              if(item.table_name=='pay'){
                  if(item.fee_type == '1'){
                      fee_type="买货";
                  }else if(item.fee_type == '2'){
                      fee_type="人工";
                  }else if(item.fee_type == '3'){
                      fee_type="材料";
                  }else if(item.fee_type == '4'){
                      fee_type="杂项";
                  }
              }

              if(item.table_name=='income') {
                  //类型翻译
                  if (item.fee_type == '1') {
                      fee_type = "定金";
                  } else if (item.fee_type == '2') {
                      fee_type = "尾款";
                  }
              }

              return Object.assign(item,{"fee_type":fee_type,"fee_time":moment(item.fee_time).format('YYYY-MM-DD')})
          });
          return allRecordTemp;
      }
  },
  //组件
  components: {}
}
</script>

<style lang='scss' scoped>
.record {
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
</style>

