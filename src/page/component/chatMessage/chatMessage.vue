<template>
  <div class="chat-message">
    <defaultQuestion @select="handleQuickQuestion" />

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
          
          <!-- 普通聊天 -->
          <div v-if="msg.type === 'text'" class="text" v-html="renderMarkdown(msg.content)">

          </div>
          <!-- 智能体加载中时显示 loading 组件，否则显示文本 -->
          <div v-if="msg.isLoading">
            <loading class="loading" />
          </div>
          <!-- 🌦 天气卡片 -->
          <weather v-else-if="msg.type === 'weather'" :data="msg.data" />
          <!-- 🚄 火车票卡片 -->
          <trainTickets v-else-if="msg.type === 'tickts'" :data="msg.data" />
          <!-- 📝 投诉建议卡片 -->
          <complaint v-else-if="msg.type === 'complaint'" :data="getComplaintData(msg)" />
        </div>

      </div>
    </div>
    <!-- 火车票查询结果 -->
    <!-- <queryTrainTickts /> -->
    <!-- 天气查询结果 -->
    <!-- <weather /> -->
    <!-- <searchGoods /> -->
    <div style="height: 100px;"></div>
    <!-- 底部输入框 -->
    <inputArea @send="handleSendMessage" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import loading from '../loading/loading.vue';
import trainTickets from '@/page/toolComponents/trainTickets.vue';
import weather from '@/page/toolComponents/weather.vue';
import complaint from '@/page/toolComponents/complaint.vue';
import inputArea from '../inputArea/inputArea.vue';
import defaultQuestion from '../defaultQuestion/defualtQuestion.vue';
import { handleMessage } from '@/api/handleMessage';
import { marked } from 'marked'



// 消息列表
const messages = ref<any[]>([
  {
    role: 'agent',
    type: 'text',
    content: '你好呀！我是你的专属旅行助手云宝～ 可以帮你规划行程、查天气车票，甚至找当地美食哦！”',
    isLoading: false
  }
]);
const isLoading = ref(false)

const getComplaintData = (msg: any) => {
  const payload = msg?.data;
  if (payload && typeof payload === 'object' && payload.data && typeof payload.data === 'object') {
    return payload.data;
  }
  return payload || {};
}

const handleQuickQuestion = (message: string) => {
  void handleSendMessage(message, () => {
    // 快捷问题直接复用发送链路，无需额外回调处理。
  });
}



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
    // const agentMessageIndex = messages.value.length;
    messages.value.push({
      role: 'agent',
      type: 'text',
      content: '',
      isLoading: true
    });
  const agentMessageIndex = messages.value.length - 1;
    // 设置加载中状态
    // isLoading.value = true;

    // 滚动到页面底部，确保最新消息可见
    // scrollToBottom();
const res = await handleMessage(
  message,
  (content) => {
    messages.value[agentMessageIndex].content += content;
    scrollToBottom(); // ✅ 实时滚动
  },
  () => {
    messages.value[agentMessageIndex].isLoading = false; // ✅ 流结束关闭 loading
  }
);
   if (res?.type === 'weather') {
  messages.value.splice(agentMessageIndex, 1);

  messages.value.push({
    role: 'agent',
    type: 'weather',
    data: res.data,
    isLoading: false
  });

} else if (res?.type === 'tickts') {
  messages.value.splice(agentMessageIndex, 1);

  messages.value.push({
    role: 'agent',
    type: 'tickts',
    data: res.data,
    isLoading: false
  });

} else if (res?.type === 'complaint') {
  messages.value.splice(agentMessageIndex, 1);

  messages.value.push({
    role: 'agent',
    type: 'complaint',
    data: res?.data?.data && typeof res.data.data === 'object' ? res.data.data : res.data,
    isLoading: false
  });
}

    // 4. 移除智能体消息的加载状态

    if (!res?.type) {
  messages.value[agentMessageIndex].isLoading = false;
}
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
const renderMarkdown = (text: string) => {
  return marked.parse(text)
}

const copyText = async (text: string) => {
  try {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      await navigator.clipboard.writeText(text);
      alert('已复制到剪贴板');
    } else {
      const ta = document.createElement('textarea');
      ta.value = text;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      document.body.removeChild(ta);
      alert('已复制到剪贴板');
    }
  } catch (e) {
    console.error('复制失败', e);
    alert('复制失败，请手动复制');
  }
}

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
    // max-width: 90%;
    width: fit-content;
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
      // white-space: pre-wrap;
      // word-break: break-all;
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