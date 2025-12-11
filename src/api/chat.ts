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

// 发送聊天消息（流式）
export const chatMessage = async (
  message: string, 
  onMessage: (content: string) => void
) => {
  try {
    const response = await fetch('http://localhost:7000/api/chatMessage', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        chatMessage: message
      })
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const reader = response.body?.getReader();
    const decoder = new TextDecoder();

    while (true) {
      const { done, value } = await reader!.read();
      if (done) break;
      
      const chunk = decoder.decode(value);
      const lines = chunk.split('\n').filter(line => line.trim());
      
      for (const line of lines) {
        try {
          const data = JSON.parse(line);
          const content = data.choices?.[0]?.delta?.content;
          if (content) {
            onMessage(content);  // 逐字返回给前端
          }
        } catch (e) {
          console.error('JSON 解析错误:', e);
        }
      }
    }
  } catch (error) {
    console.error('流式请求失败:', error);
    throw error;
  }
};