<template>
    <div style="height: 4px;"></div>
    <div class="weather-content">
        <div class="weather-item">
            <div class="day-time">
                <p style="margin: 0 15px;">11月19日</p>
                <p>星期三</p>
            </div>
            <div class="day-weather">
                <img src="@/assets/weather/晴.png" alt="">
                <p>晴</p>
            </div>
            <div class="temperature">4-11℃</div>
        </div>
        <div class="weather-item">
            <div class="day-time">
                <p style="margin: 0 15px;">11月19日</p>
                <p>星期四</p>
            </div>
            <div class="day-weather">
                <img src="@/assets/weather/晴.png" alt="">
                <p>多云</p>
            </div>
            <div class="temperature">14-19℃</div>
        </div>
    </div>
</template>

<script setup lang="ts">

</script>

<style lang="less" scoped>
// 组件样式
.weather-content {
    background-image: linear-gradient(to top, #48c6ef 0%, #6f86d6 100%);
    color: #fff;
    border-radius: 4px;

    .weather-item {
        display: flex;
        justify-content: space-around;
        align-items: center;
        padding: 7px 0;
        // font-size: 16px;

        .day-time {
            font-size: 15px;
            display: flex;
            align-items: center;
            flex: 2;

        }

        .day-weather {
            display: flex;
            flex: 1;
            align-items: center;

            p {
                font-size: 15px;
                margin-left: 5px;
            }

            img {
                width: 30px;
                height: 30px;
            }
        }

        .temperature {
            font-size: 18px;
            flex: 1;
        }
    }
}
</style>