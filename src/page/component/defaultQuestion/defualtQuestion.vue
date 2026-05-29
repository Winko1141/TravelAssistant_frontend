<template>
    <div class="default-question">
        <div class="agent">
            <img src="@/assets/头像1.png" alt="">
            <p>云宝</p>
        </div>

        <div class="question-box">
            <span class="question-tips">你可以这样问我</span>

            <button
                v-for="item in visibleQuestions"
                :key="item.text"
                class="question-list"
                type="button"
                @click="handleSelect(item.text)"
            >
                <div class="question-icon">
                    <van-icon name="chat-o" color="#72ab53" size="28px" />
                </div>
                <p>{{ item.text }}</p>
            </button>
        </div>

        <button class="exchange" type="button" @click="handleSwitch">
            <van-icon name="exchange" color="#a3a3a3" size="15px"/>
            <p>换一换</p>
        </button>
    </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';

const emit = defineEmits<{
    (e: 'select', question: string): void
}>();

const questionSets = [
    [
        { text: '帮我规划杭州 3 天 2 晚的行程，住西湖附近，适合带父母慢节奏出行' },
        { text: '帮我查明天从上海虹桥到杭州东的高铁' },
        { text: '帮我看看本周末杭州的天气，顺便告诉我适不适合去西湖拍照' },
        { text: '帮我写一段高铁晚点 40 分钟的投诉话术，语气要礼貌但态度明确' },
    ],
    [
        { text: '帮我规划成都 4 天 3 晚的亲子行程，安排轻松一点，尽量少换酒店' },
        { text: '帮我查 5 月 31 日北京西到西安北的高铁，优先推荐上午出发的车次' },
        { text: '帮我看一下广州接下来 3 天的天气，我周末要带孩子去户外' },
        { text: '帮我生成商场退票投诉模板，内容简洁一点，方便我直接复制发送' },
    ],
];

const activeSetIndex = ref(0);

const visibleQuestions = computed(() => questionSets[activeSetIndex.value]);

const handleSwitch = () => {
    activeSetIndex.value = (activeSetIndex.value + 1) % questionSets.length;
};

const handleSelect = (question: string) => {
    emit('select', question);
};


</script>

<style lang="less" scoped>
.default-question {
        margin-top: 8px;
}

.agent {
    display: flex;
    align-items: center;
        gap: 8px;

    img {
        object-fit: cover;
        width: 40px;
        height: 40px;
        border-radius: 50%;
    }
}
.question-box {
    background: linear-gradient(180deg, #f7fbf5 0%, #eef6ea 100%);
    margin: 15px 0;
    padding: 12px 10px 10px;
    border-radius: 14px;
    box-shadow: 0 6px 18px rgba(79, 120, 63, 0.08);

    .question-tips {
        font-size: 15px;
        font-weight: 600;
        color: #34502a;
    }
    .question-list {
        width: 100%;
        display: flex;
        align-items: center;
        text-align: left;
        border: 0;
        background-color: #ffffff;
        margin-top: 8px;
        padding: 10px 8px;
        border-radius: 12px;
        box-shadow: 0 3px 10px rgba(37, 83, 24, 0.06);

        &:active {
            transform: scale(0.99);
        }

        .question-icon {
            margin-right: 8px;
            flex-shrink: 0;
        }
        p {
            font-size: 14px;
            line-height: 1.45;
            color: #2f3b2c;
            margin: 0;
        }
    }
}
.exchange {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    border: 0;
    background-color: #fff;
    width: fit-content;
    padding: 6px 12px;
    border-radius: 999px;
    box-shadow: 0 3px 10px rgba(37, 83, 24, 0.06);

    p {
        font-size: 12px;
        color: #a3a3a3;
        padding: 0 5px;
        margin: 0;
    }
}
</style>