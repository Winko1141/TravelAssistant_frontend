<template>
    <div style="height: 4px;"></div>
  <div class="result-item">
    <div>
        <p class="query-time">9:00</p>
        <p class="station-name">丽水</p>
    </div>
    <div class="train">
        <p>1小时03分</p>
        <p>D7336</p>
    </div>
    <div>
        <p class="query-time">10:03</p>
        <p class="station-name">苍南</p>
    </div>
    <div>
        <p class="price">￥89</p>
    </div>
  </div>
</template>

<script setup lang="ts">

</script>

<style lang="less" scoped>
// 组件样式
.result-item {
    background-color: #fff;
    display: flex;
    align-items: center;
    justify-content: space-around;
    padding: 7px 5px;
    border-top: 1px solid #e0e0e0;

    .query-time {
        font-size: 14px;
        color: #333;
        font-weight: bold;
    }

    .station-name {
        font-size: 14px;
        font-weight: bold;
    }
    .train {
        p {
            font-size: 13px;
        }
    }

    .price {
        font-size: 18px;
        color: #ff4444;
        font-weight: bold;
    }
}
</style>