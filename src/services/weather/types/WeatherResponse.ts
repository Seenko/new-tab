import { CurrentWeather } from '@/services/weather/types/CurrentWeather'
import { MinutelyWeather } from '@/services/weather/types/MinutelyWeather'
import { HourlyWeather } from '@/services/weather/types/HourlyWeather'
import { DailyWeather } from '@/services/weather/types/DailyWeather'
import { Alert } from '@/services/weather/types/Alert'

export interface WeatherResponse {
  lat: number;
  lon: number;
  timezone: string;
  timezone_offset: number;
  current: CurrentWeather;
  minutely: MinutelyWeather[];
  hourly: HourlyWeather[];
  daily: DailyWeather[];
  alerts: Alert[];
}