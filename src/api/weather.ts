import request from "./index"

// 定义天气查询请求类型
export interface WeatherQuery {
  weatherQuery: string
  [key: string]: any
}

// 定义单天天气响应类型
export interface SingleWeatherResponse {
  city: string
  date: string
  dayOfWeek: string
  dailyIconDay: string
  weather: string
  temperature: string
}

// 定义多天天气响应类型
export interface RangeWeatherResponse {
  city: string
  forecast: Array<{
    date: string
    dayOfWeek: string
    dailyIconDay: string
    weather: string
    temperature: string
  }>
}

// 定义统一的API响应类型
export interface WeatherResponse {
  code: number
  data: SingleWeatherResponse | RangeWeatherResponse
  message: string
}

// 查询天气（非流式）
export const queryWeather = async (query: string): Promise<WeatherResponse> => {
  try {
    const response = await request.post('/api/queryWeather', {
      weatherQuery: query
    })
    const responseData: WeatherResponse = response.data
    if (responseData.code !== 200) {
      throw new Error(responseData.message)
    }
    
    return responseData
  } catch (error) {
    console.error('天气查询失败:', error)
    throw error
  }
}