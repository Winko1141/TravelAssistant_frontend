<template>
    <div style="height: 4px;"></div>
    <div class="goods-content">
        <p class="title">以下是为你推荐的商品：</p>

        <div class="goods-list">
            <div class="goods-item">
                <img src="@/assets/222.jpg" alt="">
                <!-- <van-image width="100%" height="140%" fit="cover" border-radius="4px"
                src="https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg" /> -->
                <p class="goods-title  text-show">商品名称商品名称商品名称商品名称商品名称商品名称商品名称</p>
                <p class="goods-price">¥100</p>
            </div>
            <div class="goods-item">
                <img src="@/assets/222.jpg" alt="">
                <!-- <van-image width="100%" height="140%" fit="cover" border-radius="4px"
                src="https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg" /> -->
                <p class="goods-title  text-show">商品名称</p>
                <p class="goods-price">¥100</p>
            </div>
            <div class="goods-item">
                <img src="@/assets/222.jpg" alt="">
                <!-- <van-image width="100%" height="140%" fit="cover" border-radius="4px"
                src="https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg" /> -->
                <p class="goods-title  text-show">商品名称商品名称商品名称商品名称商品名称商品名称商品名称</p>
                <p class="goods-price">¥100</p>
            </div>
            <div class="goods-item">
                <img src="@/assets/222.jpg" alt="">
                <!-- <van-image width="100%" height="140%" fit="cover" border-radius="4px"
                src="https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg" /> -->
                <p class="goods-title  text-show">商品名称商品名称商品名称商品名称商品名称商品名称商品名称</p>
                <p class="goods-price">¥100</p>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">

</script>

<style lang="less" scoped>
// 组件样式
.goods-content {
    background-color: #fff;
    border-radius: 4px;
    padding: 7px;

    .title {
        font-weight: bold;
        color: #310050;
    }

    .goods-list {
        display: flex;
        overflow-x: auto;
        gap: 7px;
        padding-top: 7px;

        .goods-item {
            width: 130px;
            background-color: #dde5d9;
            border-radius: 4px;
            display: flex;
            flex-direction: column;
            align-items: center;
            flex-shrink: 0;

            img {
                width: 120px;
                height: 140px;
                border-radius: 4px;
                object-fit: cover;
                margin: 6px;
            }

            .goods-title {
                font-size: 15px;
                font-weight: bold;
                line-height: 1.4;
                margin: 0 6px;
            }

            .goods-price {
                color: #e53935;
                font-size: 16px;
                font-weight: bold;
                margin: auto 0 6px 0;
            }
        }
    }


}
</style>