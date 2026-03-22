export interface CurrentWeather {
  measuredAt: number;
  timezoneOffset: number;
  temperature: number;
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
