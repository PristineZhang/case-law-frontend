<template>
    <div class="answer-container">
      <!-- 将用户输入的搜索词显示为标题 -->
      <h1 class="answer-title">{{ question }}</h1>
  
      <!-- Case / Legislation 两列布局 -->
      <div class="row-container">
        <div class="card">
          <h2>Case</h2>
          <ul>
            <li>www.philipkdick.com</li>
            <li>www.philipkdick.com</li>
            <li>www.philipkdick.com</li>
          </ul>
        </div>
        <div class="card">
          <h2>Legislation</h2>
          <ul>
            <li>www.philipkdick.com</li>
            <li>www.philipkdick.com</li>
            <li>www.philipkdick.com</li>
          </ul>
        </div>
      </div>
  
      <!-- Answer 区域 -->
      <div class="answer-card">
        <h2>Answer</h2>
        <div class="answer-content">
          <p><strong>Current State of AI:</strong></p>
          <ul>
            <li>Lack of Subjective Experience: AI lacks the capacity for subjective experience...</li>
            <li>...</li>
          </ul>
          <p><strong>Future Possibilities:</strong></p>
          <ul>
            <li>Advancements in AI: Future developments in AI and neuroscience might bring us closer...</li>
            <li>...</li>
          </ul>
        </div>
      </div>
  
      <!-- 最下方输入框 + 发送按钮 -->
      <div class="bottom-input-wrapper">
        <el-input
          v-model="message"
          placeholder="Message to..."
          class="bottom-input"
          @keyup.enter="sendMessage"
          clearable
        ></el-input>
        <el-button type="primary" class="send-btn" @click="sendMessage">
          Send
        </el-button>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue'
  import { useRoute } from 'vue-router'
  
  const route = useRoute()
  const question = route.query.q || '' // 获取上个页面传过来的用户输入
  
  const message = ref('')
  
  function sendMessage() {
    if (message.value.trim()) {
      console.log('发送信息:', message.value)
      message.value = ''
    }
  }
  
  // 根据 question 调用后端获取真实数据
  onMounted(() => {
    console.log('User question:', question)
    // fetchData(question) ...
  })
  </script>
  
  <style scoped>
  .answer-container {
    max-width: 1200px;
    margin: 40px auto;
    padding: 20px;
    background-color: #f5f7fb; 
    border-radius: 8px;
    box-sizing: border-box;
  }
  
  .answer-title {
    font-size: 28px;
    margin-bottom: 30px;
    text-align: left;
  }
  
  .row-container {
    display: flex;
    gap: 20px;
    margin-bottom: 20px;
  }
  
  .card {
    flex: 1;
    background-color: #fff;
    border-radius: 8px;
    padding: 16px;
    box-shadow: 0 1px 4px rgba(0,0,0,0.1);
  }
  
  .card h2 {
    font-size: 18px;
    margin-bottom: 12px;
  }
  
  .card ul {
    list-style: none;
    padding-left: 0;
  }
  .card li {
    margin-bottom: 8px;
    color: #2f80ed;
    cursor: pointer;
  }
  
  /* Answer 区域 */
  .answer-card {
    background-color: #fff;
    border-radius: 8px;
    padding: 16px;
    box-shadow: 0 1px 4px rgba(0,0,0,0.1);
    margin-bottom: 20px;
  }
  
  .answer-card h2 {
    font-size: 18px;
    margin-bottom: 12px;
  }
  
  .answer-content p {
    margin: 10px 0;
  }
  .answer-content ul {
    list-style: disc;
    margin-left: 20px;
    margin-bottom: 10px;
  }
  
  /* 底部输入框 */
  .bottom-input-wrapper {
    display: flex;
    align-items: center;
    background-color: #fff;
    border-radius: 30px;
    padding: 8px 16px;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    width: 100%;
    box-sizing: border-box;
    margin-top: 20px;
  }
  
  .bottom-input {
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