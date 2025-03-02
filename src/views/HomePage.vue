<template>
  <div class="home-container">
    <h1>Case Law Search</h1>
    <el-input
      v-model="searchQuery"
      placeholder="搜索(todo)+去普通搜索_page2"
      @keyup.enter="goToSearch"
      style="width: 60%;"
    />
    <div class="btn-container">
      <el-button class="special-btn" type="primary" @click="goToSearch">
        Are you a specialist ?
      </el-button>
      <el-button class="special-btn" type="success" @click="goToChatbot">
        Are you a beginner ?
      </el-button>
    </div>


    <!-- 蓝色背景的区域，左侧是数据卡片，右侧是法官图片 -->
    <div class="stats-wrapper">
      <!-- 左侧两块统计数据 -->
      <div class="stats-area">
        <div class="stat-card">
          <div class="stat-title">Total Case</div>
          <div class="stat-value">10,293</div>
          <div class="stat-change positive">1.3% Up from yesterday</div>
        </div>
        <div class="stat-card">
          <div class="stat-title">Total Legislation</div>
          <div class="stat-value">40,689</div>
          <div class="stat-change positive">8.5% Up from yesterday</div>
        </div>
      </div>


      <!-- 右侧：直接使用外部链接 -->
      <div class="judge-area">
        <img
          src="https://drive.google.com/file/d/1l0Z_GJ4lVtFQHvY6ntwCX374-hwt1lI4/view?usp=drive_link"
          alt="Judge"
        />
      </div>
    </div>
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
  gap: 20px;
  margin-top: 40px;
}


.btn-container {
  display: flex;
  flex-direction: row;
  gap: 20px;
}


.special-btn {
  font-size: 18px;
  padding: 12px 24px;
  min-width: 300px;
  height: 100px;
  background-color: #eb7c5d;
  border-color: #eb7c5d;
  color: #fff;
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
}


.special-btn:hover {
  background-color: #eb7c5d;
  border-color: #eb7c5d;
}


.stats-wrapper {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #54a2e6;
  border-radius: 12px;
  padding: 20px;
  margin-top: 20px;
  width: 80%;
  max-width: 1200px;
}


.stats-area {
  display: flex;
  flex-direction: column;
  gap: 20px;
}


.stat-card {
  background-color: #fff;
  border-radius: 8px;
  padding: 16px 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}


.stat-title {
  font-size: 16px;
  color: #666;
}


.stat-value {
  font-size: 24px;
  font-weight: bold;
  color: #333;
  margin: 8px 0;
}


.stat-change {
  font-size: 14px;
}


.stat-change.positive {
  color: #0f9d58;
}


.stat-change.negative {
  color: #db4437;
}


.judge-area img {
  width: 200px;
  height: auto;
  object-fit: contain;
}
</style>