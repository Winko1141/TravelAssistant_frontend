<template>
  <div class="content">
    <!-- 顶部区域 -->
    <top></top>
    <!-- 默认问题区域 -->
    <defaultQuestion></defaultQuestion>
  </div>
</template>

<script setup lang="ts">
import top from '@/page/component/top/top.vue'
import defaultQuestion from '@/page/component/defaultQuestion/defualtQuestion.vue'

</script>

<style lang="less" scoped>
.content {
  padding: 0 15px;
}
</style>