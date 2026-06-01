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
          <weather v-else-if="msg.type === 'weather'" :data="getWeatherData(msg)" />
          <!-- 🚄 火车票卡片 -->
          <trainTickets v-else-if="msg.type === 'tickts'" :data="getTrainTicketData(msg)" />
          <!-- 📝 投诉建议卡片 -->
          <complaint v-else-if="msg.type === 'complaint'" :data="getComplaintData(msg)" />
          <!-- 多意图结果卡片 -->
          <div v-else-if="msg.type === 'multi'" class="multi-result">
            <template v-if="msg.data && msg.data.length > 0">
              <div v-for="(result, idx) in msg.data" :key="idx" class="multi-item">
                <weather v-if="result.type === 'weather'" :data="getWeatherData(result)" />
                <trainTickets v-else-if="result.type === 'tickts'" :data="getTrainTicketData(result)" />
                <complaint v-else-if="result.type === 'complaint'" :data="getComplaintData(result)" />
                <!-- chat文本内容 -->
                <div v-else-if="result.type === 'chat' && result.data" class="chat-text" v-html="renderMarkdown(result.data)">
                </div>
              </div>
            </template>
          </div>
        </div>

      </div>
    </div>
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
import { handleMessage, type MessageResponse } from '@/api/handleMessage';
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

const getWeatherData = (msg: any) => {
  const payload = msg?.data;
  if (payload && typeof payload === 'object' && payload.data && typeof payload.data === 'object') {
    return payload.data;
  }
  return payload || {};
}

const getTrainTicketData = (msg: any) => {
  const payload = msg?.data;
  if (payload && typeof payload === 'object' && payload.data && typeof payload.data === 'object') {
    return payload.data;
  }
  return payload || {};
}

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
    messages.value.push({
      role: 'agent',
      type: 'text',
      content: '',
      isLoading: true
    });
    const agentMessageIndex = messages.value.length - 1;

    // 3. 调用后端接口处理消息
    const res: MessageResponse | undefined = await handleMessage(
      message,
      (content) => {
        messages.value[agentMessageIndex].content += content;
        scrollToBottom(); // ✅ 实时滚动
      },
      () => {
        messages.value[agentMessageIndex].isLoading = false; // ✅ 流结束关闭 loading
      }
    );

    // 如果没有返回结果，保持文本类型
    if (!res) {
      messages.value[agentMessageIndex].isLoading = false;
      return;
    }

    // 4. 根据返回类型处理响应
    if (res.type === 'multi') {
      // 多意图结果（后端已聚合所有意图的回复）
      messages.value.splice(agentMessageIndex, 1);
      messages.value.push({
        role: 'agent',
        type: 'multi',
        data: res.data,
        isLoading: false
      });
    } else if (res.type === 'weather') {
      // 天气查询
      messages.value.splice(agentMessageIndex, 1);
      messages.value.push({
        role: 'agent',
        type: 'weather',
        data: res.data,
        isLoading: false
      });
    } else if (res.type === 'tickts') {
      // 火车票查询
      messages.value.splice(agentMessageIndex, 1);
      messages.value.push({
        role: 'agent',
        type: 'tickts',
        data: res.data,
        isLoading: false
      });
    } else if (res.type === 'complaint') {
      // 投诉建议
      messages.value.splice(agentMessageIndex, 1);
      messages.value.push({
        role: 'agent',
        type: 'complaint',
        data: res.data,
        isLoading: false
      });
    } else {
      // 默认保持文本类型
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
  font-size: 16px;

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

  // 多意图结果容器
  .multi-result {
    display: flex;
    flex-direction: column;
    gap: 12px;
    margin-left: 8px;
    margin-top: 8px;
    padding: 12px;
    background: #f8f9fa;
    border-radius: 10px;
    min-width: 200px;

    .multi-item {
      padding: 8px;
      background: #fff;
      border-radius: 8px;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
    }
  }
  
}
</style>