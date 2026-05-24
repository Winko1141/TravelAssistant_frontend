<template>
    <div class="input-container">
        <!-- 图片上传展示 -->
        <!-- <van-uploader v-model="fileList" multiple max-count="1" preview-size="70px" class="update-img"/> -->
        <div class="data-query">
         <van-button type="default" size="small" @click="showQuestionnaire = true">行程规划</van-button>
          <van-button type="default" size="small" @click="showTrainTicketPage = true">查询火车票</van-button>
          <van-button type="default" size="small" @click="showWeatherPage = true">查询天气</van-button>
          <van-button type="default" size="small" @click="showComplaintPage = true">投诉模版</van-button>
            <van-uploader>
                <!-- <van-button type="default" size="small" style="display: flex;">图片问答</van-button> -->
            </van-uploader>
         
        </div>
        <div class="input-box-area">
            <van-cell-group inset  class="input-content">
                <van-field rows="1" autosize  type="textarea"  v-model="inputMessage" />
                 <!-- <input type="textarea" class="input-content"   autosize="{minRows: 1, maxRows: 3 }" /> -->
            </van-cell-group>
            <van-button 
              type="success"  
              class="send-btn"
              @click="handleSend"
            >
              发送
            </van-button>
        </div>

        <van-popup v-model:show="showQuestionnaire" round position="bottom" :style="{ height: '80vh' }">
            <questionNaire @confirm="handleQuestionnaireConfirm" />
        </van-popup>

        <van-popup v-model:show="showTrainTicketPage" round position="bottom" :style="{ height: '40vh' }">
          <trainTickts @confirm="handleTrainTicketConfirm" />
        </van-popup>

        <van-popup v-model:show="showWeatherPage" round position="bottom" :style="{ height: '40vh' }">
          <weatherPage @confirm="handleWeatherConfirm" />
        </van-popup>

        <van-popup v-model:show="showComplaintPage" round position="bottom" :style="{ height: '80vh' }">
          <complaintPage @confirm="handleComplaintConfirm" />
        </van-popup>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import questionNaire from '../questionNaire/questionNaire.vue';
    import trainTickts from '../trainTickts/trainTickts.vue';
    import weatherPage from '../weather/weather.vue';
import complaintPage from '../complaint/complaint.vue';

interface QuestionnairePayload {
  destination: string
  days: number
  people: number
  travelDate?: string
  rhythm: string
  crowdTags: string[]
}

interface TrainTicketPayload {
  origin: string
  destination: string
  travelDate: string
}

interface WeatherPayload {
  city: string
  startDate: string
  endDate: string
}

interface ComplaintPayload {
  city: string
  address: string
  issueType: string
  description: string
}


const inputMessage = ref('');
const fileList= ref([{ url: 'https://fastly.jsdelivr.net/npm/@vant/assets/leaf.jpeg' }]);
const showQuestionnaire = ref(false);
const showTrainTicketPage = ref(false);
const showWeatherPage = ref(false);
const showComplaintPage = ref(false);

// 定义 emit 事件用于通知父组件
const emit = defineEmits<{
  send: [message: string, onMessage: (content: string) => void]
}>();

const sendByMessage = (message: string) => {
  emit('send', message, async (_content: string) => {
    // 预留流式内容回调
  });
}

const handleQuestionnaireConfirm = (payload: QuestionnairePayload) => {
  const dateText = payload.travelDate ? `，出行日期 ${payload.travelDate}` : ''
  const content = `请根据以下信息规划行程：目的地 ${payload.destination}，游玩 ${payload.days} 天，出行人数 ${payload.people} 人${dateText}，游玩节奏 ${payload.rhythm}，${payload.crowdTags.join('、')}。`
  showQuestionnaire.value = false
  sendByMessage(content)
}

const handleTrainTicketConfirm = (payload: TrainTicketPayload) => {
  const content = `请帮我查询火车票：起始地 ${payload.origin}，目的地 ${payload.destination}，出行日期 ${payload.travelDate}。`
  showTrainTicketPage.value = false
  sendByMessage(content)
}

const handleWeatherConfirm = (payload: WeatherPayload) => {
  const content = `请帮我查询天气：城市 ${payload.city}，日期 ${payload.startDate} 至 ${payload.endDate}。`
  showWeatherPage.value = false
  sendByMessage(content)
}

const handleComplaintConfirm = (payload: ComplaintPayload) => {
  const content = `请根据以下信息生成投诉模板并转交后端处理：事发城市 ${payload.city}，详细地址 ${payload.address}，问题类型 ${payload.issueType}，问题描述 ${payload.description}。`
  showComplaintPage.value = false
  sendByMessage(content)
}

// 处理发送按钮点击事件：发送消息到父组件
const handleSend = async () => {
  const message = inputMessage.value.trim();
  // 如果没有输入消息，则不处理
  if (!message) return;

  try {
    // 发送消息后清空输入框
    inputMessage.value = '';
    // 触发 send 事件，通知父组件发送消息
    sendByMessage(message)
  } catch (error) {
    console.error('发送消息失败:', error);
  }
};
</script>

<style lang="less" scoped>
// 组件样式
.input-container {
    position: fixed;
    left: 0;
    bottom: 0;
    right: 0;

    .data-query {
        display: flex;
        align-items: center;
        margin: 5px 10px;
        gap: 10px;
      overflow-x: auto;
      white-space: nowrap;
    }

    .input-box-area {
        display: flex;
        align-items: center;
        margin-top: 5px;
        background-color: #fff;
        padding: 5px 2px;

        .input-content {
            border: 1px solid #92bc6d;
            flex: 1;
            border-radius: 10px;
           
        }

        .send-btn {
            width: 70px;
            height: 40px;
            margin-right: 5px;
        }
    }

    .update-img {
        margin-left: 10px;
    }
}
</style>