<template>
  <div class="home">
    <div class="toBtn" @click="toPath('/search')">
      <span>Are you a speciaList?</span>
      <img src="../assets/right.png" alt="">
    </div>
    <div class="toBtn" @click="toPath('/chatbot')">
      <span>Are you a beginner?</span>
      <img src="../assets/right.png" alt="">
    </div>
  </div>
</template>

<script>
import { useRouter } from 'vue-router';

export default {
  name: 'Home',
  setup() {
    const router = useRouter();

    const toPath = (url) => {
      router.push({ path: url });
    };

    // 返回 setup 中使用的响应式数据和方法
    return {
      toPath
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
  justify-content: center;
  align-items: center;
}

.toBtn {
  width: 300px;
  height: 70px;
  background-color: #F09777;
  border-radius: 10px;
  color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 18px;
  cursor: pointer;
}

.toBtn:nth-child(2) {
  margin-left: 20px;
}

.toBtn img {
  margin-left: 20px;
}
</style>