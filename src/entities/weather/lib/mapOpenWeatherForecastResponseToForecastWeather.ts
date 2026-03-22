import type { OpenWeatherForecastResponse } from "@/shared/api";
import type { ForecastWeather } from "../model/types";

export function mapOpenWeatherForecastResponseToForecastWeather(
  forecast: OpenWeatherForecastResponse,
): ForecastWeather {
  return {
    timezoneOffset: forecast.city.timezone,
    hourly: forecast.list.map((forecastItem) => ({
      timestamp: forecastItem.dt,
      temperature: forecastItem.main.temp,
      minTemperature: forecastItem.main.temp_min,
      maxTemperature: forecastItem.main.temp_max,
    })),
  };
}
