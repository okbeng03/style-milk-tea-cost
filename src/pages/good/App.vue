<template>
  <div id="app">
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
        label="类型"
      >
      </el-table-column>
      <el-table-column
        label="规格"
      >
        <template slot-scope="scope">
          <span>{{ scope.row.specs || '-' }}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="unit"
        label="单位"
      >
      </el-table-column>
      <el-table-column
        label="价格"
        prop="price"
        sortable
      >
        <template slot-scope="scope">
          <span>{{ scope.row.price | fixed }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="成本"
        prop="cost"
        sortable
      >
        <template slot-scope="scope">
          <span>{{ scope.row.cost | fixed }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="收益"
        prop="gain"
        sortable
      >
        <template slot-scope="scope">
          <span>{{ scope.row.gain | fixed }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="最低折扣"
      >
        <template slot-scope="scope">
          <span>{{ scope.row | discount }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="handleShowRecipe(scope.row)">配方</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog :title="recipe" :visible.sync="recipeShow">
      <el-table
        :data="recipeDetail"
        stripe
        :default-sort="{prop: 'cost', order: 'descending'}"
      >
        <el-table-column prop="name" label="名称"></el-table-column>
        <el-table-column label="价格">
          <template slot-scope="scope">
            <span>{{ scope.row.price | fixed }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="quantity" label="数量"></el-table-column>
        <el-table-column label="合计">
          <template slot-scope="scope">
            <span>{{ scope.row.cost | fixed }}</span>
          </template>
        </el-table-column>
      </el-table>
    </el-dialog>
  </div>
</template>

<script>
import request from '@/global/js/request'

export default {
  data () {
    return {
      list: [],
      recipe: '',
      recipeDetail: [],
      recipeShow: false
    }
  },
  created () {
    this.fetch()
  },
  methods: {
    fetch () {
      request({
        method: 'get',
        url: '/api/good/list'
      }).then(response => {
        if (response && response.length) {
          this.list = response
        }
      })
    },
    handleShowRecipe (data) {
      this.recipe = data.name
      this.recipeDetail = data.costDetail
      this.recipeShow = true
    }
  },
  filters: {
    fixed (value) {
      return value ? value.toFixed(3) : '-'
    },
    discount (data) {
      const { cost, price } = data
      return `${(cost / price * 10).toFixed(1)}折`
    }
  }
}
</script>
