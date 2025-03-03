<template>
    <div class="chat">
        <div style="width: 80%;margin: 0 auto;">
            <div style="padding-top: 30px;font-weight: bold;font-size: 20px;">What will happen if I steal a car?</div>


            <!-- 显示聊天记录 -->
            <div class="messagesBox">
                <div class="messageItem" v-for="(msg, index) in messages" :key="index">
                    <div class="message">
                        <strong>User:</strong> {{ msg }}
                    </div>
                    <div class="message">
                        <strong>AI:</strong> {{ getAIResponse(msg) }}
                    </div>
                </div>
            </div>
            <!-- 动态聊天部分 -->
            <div class="search">
                <textarea v-model="message" placeholder="Message to..."></textarea>
                <div class="sendBtn" @click="sendMessage" :class="{ 'disabled': !message.trim() }"
                    :disabled="!message.trim()">
                    <span>Send</span>
                    <img src="../assets/right.png" alt="">
                </div>
            </div>


        </div>
    </div>
</template>

<script>
import { ref } from 'vue';

export default {
  name: 'ChatApp',
  setup() {
    // 使用 ref 来定义响应式数据
    const message = ref('');  // 当前输入的消息
    const messages = ref([]); // 存储所有的聊天记录

    // 发送消息
    const sendMessage = () => {
      if (message.value.trim()) {
        messages.value.push(message.value); // 保存用户消息
        message.value = '';  // 清空输入框
      }
    };

    // 获取 AI 回复（可以根据需要扩展这个方法，模拟不同的回答逻辑）
    const getAIResponse = (msg) => {
      return `This is a response to: ${msg}`;
    };

    // 返回需要在模板中使用的数据和方法
    return {
      message,
      messages,
      sendMessage,
      getAIResponse
    };
  }
};
</script>

<style scoped>
.chat {
    width: 100%;
    background-color: #F6F7FB;
    padding-bottom: 50px;
}

.search {
    width: 100%;
    height: 100px;
    background-color: #fff;
    border-radius: 10px;
    box-shadow: 0px 0px 12px 0 rgba(0, 0, 0, 0.12);
    position: relative;
    margin-top: 20px;
}

.search textarea {
    border: none;
    outline: none;
    padding: 10px 0 0 10px;
    border-radius: 10px;
    resize: none;
    width: 100%;
    height: 100%;
}

.sendBtn {
    width: 80px;
    height: 30px;
    background-color: #4F80F9;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #fff;
    border-radius: 50px;
    position: absolute;
    bottom: 0;
    right: 0;
    font-size: 12px;
    cursor: pointer;
}

.sendBtn.disabled {
    background-color: #ccc;
    cursor: not-allowed;
}

.sendBtn img {
    width: 15px;
    margin-left: 10px;
}

.messagesBox {
    margin-top: 20px;
}

.messageItem {
    background-color: #fff;
    padding: 10px;
    margin-bottom: 10px;
    border-radius: 5px;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
}

.message {
    font-size: 14px;
    margin-bottom: 5px;
}
</style>
