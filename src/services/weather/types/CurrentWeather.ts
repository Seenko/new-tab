import { Weather } from '@/services/weather/types/Weather'

export interface CurrentWeather extends Weather {
  sunrise: number;
  sunset: number;
}