<template>
  <div id="app">
    <div class="statis">
      <div class="item">
        <span class="value">{{ date | format }}</span>
      </div>
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
        prop="name"
        label="名称"
      ></el-table-column>
      <el-table-column
        prop="category"
        label="分类"
      ></el-table-column>
      <el-table-column
        prop="specs"
        label="规格"
      ></el-table-column>
      <el-table-column
        label="价格"
      >
        <template slot-scope="scope">
          <span>{{ scope.row.price | fixed }}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="quantity"
        label="数量"
      ></el-table-column>
      <el-table-column
        label="合计"
      >
        <template slot-scope="scope">
          <span>{{ scope.row.amount | fixed }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="优惠金额"
      >
        <template slot-scope="scope">
          <span>{{ scope.row.discount | fixed }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="收入"
      >
        <template slot-scope="scope">
          <span>{{ scope.row.earning | fixed }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="成本"
      >
        <template slot-scope="scope">
          <span>{{ scope.row.cost | fixed }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="收益"
      >
        <template slot-scope="scope">
          <span>{{ scope.row.gain | fixed }}</span>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import moment from 'moment'
import queryString from 'query-string'
import request from '@/global/js/request'

export default {
  data () {
    return {
      date: '',
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
    const query = queryString.parse(location.search)
    this.date = query.date
    this.fetch(query.date)
  },
  methods: {
    fetch (date) {
      request({
        method: 'get',
        url: '/api/order/list',
        params: {
          date
        }
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
