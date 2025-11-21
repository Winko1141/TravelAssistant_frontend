<template>
    <div class="chat-message">
        <div class="user-message">
            <p>用户发送纯文本</p>
            <div class="user-image">
                <van-image width="120px" height="120px" radius="5" fit="cover"
                    src="https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg" />
            </div>
        </div>

        <!-- 智能体回复 -->
        <div class="agent-message">
            <!-- <loading class="text" /> -->
            <!-- <van-loading size="24px" class="text">加载中...</van-loading> -->
            <!-- <p class="text">智能体发送纯文本智能体发送纯文本智能体发送纯文本智能体发送纯文本智能体发送纯文本智能体发送纯文本智能体发送纯文本智能体发送纯文本智能体发送纯文本智能体发送纯文本智能体发送纯文本</p> -->
            <!-- <div class="agent-image">
            <van-image width="120px" height="120px" radius="5" fit="cover" src="https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg" />
                </div> -->

        </div>
        <!-- 火车票查询结果 -->
        <queryTrainTickts />
        <!-- 天气查询结果 -->
        <weather />
        <searchGoods />

        <!-- 底部输入框 -->
        <inputArea />
    </div>
</template>

<script setup lang="ts">
import loading from '../loading/loading.vue';
import queryTrainTickts from '@/page/toolComponents/queryTrainTickts.vue';
import weather from '@/page/toolComponents/weather.vue';    
import searchGoods from '@/page/toolComponents/searchGoods.vue';
import inputArea from '../inputArea/inputArea.vue';

</script>

<style lang="less" scoped>
.chat-message {
    display: flex;
    flex-direction: column;

    // 用户消息
    .user-message {
        margin-top: 15px;
        max-width: 70%;
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
        max-width: 95%;
        align-self: flex-start;
        opacity: 0;
        transform: translateY(20px);
        animation: fadeUp 0.3s ease-in-out forwards;

        .text {
            font-size: 16px;
            line-height: 1.5;
            background-color: #ffffff;
            border-radius: 0 10px 10px 10px;
            color: #202020;
            padding: 8px 10px;
        }
    }

    .agent-image {
        display: flex;
        flex-direction: column;

        .van-image {
            align-self: flex-start;
            margin-top: 10px;
        }
    }
}
</style>