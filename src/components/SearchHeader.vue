<template>

      <el-button @click="goToHome" type="primary">返回首页_page1</el-button>
  
      <el-input
        v-model="searchQuery"
        placeholder="输入搜索内容..."
        @keyup.enter="triggerSearch"
        style="width: 50%; margin: 0 20px;"
      >
        <template #append>
          <el-button type="primary" @click="triggerSearch">搜索(todo功能)</el-button>
        </template>
      </el-input>
  
      <el-button @click="goToChatbot" type="success">去AI智能问答_page3</el-button>

  </template>
  
  <script setup>
  import { ref } from 'vue';
  import { useRouter, useRoute } from 'vue-router';
  
  const router = useRouter();
  const route = useRoute();
  const searchQuery = ref(route.query.q || '');
  
  const triggerSearch = () => {
  };
  
  const goToHome = () => {
    router.push('/');
  };
  
  const goToChatbot = () => {
    router.push('/chatbot');
  };
  </script>
  
  <style scoped>
  </style>
  