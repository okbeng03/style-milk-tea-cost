<template>
  <div id="app">
    <el-table
      :data="list"
      :row-class-name="handlerRowClass"
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
        :filters="[{ text: '库存紧张', value: 1 }]"
        :filter-method="quantityFilter"
      ></el-table-column>
      <el-table-column
        prop="unit"
        label="单位"
      ></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            v-if="scope.row.type === 'material'"
            size="mini"
            @click="handlePutIn(scope.row, scope.$index)">入库</el-button>
          <el-button
            v-if="scope.row.type === 'material'"
            size="mini"
            @click="handlePutInRecord(scope.row)">入库记录</el-button>
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

    <el-dialog :title="material.name" :visible.sync="inventoryShow" v-loading="loading">
      <el-table :data="inventories" stripe>
        <el-table-column label="日期">
          <template slot-scope="scope">
            <span>{{ scope.row.date | format }}</span>
          </template>
        </el-table-column>
        <el-table-column label="价格">
          <template slot-scope="scope">
            <span>{{ scope.row.price | fixed }}</span>
          </template>
        </el-table-column>
        <el-table-column label="数量/单位">
          <template slot-scope="scope">
            <span>{{ scope.row.quantity }} / {{ scope.row.unit }}</span>
          </template>
        </el-table-column>
        <el-table-column label="规则/基准单位">
          <template slot-scope="scope">
            <span>{{ scope.row.datum }} / {{ scope.row.datumUnit }}</span>
          </template>
        </el-table-column>
        <el-table-column label="基准价格">
          <template slot-scope="scope">
            <span>{{ scope.row.price / scope.row.datum | fixed }}</span>
          </template>
        </el-table-column>
      </el-table>
    </el-dialog>

    <el-dialog :title="material.name" :visible.sync="putInShow" v-loading="loading">
      <el-form ref="form" :model="material" :label-position="'top'">
        <el-form-item label="价格">
          <el-input v-model="material.price"></el-input>
        </el-form-item>
        <el-form-item label="数量/单位">
          <el-col :span="20">
            <el-input v-model="material.quantity" type="number"></el-input>
          </el-col>
          <el-col :span="4" style="padding-left: 20px;">
            <el-input v-model="material.unit"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="规格/基准单位">
          <el-col :span="20">
            <el-input v-model="material.datum"></el-input>
          </el-col>
          <el-col :span="4">
            <span style="padding-left: 20px;">{{ material.datumUnit }}</span>
          </el-col>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="putInShow = false">取 消</el-button>
        <el-button type="primary" @click="onPutIn">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import _ from 'lodash'
import moment from 'moment'
import request from '@/global/js/request'
import cookie from '@/global/js/cookie'
import Util from '@/global/js/util'

export default {
  data () {
    return {
      list: [],
      material: {},
      recipe: '',
      recipeDetail: [],
      recipeShow: false,
      inventoryShow: false,
      inventories: [],
      putInShow: false,
      index: -1,
      loading: false
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
    },
    handlePutIn (data, index) {
      this.loading = true
      this.putInShow = true

      request({
        url: '/api/inventory/find',
        params: {
          name: data.name
        }
      }).then(response => {
        this.index = index
        this.material = response
        this.loading = false
      }).catch(err => {
        this.loading = false
        this.$message.error(err.message)
      })
    },
    handlePutInRecord (data) {
      this.inventoryShow = true
      this.loading = true
      this.material = data

      request({
        url: '/api/inventory/list',
        params: {
          name: data.name
        }
      }).then(response => {
        this.inventories = response
        this.loading = false
      }).catch(err => {
        this.loading = false
        this.$message.error(err.message)
      })
    },
    handlerRowClass ({ row }) {
      if (row.quantity <= row.minQuantity) {
        return 'less'
      }
    },
    quantityFilter (value, row) {
      if (value === 1) {
        return row.quantity <= row.minQuantity
      }

      return false
    },
    onPutIn () {
      const { material } = this

      if (!material.price) {
        this.$message.error('您的价格呢？')
        return
      }

      request({
        url: '/api/inventory/putIn',
        method: 'post',
        data: {
          name: material.name,
          price: material.price - 0,
          quantity: material.quantity - 0,
          unit: material.unit,
          datum: material.datum,
          datumUnit: material.datumUnit,
          _csrf: cookie.get('csrfToken')
        },
        timeout: 10000
      }).then(response => {
        this.$message({
          type: response.success ? 'success' : 'error',
          message: response.message
        })
        this.putInShow = false
        this.fetch()
      }).catch(err => {
        this.putInShow = false
        this.$message.error(err.message)
      })
    }
  },
  filters: {
    type (value) {
      return value === 'recipe' ? '配方' : '材料'
    },
    fixed (value) {
      return value ? value.toFixed(3) : '-'
    },
    format (value) {
      return moment(value).format('YYYY-MM-DD')
    }
  }
}
</script>
