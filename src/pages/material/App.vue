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
        label="类型"
      >
        <template slot-scope="scope">
          <span>{{ scope.row.type | type }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="价格"
      >
        <template slot-scope="scope">
          <span>{{ scope.row.price | fixed }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="最低价"
      >
        <template slot-scope="scope">
          <span>{{ scope.row.minPrice | fixed }}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="quantity"
        label="数量"
      ></el-table-column>
      <el-table-column
        prop="unit"
        label="单位"
      ></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            v-if="scope.row.type === 'recipe'"
            size="mini"
            @click="handleShowRecipe(scope.row)">配方</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog :title="recipe.name" :visible.sync="recipeShow">
      <el-table :data="recipeDetail" stripe>
        <el-table-column prop="name" label="名称"></el-table-column>
        <el-table-column label="价格">
          <template slot-scope="scope">
            <span>{{ scope.row.price | fixed }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="quantity" label="数量"></el-table-column>
        <el-table-column label="合计">
          <template slot-scope="scope">
            <span>{{ scope.row.amount | fixed }}</span>
          </template>
        </el-table-column>
      </el-table>
      <div>完成数量：{{ recipe.datum }}</div>
    </el-dialog>
  </div>
</template>

<script>
import _ from 'lodash'
import request from '@/global/js/request'
import Util from '@/global/js/util'

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
        url: '/api/material/list'
      }).then(response => {
        if (response && response.length) {
          this.list = response
        }
      })
    },
    handleShowRecipe (data) {
      const { list } = this
      const recipes = Util.recipeParse(data.recipe)

      recipes.forEach(recipe => {
        const material = _.find(list, { name: recipe.name })
        recipe.price = material.price
        recipe.amount = material.price * recipe.quantity
      })

      this.recipe = data
      this.recipeDetail = recipes
      this.recipeShow = true
    }
  },
  filters: {
    type (value) {
      return value === 'recipe' ? '配方' : '材料'
    },
    fixed (value) {
      return value ? value.toFixed(3) : '-'
    }
  }
}
</script>
