export interface CurrentWeather {
  measuredAt: number;
  timezoneOffset: number;
  temperature: number;
  minTemperature: number;
  maxTemperature: number;
}

export interface ForecastWeather {
  timezoneOffset: number;
  hourly: {
    timestamp: number;
    temperature: number;
    minTemperature: number;
    maxTemperature: number;
  }[];
}
