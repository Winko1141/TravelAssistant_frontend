export const handleMessage = async (
  message: string,
  onMessage: (content: string) => void,
  onDone?: () => void
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

    // 🌦 普通 JSON（比如天气）
    if (contentType?.includes('application/json')) {
      const res = await response.json();
      onDone && onDone();  // ✅ 结束 loading
      return res;
    }

    // 💬 流式
    if (contentType?.includes('text/event-stream')) {
      const reader = response.body?.getReader();
      const decoder = new TextDecoder();

      let buffer = ''; // ✅ 关键：防止 JSON 被截断

      while (true) {
        const { done, value } = await reader!.read();

        if (done) {
          onDone && onDone(); // ✅ 流结束
          break;
        }

        buffer += decoder.decode(value, { stream: true });

        const lines = buffer.split('\n');
        buffer = lines.pop() || '';

        for (const line of lines) {
          try {
            const data = JSON.parse(line);
            const content = data.choices?.[0]?.delta?.content;
            if (content) {
              onMessage(content); // ✅ 实时返回
            }
          } catch (err) {
            console.error('解析流数据失败:', err);
          }
        }
      }
    }

  } catch (error) {
    console.error('请求失败:', error);
    onDone && onDone(); // ❗防止 loading 卡住
    throw error;
  }
};