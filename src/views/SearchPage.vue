<template>
  <div style="height: 100%">
      <el-container style="height: 100%">
          <el-header style="height: 25%;padding-left: 0;padding-right: 0;background-color: #d3dce6;">
            <HeaderSection/>
          </el-header>
          <el-container height="100%">
              <el-aside width="15%;" background-color: #d3dce6;>

              </el-aside>
              <el-main height="100%" style="padding: 0px 5% 0px 0px; background-color: #e9eef3;">

              </el-main>
          </el-container>
      </el-container>
  </div>
</template>


<script setup>
import HeaderSection from '../components/SearchHeader.vue';
</script>


<style>
</style>



<!-- src/views/SearchPage.vue
<template>
    <h1>PAGE2_SearchPage 普通检索页面</h1>
    <div class="search-container">
      <el-input
        v-model="query"
        placeholder="在这里输入搜索内容..."
        @keyup.enter="updateSearch"
        style="width: 60%;"
      />
      <el-button @click="updateSearch" type="primary">搜索(todo功能)</el-button>
      <el-button @click="goToChatbot" type="success" style="margin-left: 10px;">去AI智能问答_page3</el-button>

      <el-button @click="goToHome" type="info" style="margin-left: 10px;">返回首页_page1</el-button>
  
      <div v-if="query" class="results">
        <h3>🔎 搜索结果: "{{ query }}"</h3>
        <p>这里将展示与 "{{ query }}" 相关的搜索结果……</p>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import { useRouter, useRoute } from 'vue-router';
  
  const router = useRouter();
  const route = useRoute();
  const query = ref('');
  
  onMounted(() => {
    query.value = route.query.q || '';
  });
  
  const updateSearch = () => {
    if (query.value.trim() !== '') {
      router.replace({ path: '/search', query: { q: query.value } });
    }
  };
  
  const goToChatbot = () => {
    router.push('/chatbot');
  };

  const goToHome = () => {
  router.push('/');
};
  </script>
  
  <style scoped>
  .search-container {
    padding: 40px;
    text-align: center;
  }
  .results {
    margin-top: 30px;
  }
  </style>
   -->