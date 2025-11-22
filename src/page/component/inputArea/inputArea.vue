<template>
    <div class="input-container">
        <!-- 图片上传展示 -->
        <van-uploader v-model="fileList" multiple max-count="1" preview-size="70px" class="update-img"/>
        <div class="data-query">
            <van-button type="default" size="small">查询火车票</van-button>
            <van-button type="default" size="small">查询天气</van-button>
            <van-uploader>
                <van-button type="default" size="small" style="display: flex;">图片问答</van-button>
            </van-uploader>
            <van-button type="default" size="small">一键投诉</van-button>
        </div>
        <div class="input-box-area">
            <van-cell-group inset  class="input-content">
                <van-field rows="1" autosize  type="textarea"  />
                 <!-- <input type="textarea" class="input-content"   autosize="{minRows: 1, maxRows: 3 }" /> -->
            </van-cell-group>
            <van-button type="success"  class="send-btn">发送</van-button>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const fileList= ref([{ url: 'https://fastly.jsdelivr.net/npm/@vant/assets/leaf.jpeg' }]);

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