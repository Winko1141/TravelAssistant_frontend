<template>
    <!-- <div style="height: 4px;"></div>
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
    </div> -->
    <div class="weather-bubble">
    <div class="header">
      📍 {{ data.city }} · 天气预报
    </div>

    <div
      class="day-item"
      v-for="(item, index) in data.forecast"
      :key="index"
    >
      <div class="date">
        {{ item.date }} {{ item.dayOfWeek }}
      </div>

      <div class="info">
        <i
          class="qi"
          :class="`qi-${item.dailyIconDay}`"
        ></i>
        <span class="weather">{{ item.weather }}</span>
        <span class="temp">{{ item.temperature }}</span>
      </div>
    </div>
    </div>
</template>

<script setup lang="ts">
defineProps<{
  data: {
    city: string
    forecast: {
      date: string
      dayOfWeek: string
      dailyIconDay: string
      weather: string
      temperature: string
    }[]
  }
}>()


</script>

<style lang="less" scoped>
// 组件样式
// 最新版本
.weather-bubble {
  background: linear-gradient(135deg, #5ee7df, #b490ca);
  border-radius: 12px;
  padding: 12px;
  margin-left: 8px;
  color: #fff;
  max-width: 320px;
}

.header {
  font-weight: bold;
  margin-bottom: 8px;
}

.day-item {
  background: rgba(255, 255, 255, 0.15);
  border-radius: 8px;
  padding: 6px 8px;
  margin-top: 6px;
}

.date {
  font-size: 13px;
  opacity: 0.9;
}

.info {
  display: flex;
  align-items: center;
  margin-top: 4px;
  gap: 6px;

    i.qi {
    font-size: 28px;
    color: #fff;
  }

  .weather {
    font-size: 14px;
  }

  .temp {
    margin-left: auto;
    font-weight: bold;
  }
}

// 旧版本
// .weather-content {
//     background-image: linear-gradient(to top, #48c6ef 0%, #6f86d6 100%);
//     color: #fff;
//     border-radius: 4px;

//     .weather-item {
//         display: flex;
//         justify-content: space-around;
//         align-items: center;
//         padding: 7px 0;
//         // font-size: 16px;

//         .day-time {
//             font-size: 15px;
//             display: flex;
//             align-items: center;
//             flex: 2;

//         }

//         .day-weather {
//             display: flex;
//             flex: 1;
//             align-items: center;

//             p {
//                 font-size: 15px;
//                 margin-left: 5px;
//             }

//             img {
//                 width: 30px;
//                 height: 30px;
//             }
//         }

//         .temperature {
//             font-size: 18px;
//             flex: 1;
//         }
//     }
// }

</style>