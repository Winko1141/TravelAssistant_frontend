<template>
  <van-nav-bar title="投诉" left-text="返回" left-arrow @click-left="onClickLeft" placeholder />
  <div class="complaint-page">
    <div class="complaint">
      <p class="title">你要投诉谁</p>
      <van-field is-link readonly placeholder="选择投诉对象" @click="showPicker = true" />
      <van-popup v-model:show="showPicker" destroy-on-close round position="bottom">
        <van-picker :columns="objects" @cancel="showPicker = false" @confirm="onConfirm" />
      </van-popup>
    </div>
    <div class="complaint">
      <p class="title">请告诉我们你遇到的问题</p>
      <van-field placeholder="请输入投诉内容" type="textarea" class="input-textarea" />
    </div>
    <div class="complaint">
      <p class="title">请上传相关图片（可选）</p>
      <van-uploader :max-count="3" />
    </div>
    <div class="complaint">
      <p class="title">你的诉求是</p>
      <van-field placeholder="请输入你的诉求" type="textarea" class="input-textarea" />
    </div>
    <div class="complaint">
      <p class="title">我们需要了解您的个人信息，用于核实事件以及告知您处理结果</p>
      <van-cell-group inset>
        <!-- 输入任意文本 -->
        <van-field placeholder="请输入姓名" label="你的姓名" />
        <!-- 输入手机号，调起手机号键盘 -->
        <van-field placeholder="请输入手机号" type="tel" label="联系方式" />
      </van-cell-group>
    </div>
    <div class="complaint">
      <van-button type="primary" size="small">提交投诉</van-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const onClickLeft = () => history.back();
// 投诉对象选择
const objects = ref([
  { text: '导游', value: 'guide' },
  { text: '司机', value: 'driver' },
  { text: '酒店', value: 'hotel' },
  { text: '景点', value: 'attraction' },
  { text: '其他', value: 'other' },
])
const showPicker = ref(false);
const onConfirm = () => {
  showPicker.value = false;

};

</script>

<style lang="less" scoped>

.complaint-page {
  // background-color: #f5f5f5;
  min-height: 100vh;
  padding-bottom: 30px;
}

.complaint {
  margin-bottom: 15px;
  background-color: #fff;
  padding: 15px;
  border-radius: 12px;
  margin: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  transition: transform 0.2s, box-shadow 0.2s;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }

  .title {
    font-size: 16px;
    font-weight: 600;
    color: #333;
    margin-bottom: 12px;
    padding-bottom: 8px;
    border-bottom: 1px solid #f0f0f0;
  }

  .input-textarea {
    border: 1px solid #e0e0e0;
    border-radius: 8px;
    transition: border-color 0.3s;
    
    :deep(.van-field__control) {
      border-radius: 8px;
    }
    
    &:focus-within {
      border-color: #4cae4c;
      box-shadow: 0 0 0 2px rgba(76, 174, 76, 0.1);
    }
  }
  
  .van-button {
    width: 100%;
    height: 45px;
    border-radius: 25px;
    font-size: 16px;
    font-weight: 500;
    background-color: #4cae4c;
    border-color: #4cae4c;
    transition: all 0.3s;
    
    &:hover {
      background-color: #45a049;
      border-color: #45a049;
      transform: translateY(-1px);
    }
    
    &:active {
      transform: translateY(0);
    }
  }
}

// 美化输入框样式
:deep(.van-field) {
  border-radius: 8px;
  overflow: hidden;
  
  &--readonly {
    background-color: #f9f9f9;
    transition: background-color 0.3s;
    
    &:active {
      background-color: #f0f0f0;
    }
  }
  
  &__control {
    font-size: 15px;
    color: #333;
  }
  
  &__label {
    color: #666;
    font-size: 14px;
  }
}

// 美化上传组件
:deep(.van-uploader) {
  .van-uploader__upload {
    border-radius: 8px;
    border: 2px dashed #e0e0e0;
    transition: all 0.3s;
    
    &:hover {
      border-color: #4cae4c;
      background-color: #f9fbf9;
    }
  }
  
  .van-uploader__preview {
    border-radius: 8px;
    overflow: hidden;
  }
}

// 美化单元格组
:deep(.van-cell-group--inset) {
  border-radius: 8px;
  overflow: hidden;
}

:deep(.van-cell) {
  border-bottom-color: #f0f0f0;
  
  &:last-child {
    border-bottom: none;
  }
}

</style>