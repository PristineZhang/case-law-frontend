<template>
  <div class="chatbot-container">
    <h1 class="chatbot-title">What do you want to know about law ?</h1>

    <div class="input-wrapper">
      <el-input
        v-model="userInput"
        placeholder="Message to..."
        @keyup.enter="goToAnswerPage"
        class="chat-input"
        clearable
      ></el-input>

      <el-button class="send-btn" type="primary" @click="goToAnswerPage">
        Send
      </el-button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const userInput = ref('')
const router = useRouter()

function goToAnswerPage() {
  if (userInput.value.trim()) {
    // 将用户输入通过 query 参数传递给下一个页面
    router.push({ 
      path: '/answer',
      query: { q: userInput.value } 
    })
  }
}
</script>

<style scoped>

.chatbot-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh; 
  background-color: #f4f4f8; 
  padding: 20px;
  box-sizing: border-box;
}

.chatbot-title {
  font-size: 24px;
  margin-bottom: 40px;
  color: #333;
  text-align: center;
}

.input-wrapper {
  display: flex;
  align-items: center;
  background-color: #fff;
  border-radius: 30px;
  padding: 8px 16px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  width: 60%;
  max-width: 600px;
}

.chat-input {
  flex: 1;
  border: none;
  outline: none;
  margin-right: 10px;
}

.send-btn {
  border-radius: 50%;
  width: 48px;
  height: 48px;
  min-width: 48px;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
  