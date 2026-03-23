import type { OpenMeteoWeatherResponse } from "@/shared/api";
import type { ForecastWeather } from "../model/types";

export function mapOpenMeteoWeatherResponseToForecastWeather(
  weather: OpenMeteoWeatherResponse,
): ForecastWeather {
  return {
    timezoneOffset: weather.utc_offset_seconds,
    hourly: weather.hourly.time.flatMap((timestamp, index) => {
      const temperature = weather.hourly.temperature_2m[index];

      if (temperature === undefined) {
        return [];
      }

      return {
        timestamp,
        temperature,
      };
    }),
    daily: weather.daily.time.flatMap((timestamp, index) => {
      const minTemperature = weather.daily.temperature_2m_min[index];
      const maxTemperature = weather.daily.temperature_2m_max[index];

      if (minTemperature === undefined || maxTemperature === undefined) {
        return [];
      }

      return {
        timestamp,
        minTemperature,
        maxTemperature,
      };
    }),
  };
}
