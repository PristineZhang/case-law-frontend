<template>

      
      <el-button class="home-btn" @click="goToHome" style="margin-left: 10px;">
        GoBackToHomePage
      </el-button>

      <el-input
        class="rounded-input"
        v-model="searchQuery"
        placeholder="输入搜索内容..."
        @keyup.enter="triggerSearch"
        style="width: 50%; margin: 0 20px;"
      >
        <template #append>
          <el-button type="primary" @click="triggerSearch">搜索(todo功能)</el-button>
        </template>
      </el-input>
  
      <el-button class="chatbot-btn" @click="goToChatbot" style="margin-left: 10px;">
        GoToChatbotAI
      </el-button>


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
  .home-btn {
  background-color: #2196f3 !important; /* 蓝色示例 */
  border-color: #2196f3 !important;
  color: #fff !important;
  }

  .chatbot-btn {
  background-color: #eb7c5d !important; /* 绿色示例 */
  border-color: #eb7c5d !important;
  color: #fff !important;
  }

  .rounded-input ::v-deep .el-input__inner {
  border-radius: 50px !important;
  }
  </style>
  