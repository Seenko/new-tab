import { WeatherDescriptor } from '@/services/weather/types/WeatherDescriptor'

export interface DailyWeather {
  dt: number;
  sunrise: number;
  sunset: number;
  moonrise: number;
  moonset: number;
  moon_phase: number;
  temp: {
    morn: number;
    day: number;
    eve: number;
    night: number;
    min: number;
    max: number;
  },
  feels_like: {
    morn: number;
    day: number;
    eve: number;
    night: number;
  },
  pressure: number;
  humidity: number;
  dew_point: number;
  wind_speed: number;
  wind_gust?: number;
  wind_deg: number;
  clouds: number;
  uvi: number;
  pop: number;
  rain?: number;
  snow?: number;
  weather: WeatherDescriptor[];
}