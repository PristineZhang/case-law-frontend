<script setup>
</script>

<template>
  <div class="main">
    <router-view /> <!-- 用于展示根据路由加载的页面组件 -->
  </div>
</template>

<style scoped>
.main {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  width: 100%;
}
</style>
