<!-- src/views/HomePage.vue -->
<template>
    <div class="home-container">
      <h1>PAGE1_HomePage 搜索引擎首页 </h1>
      <el-input
        v-model="searchQuery"
        placeholder="搜索(todo)+去普通搜索_page2"
        @keyup.enter="goToSearch"
        style="width: 60%;"
      />
      <el-button type="primary" @click="goToSearch">去普通搜索_page2</el-button>

      <el-button type="success" @click="goToChatbot" style="margin-left: 10px;">去AI智能问答_page3</el-button>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import { useRouter } from 'vue-router';
  
  const searchQuery = ref('');
  const router = useRouter();
  
  const goToSearch = () => {
    if (searchQuery.value.trim() !== '') {
      router.push({ path: '/search', query: { q: searchQuery.value } });
    } else {
      router.push('/search');
    }
  };
  
  const goToChatbot = () => {
    router.push('/chatbot');
  };
  </script>
  
  <style scoped>
  .home-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
    gap: 20px;
  }
  </style>
  