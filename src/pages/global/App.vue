<template>
  <div id="sidenav">
    <h1>御茶</h1>
    <el-menu>
      <el-submenu index="1">
        <template slot="title">
          <a href="/daily.html">每日收益</a>
        </template>
      </el-submenu>
      <el-submenu index="2">
        <template slot="title">
          <a href="/good.html">产品列表</a>
        </template>
      </el-submenu>
      <el-submenu index="3">
        <template slot="title">
          <a href="/material.html">材料列表</a>
        </template>
      </el-submenu>
    </el-menu>
  </div>
</template>

<script>
export default {}
</script>
