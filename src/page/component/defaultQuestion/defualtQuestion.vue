<template>
  <div class="agent">
    <img src="@/assets/头像1.png" alt="">
    <p>云宝</p>
  </div>
  <div class="question-box">
    <span class="question-tips">你可以这样问我</span>
    <div class="question-list">
        <div class="question-icon">
            <van-icon name="chat-o" color="#72ab53" size="35px" />
        </div>     
        <p>1111111111</p>
    </div>
    <div class="question-list">
        <div class="question-icon">
            <van-icon name="chat-o" color="#72ab53"  size="35px" />
        </div>     
        <p>1111111111</p>
    </div>
  </div>
  <div class="exchange">
    <van-icon name="exchange" color="#a3a3a3" size="15px"/>
    <p>换一换</p>
  </div>
</template>

<script setup lang="ts">


</script>

<style lang="less" scoped>
.agent {
    display: flex;
    align-items: center;
    img {
        object-fit: cover;
        width: 40px;
        height: 40px;
        border-radius: 50%;
    }
}
.question-box {
    background-color: #f5f5f5;
    margin: 15px 0;
    padding: 10px;
    border-radius: 10px;
    .question-tips {
        font-size: 15px;
    }
    .question-list {
        display: flex;
        align-items: center;
        background-color: #e3ece3;
        margin-top: 8px;
        padding: 0 5px;
        border-radius: 10px;

        .question-icon {
            margin: 3px;
        }
        p {
            font-size: 15px;
        }
    }
}
.exchange {
    display: inline-flex;
    align-items: center;
    background-color: #fdfdfd;
    width: fit-content;
    padding: 5px 10px;
    border-radius: 40px;
    p {
        font-size: 12px;
        color: #a3a3a3;
        padding: 0 5px;
    }
}
</style>