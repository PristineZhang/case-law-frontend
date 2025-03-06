<template>
  <div class="home">
    <div class="stats-container">
      <!-- First Card: Total Case -->
      <div class="stats-card">
        <div class="stats-title">Total Case</div>
        <div class="stats-value">{{ totalCase }}</div>
        <div class="stats-change">
          <span class="stats-num">{{ caseChange }}%</span>
          <span class="stats-text"> Up from yesterday</span>
        </div>
      </div>

      <!-- Second Card: Total Legislation -->
      <div class="stats-card">
        <div class="stats-title">Total Legislation</div>
        <div class="stats-value">{{ totalLegislation }}</div>
        <div class="stats-change">
          <span class="stats-num">{{ legislationChange }}%</span>
          <span class="stats-text"> Up from yesterday</span>
        </div>
      </div>
    </div>

    <div class="btn-container">
      <div class="toBtn" @click="toPath('/search')">
        <span>Are you a speciaList?</span>
        <img src="../assets/right.png" alt="">
      </div>
      <div class="toBtn" @click="toPath('/chatbot')">
        <span>Are you a beginner?</span>
        <img src="../assets/right.png" alt="">
      </div>
    </div>
  </div>
</template>

<script>
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';

export default {
  name: 'Home',
  setup() {
    const router = useRouter();

    const totalCase = ref(0);
    const caseChange = ref(0);
    const totalLegislation = ref(0);
    const legislationChange = ref(0);

    const fetchStats = async () => {
      try {
        const response = await axios.get('https:/github.com/all');
        totalCase.value = response.data.totalCase;
        caseChange.value = response.data.caseChange;
        totalLegislation.value = response.data.totalLegislation;
        legislationChange.value = response.data.legislationChange;
      } catch (error) {
        console.error('Error fetching stats:', error);
      }
    };

    const toPath = (url) => {
      router.push({ path: url });
    };

    onMounted(() => {
      fetchStats();
    });

    // 返回 setup 中使用的响应式数据和方法
    return {
      toPath,

      totalCase,
      caseChange,
      totalLegislation,
      legislationChange
    };
  }
};
</script>

<style scoped>
.home {
  width: 100%;
  height: calc(100vh - 60px);
  background-color: #F6F7FB;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.stats-container {
  display: flex;
  gap: 20px;
  margin-bottom: 40px;
}

.stats-card {
  width: 300px;
  height: 100px;
  background-color: #fff;
  border-radius: 12px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 20px;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.stats-title {
  font-size: 22px;
  margin-bottom: 10px;
  color: #555;
}

.stats-value {
  font-size: 28px;
  font-weight: bold;
  color: #333;
  margin-bottom: 8px;
}

.stats-num {
  font-size: 20px;
  color: #16C79A
}

.stats-text {
  font-size: 20px;
  color: #555;
}

.btn-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
}
.toBtn {
  width: 300px;
  height: 70px;
  background-color: #F09777;
  border-radius: 12px;
  color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 20px;
  cursor: pointer;
  gap: 20px;
  margin-bottom: 5px;
}



.toBtn img {
  margin-left: 20px;
}
</style>