import { WeatherIcon } from '@/services/weather/types/WeatherIcon'

export interface WeatherDescriptor {
  id: number;
  main: string;
  description: string;
  icon: WeatherIcon;
}