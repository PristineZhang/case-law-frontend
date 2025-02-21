<!-- src/views/ChatbotPage.vue -->
<template>
    <div class="chatbot-container">
      <h2>PAGE3_ChatBotPage ai问答页面</h2>
      <el-input
        v-model="userInput"
        placeholder="请输入问题并按回车"
        @keyup.enter="handleQuestion"
        style="width: 70%;"
      />
      <el-button type="primary" @click="handleQuestion">提交问题(todo功能)</el-button>
      <el-button type="warning" @click="goToSearch" style="margin-left: 10px;">去普通搜索_page2</el-button>

      <el-button type="info" @click="goToHome" style="margin-left: 10px;">返回首页_page1</el-button>
  
      <div v-if="chatHistory.length" class="chat-window">
        <div v-for="(msg, index) in chatHistory" :key="index" class="message">
          <p><strong>用户:</strong> {{ msg.question }}</p>
          <p><strong>AI:</strong> {{ msg.answer }}</p>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import { useRouter } from 'vue-router';
  
  const router = useRouter();
  const userInput = ref('');
  const chatHistory = ref([]);
  
  const handleQuestion = () => {
    if (userInput.value.trim() !== '') {
      const question = userInput.value;
      const answer = `关于 "${question}" 的 AI 回答示例...`;
      chatHistory.value.push({ question, answer });
      userInput.value = '';
    }
  };
  
  const goToSearch = () => {
    router.push('/search');
  };

  const goToHome = () => {
  router.push('/');
};
  </script>
  
  <style scoped>
  .chatbot-container {
    padding: 40px;
    text-align: center;
  }
  .chat-window {
    margin-top: 30px;
    border: 1px solid #ccc;
    padding: 20px;
    max-height: 300px;
    overflow-y: auto;
    background-color: #f9f9f9;
  }
  .message {
    margin-bottom: 15px;
    text-align: left;
  }
  </style>
  