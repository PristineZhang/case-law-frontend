<script>
import Head from "./components/SearchHeader.vue"
export default {
  name: 'App',
  components: {
    Head
  }
}
</script>

<template>
   <div class="main">
    <Head></Head>
    <router-view /> 
  </div>
</template>

<style>
.main {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  width: 100%;
}

#app,body,html{
  margin: 0;
  padding: 0;
}
.el-checkbox{
  width: 100%;
}
.el-progress-bar__outer{
  background-color: #fff !important;
} 
</style>
