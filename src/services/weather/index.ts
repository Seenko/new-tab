import type { WeatherRequest } from '@/services/weather/types/WeatherRequest';
import type { WeatherResponse } from '@/services/weather/types/WeatherResponse';

import axios, { AxiosInstance } from 'axios';

const BASE_URL = import.meta.env.PUBLIC_WEATHER_API_ENDPOINT as string;
const BASE_TOKEN = import.meta.env.PUBLIC_WEATHER_API_TOKEN as string;

let instance: AxiosInstance;

const WeatherService = {
  init: (token?: string) => {
    instance = axios.create({
      baseURL: BASE_URL,
      timeout: 5000,
      params: {
        'appid':  token ? token : BASE_TOKEN
      }
    });
  },
  getWeather: (request: WeatherRequest): Promise<WeatherResponse> => {
    return instance.get('/onecall', {
      params: {
        lat: request.lat,
        lon: request.lon,
        exclude: request.exclude ? request.exclude.join(',') : '',
        units: request.units,
        lang: request.lang
      }
    }).then(response => response.data);
  }
};

export default WeatherService;