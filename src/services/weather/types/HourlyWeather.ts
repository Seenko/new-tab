import { Weather } from '@/services/weather/types/Weather';

export interface HourlyWeather extends Weather {
  pop: number;
}