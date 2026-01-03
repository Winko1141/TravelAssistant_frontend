# 车票查询接口文档 (Tickts API Guide)

## 📋 概述

车票查询接口通过 **MessageController** 进行意图分流，支持自然语言查询。系统会自动识别用户输入中的查询意图，提取日期、出发城市和到达城市信息，然后调用火车票数据接口获取相关车次信息。

---

## 🔗 接口地址

**基础 URL**: `http://localhost:7000/api`

| 端点 | 方法 | 说明 |
|------|------|------|
| `/message` | POST | 统一消息处理接口（推荐）|
| `/tickts/query` | POST | 直接车票查询接口 |

---

## ✅ 推荐方式：使用 MessageController

### 请求格式

```bash
POST /api/message
Content-Type: application/json

{
  "message": "21号杭州到上海的火车票"
}
```

### 请求参数

| 参数 | 类型 | 说明 | 示例 |
|------|------|------|------|
| `message` | string | 用户自然语言查询 | "明天北京到天津的火车票" |

### 支持的查询方式

| 查询类型 | 示例 |
|---------|------|
| 具体日期 | "12月21号杭州到上海的火车票" |
| 相对日期 | "明天北京到天津的火车票" |
| 模糊日期 | "今天南京到宁波的火车票" |
| 只有月日 | "25号武汉到成都的火车票"（自动使用当前年份） |

### ✅ 成功响应 (HTTP 200)

```json
{
  "code": 200,
  "type": "tickts",
  "data": {
    "start": "杭州",
    "end": "上海",
    "date": "12月21号",
    "dayOfWeek": "星期五",
    "ticketCount": 45,
    "tickets": [
      {
        "trainno": "G1234",
        "type": "高铁",
        "isend": "是",
        "station": "杭州",
        "endstation": "上海",
        "departuretime": "08:30",
        "arrivaltime": "10:30",
        "costtime": "2小时",
        "priceyd": "100元",
        "priceed": "80元",
        "pricewz": "无"
      },
      {
        "trainno": "D5678",
        "type": "动车",
        "isend": "否",
        "station": "杭州",
        "endstation": "上海",
        "departuretime": "09:00",
        "arrivaltime": "11:45",
        "costtime": "2小时45分",
        "priceyd": "90元",
        "priceed": "70元",
        "pricewz": "50元"
      }
    ]
  },
  "message": "车票查询成功"
}
```

### ❌ 失败响应

```json
{
  "code": 500,
  "message": "未找到 2025-12-21 从杭州 到 上海 的车次"
}
```

---

## 📊 响应数据字段说明

### 顶层字段

| 字段 | 类型 | 说明 |
|------|------|------|
| `code` | number | 状态码（200=成功，500=失败） |
| `type` | string | 响应类型标识 |
| `data` | object | 返回的数据对象（仅成功时） |
| `message` | string | 消息描述 |

### data 对象字段

| 字段 | 类型 | 说明 |
|------|------|------|
| `start` | string | 出发城市 |
| `end` | string | 到达城市 |
| `date` | string | 格式化日期（如"12月21号"） |
| `dayOfWeek` | string | 星期几（星期一~星期日） |
| `ticketCount` | number | 总车次数 |
| `tickets` | array | 车次列表（最多返回10条） |

### ticket 对象字段

| 字段 | 类型 | 说明 |
|------|------|------|
| `trainno` | string | 车次号（如G1234） |
| `type` | string | 车型（高铁、动车、普速等） |
| `isend` | string | 是否终点（是/否） |
| `station` | string | 出发站名 |
| `endstation` | string | 到达站名 |
| `departuretime` | string | 出发时间（HH:MM） |
| `arrivaltime` | string | 到达时间（HH:MM） |
| `costtime` | string | 耗时 |
| `priceyd` | string | 一等座价格 |
| `priceed` | string | 二等座价格 |
| `pricewz` | string | 无座价格 |

## 💡 使用建议

### ✅ 最佳实践

1. **使用自然语言查询** - 系统会自动解析用户意图
   ```
   ✅ 好的：  "明天北京到上海的高铁"
   ✅ 好的：  "下周五杭州到南京的火车票"
   ✅ 好的：  "12月25号武汉到成都的票"
   ```

2. **处理失败情况** - 检查 `code` 字段
   ```typescript
   if (result.code === 200) {
     // 处理成功
   } else {
     // 显示错误消息
     toast.error(result.message)
   }
   ```

3. **处理大量结果** - API 最多返回10条记录
   ```typescript
   const { ticketCount, tickets } = result.data
   console.log(`共${ticketCount}班，显示前${tickets.length}班`)
   ```

### ⚠️ 注意事项

1. **日期格式** - 自动转换相对日期
   - "今天" → 当前日期
   - "明天" → 明天日期
   - "下周一" → 下周一
   - 只输入月日时自动使用当前年份

2. **城市名称** - 使用中文全名
   ```
   ✅ 杭州    ❌ hz
   ✅ 北京    ❌ bj
   ✅ 上海    ❌ sh
   ```

3. **错误处理** - 常见错误
   ```
   "未找到 2025-12-21 从杭州 到 上海 的车次"
   → 该日期可能没有班次或日期超出查询范围
   
   "解析失败"
   → 输入格式有误，请重新输入
   ```

4. **性能优化** - 加载状态管理
   ```typescript
   loading.value = true
   // 发送请求
   loading.value = false  // 请在 finally 中设置
   ```

---

## 🔄 直接调用接口方式（可选）

如果不想通过 MessageController 进行分流，也可直接调用：

```bash
POST /api/tickts/query
Content-Type: application/json

{
  "ticktsQuery": "明天北京到天津的火车票"
}
```

返回格式相同，但不需要意图识别。

---

## 📞 常见问题

### Q: 为什么有时查询返回 0 条结果？
**A**: 某些日期可能没有班次运行，或查询时间点该班次已售罄。建议用户尝试其他日期或城市。

### Q: 票价什么时候更新？
**A**: 数据来自第三方 API，更新频率取决于数据源（通常为实时或每小时更新）。

### Q: 支持哪些城市查询？
**A**: 支持所有有火车站的城市，使用中文全名即可。

### Q: 可以查询多少天的票？
**A**: 通常支持查询 30-60 天内的车票，超出范围会返回错误。

---

## 🔐 错误代码参考

| 状态码 | 说明 | 处理方式 |
|--------|------|--------|
| 200 | 查询成功 | 正常显示结果 |
| 400 | 请求参数错误 | 检查输入格式 |
| 500 | 服务器错误 | 显示错误信息，建议重试 |

---

## 📞 后端联系方式

如有问题或需要调试，请查看以下文件：
- 主文件：[controller/tickts.js](controller/tickts.js)
- 分流层：[controller/messageController.js](controller/messageController.js)
- 路由配置：[routes/message.js](routes/message.js)
