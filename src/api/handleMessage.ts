import request from "./index"

// 定义消息类型
export interface ChatMessage {
  chatMessage: string
  [key: string]: any
}

export interface ChatResponse {
  code: number
  data: any
  message: string
}

// 发送消息到意图分流接口（流式）
export const handleMessage = async (
  message: string, 
  onMessage: (content: string) => void
) => {
  try {
    const response = await fetch('http://localhost:7000/api/handleMessage', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message: message  
      })
    });
    const contentType = response.headers.get('content-type');
    console.log('📦 Content-Type:', contentType);
    // 🌦 天气：普通 JSON
  if (contentType?.includes('application/json')) {
    const res = await response.json();
    return res; // 交给上层处理
  }

  // 💬 聊天：流式
  if (contentType?.includes('text/event-stream')) {
    const reader = response.body?.getReader();
    const decoder = new TextDecoder();

    while (true) {
      const { done, value } = await reader!.read();
      if (done) break;

      const chunk = decoder.decode(value);
      const lines = chunk.split('\n').filter(Boolean);

      for (const line of lines) {
        try {
          const data = JSON.parse(line);
          const content = data.choices?.[0]?.delta?.content;
          if (content) onMessage(content);
        } catch (err) {
          console.error('解析流数据失败:', err);
        }
      }
    }
  }
  //   if (!response.ok) {
  //     throw new Error(`HTTP error! status: ${response.status}`);
  //   }

  //   const reader = response.body?.getReader();
  //   const decoder = new TextDecoder();

  //   while (true) {
  //     const { done, value } = await reader!.read();
  //     if (done) break;
      
  //     const chunk = decoder.decode(value);
  //     const lines = chunk.split('\n').filter(line => line.trim());
      
  //     for (const line of lines) {
  //       try {
  //         const data = JSON.parse(line);
  //         const content = data.choices?.[0]?.delta?.content;
  //         if (content) {
  //           onMessage(content);  // 逐字返回给前端
  //         }
  //       } catch (e) {
  //         console.error('JSON 解析错误:', e);
  //       }
  //     }
  //   }
  } catch (error) {
    console.error('请求失败:', error);
    throw error;
  }
};