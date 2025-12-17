<template>
  <div class="chat-message">
    <!-- 动态渲染对话 -->
    <div v-for="(msg, index) in messages" :key="index"
      :class="['message-item', msg.role === 'user' ? 'user-item' : 'agent-item']">
      <!-- 消息内容 -->
      <div class="message-content">
        <!-- 用户信息 -->
        <div v-if="msg.role === 'user'" class="user-message">
          <p>{{ msg.content }}</p>
        </div>
        <div v-else class="agent-message">
          <div class="agent-image">
            <img src="@/assets/头像1.png" alt="">
          </div>
          <!-- 智能体加载中时显示 loading 组件，否则显示文本 -->
          <div v-if="msg.isLoading">
            <loading class="loading" />
          </div>
          <div v-else class="text">
            {{ msg.content }}
          </div>
        </div>

      </div>
    </div>
    <!-- 火车票查询结果 -->
    <!-- <queryTrainTickts /> -->
    <!-- 天气查询结果 -->
    <weather />
    <!-- <searchGoods /> -->
    <div style="height: 100px;"></div>
    <!-- 底部输入框 -->
    <inputArea @send="handleSendMessage" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import loading from '../loading/loading.vue';
import queryTrainTickts from '@/page/toolComponents/queryTrainTickts.vue';
import weather from '@/page/toolComponents/weather.vue';
import searchGoods from '@/page/toolComponents/searchGoods.vue';
import inputArea from '../inputArea/inputArea.vue';
import { chatMessage } from '@/api/chat';
import { handleMessage } from '@/api/handleMessage';



// 消息列表
const messages = ref<any[]>([
  {
    role: 'agent',
    content: '你好,有什么可以帮你的吗？',
    isLoading: false
  }
]);
const isLoading = ref(false)



// 发送消息的函数：用户输入的消息通过这个函数添加到聊天中
const handleSendMessage = async (message: string, onMessage: (content: string) => void) => {
  try {
    // 1. 添加用户消息到 messages 数组
    messages.value.push({
      role: 'user',
      content: message,
      isLoading: false
    });

    // 2. 添加加载状态的智能体消息，等待智能体的回复
    const agentMessageIndex = messages.value.length;
    messages.value.push({
      role: 'agent',
      content: '',
      isLoading: true
    });

    // 设置加载中状态
    // isLoading.value = true;

    // 滚动到页面底部，确保最新消息可见
    scrollToBottom();

    // 3. 调用聊天 API，智能体会返回回复的内容
    // await handleMessage(message, (content: string) => {
    //   // 实时更新智能体的消息内容（流式拼接）
    //   messages.value[agentMessageIndex].content += content;
    //   // 滚动到页面底部，确保最新的内容可见
    //   scrollToBottom();
    // });
    const res = await handleMessage(message, (content) => {
      messages.value[agentMessageIndex].content += content;
    });

    if (res?.type === 'weather') {
      // 删除 loading 的 agent 消息
      messages.value.splice(agentMessageIndex, 1);

      // 插入 weather 消息
      messages.value.push({
        role: 'agent',
        type: 'weather',
        data: res.data,
        isLoading: false
      });
    }

    // 4. 移除智能体消息的加载状态

    messages.value[agentMessageIndex].isLoading = false;
  } catch (error) {
    console.error('发送失败:', error);
    // 错误处理：显示失败提示
    const agentIndex = messages.value.length - 1;
    messages.value[agentIndex] = {
      role: 'agent',
      content: '抱歉，消息发送失败，请重试～',
      isLoading: false
    };
  } finally {
    scrollToBottom();
  }
};
// 滚动到底部
const scrollToBottom = () => {
  const container = document.querySelector('.chat-message');
  if (container) {
    setTimeout(() => {
      container.scrollTop = container.scrollHeight;
    }, 0);
  }
};


</script>

<style lang="less" scoped>
.chat-message {
  display: flex;
  flex-direction: column;

  /* 新增：控制每条消息项的横向布局 */
  .message-item {
    display: flex;
    width: 100%;
  }

  /* 用户项靠右，智能体项靠左 */
  .message-item.user-item {
    justify-content: flex-end;
  }

  .message-item.agent-item {
    justify-content: flex-start;
  }

  // 用户消息
  .user-message {
    margin-top: 15px;
    max-width: 70%;
    // width: fit-content;
    margin-left: auto;
    align-self: flex-end;
    opacity: 0;
    transform: translateY(20px);
    animation: fadeUp 0.3s ease-in-out forwards;

    p {
      font-size: 16px;
      line-height: 1.5;
      background-color: #83e651;
      border-radius: 10px 0 10px 10px;
      color: #202020;
      padding: 8px 10px;
      // white-space: nowrap;
    }
  }

  @keyframes fadeUp {
    0% {
      opacity: 0;
      transform: translateY(20px);
    }

    100% {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .user-image {
    display: flex;
    flex-direction: column;

    .van-image {
      align-self: flex-end;
      margin-top: 10px;
    }
  }

  // 智能体消息
  .agent-message {
    margin-top: 15px;
    max-width: 90%;
    // align-self: flex-start;
    opacity: 0;
    transform: translateY(20px);
    animation: fadeUp 0.3s ease-in-out forwards;
    display: flex;

    .text {
      font-size: 16px;
      line-height: 1.5;
      background-color: #ffffff;
      border-radius: 0 10px 10px 10px;
      color: #202020;
      padding: 8px 10px;
      margin-left: 8px;
      margin-top: 10px;
    }
  }

  .agent-image {
    display: flex;
    flex-direction: column;

    img {
      object-fit: cover;
      width: 40px;
      height: 40px;
      border-radius: 50%;
    }

    .van-image {
      align-self: flex-start;
      margin-top: 10px;
    }
  }
}
</style>