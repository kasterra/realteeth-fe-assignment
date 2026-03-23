import type { OpenMeteoWeatherResponse } from "@/shared/api";
import type { CurrentWeather } from "../model/types";

export function mapOpenMeteoWeatherResponseToCurrentWeather(
  weather: OpenMeteoWeatherResponse,
): CurrentWeather {
  return {
    measuredAt: weather.current.time,
    timezoneOffset: weather.utc_offset_seconds,
    temperature: weather.current.temperature_2m,
  };
}
