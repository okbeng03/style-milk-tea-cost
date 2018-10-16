<template>
  <div id="app">
    <div class="statis">
      <div class="item">
        菜品销量:
        <span class="value">{{ goodAmount }}</span>
      </div>
      <div class="item">
        销售金额:
        <span class="value">{{ amount | fixed }}</span>
      </div>
      <div class="item">
        优惠金额:
        <span class="value">{{ discount | fixed }}</span>
      </div>
      <div class="item">
        收入:
        <span class="value">{{ earning | fixed }}</span>
      </div>
      <div class="item">
        成本:
        <span class="value">{{ cost | fixed }}</span>
      </div>
      <div class="item">
        收益:
        <span class="value">{{ gain | fixed }}</span>
      </div>
    </div>
    <el-table
      :data="list"
      stripe
    >
      <el-table-column
        prop="date"
        label="日期"
        sortable
      >
        <template slot-scope="scope">
          <span>{{ scope.row.date | format }}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="goodAmount"
        label="菜品数量"
        sortable
      ></el-table-column>
      <el-table-column
        prop="amout"
        label="销售金额"
        sortable
      >
        <template slot-scope="scope">
          <span>{{ scope.row.amount | fixed }}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="discount"
        label="优惠金额"
        sortable
      >
        <template slot-scope="scope">
          <span>{{ scope.row.discount | fixed }}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="earning"
        label="收入"
        sortable
      >
        <template slot-scope="scope">
          <span>{{ scope.row.earning | fixed }}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="cost"
        label="成本"
        sortable
      >
        <template slot-scope="scope">
          <span>{{ scope.row.cost | fixed }}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="gain"
        label="收益"
        sortable
      >
        <template slot-scope="scope">
          <span>{{ scope.row.gain | fixed }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="handleShowDetail(scope.row)">查看详情</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
// import _ from 'lodash'
import moment from 'moment'
import request from '@/global/js/request'
// import Util from '@/global/js/util'

export default {
  data () {
    return {
      list: [],
      amount: 0,
      goodAmount: 0,
      discount: 0,
      earning: 0,
      cost: 0,
      gain: 0
    }
  },
  created () {
    this.fetch()
  },
  methods: {
    fetch () {
      request({
        method: 'get',
        url: '/api/daily/list'
      }).then(response => {
        const { list, amount, goodAmount, discount, earning, cost, gain } = response

        if (list && list.length) {
          this.list = list
          this.amount = amount
          this.goodAmount = goodAmount
          this.discount = discount
          this.earning = earning
          this.cost = cost
          this.gain = gain
        }
      })
    },
    handleShowDetail (data) {
      location.href = `/order.html?date=${moment(data.date).format('YYYY-MM-DD')}`
    }
  },
  filters: {
    format (value) {
      return moment(value).format('YYYY-MM-DD')
    },
    fixed (value) {
      return value ? value.toFixed(3) : '-'
    }
  }
}
</script>
