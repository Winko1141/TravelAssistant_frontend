<template>
  <div class="tickets-bubble">
    <!-- 标题 -->
    <div class="header">
      🚄 {{ data.start }} → {{ data.end }}
    </div>

    <!-- 日期信息 -->
    <div class="date-info">
      <span>{{ data.date }}</span>
      <span>{{ data.dayOfWeek }}</span>
      <span class="ticket-count">共{{ data.ticketCount }}班</span>
    </div>

    <!-- 车票列表 -->
    <div class="tickets-list">
      <div 
        v-for="(ticket, index) in data.tickets" 
        :key="index"
        class="ticket-item"
      >
        <!-- 出发时间和站点 -->
        <div class="station departure">
          <p class="time">{{ ticket.departuretime }}</p>
          <p class="name">{{ ticket.station }}</p>
        </div>

        <!-- 中间信息：耗时和车次 -->
        <div class="duration-info">
          <p class="cost-time">{{ ticket.costtime }}</p>
          <p class="train-info">
            <span class="train-no">{{ ticket.trainno }}</span>
            <!-- <span class="train-type">{{ ticket.type }}</span> -->
          </p>
        </div>

        <!-- 到达时间和站点 -->
        <div class="station arrival">
          <p class="time">{{ ticket.arrivaltime }}</p>
          <p class="name">{{ ticket.endstation }}</p>
        </div>

        <!-- 价格信息 -->
        <!-- <div class="price-info">
          <div v-if="ticket.priceyd !== '无'" class="price-item">
            <span class="seat-type">一等座</span>
            <span class="price">{{ ticket.priceyd }}</span>
          </div>
          <div v-if="ticket.priceed !== '无'" class="price-item">
            <span class="seat-type">二等座</span>
            <span class="price">{{ ticket.priceed }}</span>
          </div>
        </div> -->

        <!-- 终点标签 -->
        <!-- <div v-if="ticket.isend === '是'" class="terminal-badge">
          终
        </div> -->
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  data: {
    start: string
    end: string
    date: string
    dayOfWeek: string
    ticketCount: number
    tickets: {
      trainno: string
      type: string
      isend: string
      station: string
      endstation: string
      departuretime: string
      arrivaltime: string
      costtime: string
      priceyd: string
      priceed: string
      pricewz: string
    }[]
  }
}>()
</script>

<style lang="less" scoped>
.tickets-bubble {
  background: linear-gradient(135deg, #667eea, #764ba2);
  border-radius: 12px;
  padding: 12px 16px;
  margin-left: 4px;
  margin-bottom: 12px;
  color: #fff;
  max-width: calc(100% - 20px);
  width: 100%;
  max-height: 400px;
  overflow-y: auto;

  &::-webkit-scrollbar {
    width: 4px;
  }

  &::-webkit-scrollbar-thumb {
    background: rgba(255, 255, 255, 0.3);
    border-radius: 2px;
  }
}

.header {
  font-weight: bold;
  font-size: 18px;
  margin-bottom: 8px;
  padding-bottom: 8px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
}

.date-info {
  display: flex;
  gap: 12px;
  font-size: 12px;
  margin-bottom: 12px;
  opacity: 0.9;

  .ticket-count {
    margin-left: auto;
    font-weight: bold;
  }
}

.tickets-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.ticket-item {
  background: rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  padding: 10px;
  display: flex;
  align-items: center;
  gap: 8px;
  position: relative;

  .station {
    flex: 1;
    text-align: center;
    min-width: 60px;

    .time {
      font-size: 16px;
      font-weight: bold;
      margin: 0;
    }

    .name {
      font-size: 12px;
      margin: 2px 0 0 0;
      opacity: 0.8;
    }

    &.departure {
      border-right: 2px solid rgba(255, 255, 255, 0.3);
      padding-right: 8px;
    }

    &.arrival {
      border-left: 2px solid rgba(255, 255, 255, 0.3);
      padding-left: 8px;
    }
  }

  .duration-info {
    flex: 0.8;
    text-align: center;

    .cost-time {
      font-size: 11px;
      margin: 0;
      opacity: 0.8;
    }

    .train-info {
      display: flex;
      flex-direction: column;
      gap: 2px;
      margin-top: 4px;

      .train-no {
        font-size: 13px;
        font-weight: bold;
      }

      .train-type {
        font-size: 11px;
        background: rgba(255, 255, 255, 0.2);
        padding: 2px 6px;
        border-radius: 3px;
        display: inline-block;
      }
    }
  }

  .price-info {
    flex: 1.2;
    display: flex;
    flex-direction: column;
    gap: 4px;

    .price-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 12px;
      padding: 2px 6px;
      background: rgba(255, 255, 255, 0.15);
      border-radius: 4px;

      .seat-type {
        opacity: 0.8;
      }

      .price {
        font-weight: bold;
        color: #ffd700;
      }
    }
  }

  .terminal-badge {
    position: absolute;
    top: 6px;
    right: 6px;
    background: rgba(255, 215, 0, 0.8);
    color: #764ba2;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 12px;
    font-weight: bold;
  }
}
</style>