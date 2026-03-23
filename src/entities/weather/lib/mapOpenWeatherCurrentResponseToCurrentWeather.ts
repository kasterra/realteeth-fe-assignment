import type { OpenWeatherCurrentResponse } from "@/shared/api";
import type { CurrentWeather } from "../model/types";

export function mapOpenWeatherCurrentResponseToCurrentWeather(
  current: OpenWeatherCurrentResponse,
): CurrentWeather {
  return {
    measuredAt: current.dt,
    timezoneOffset: current.timezone,
    temperature: current.main.temp,
  };
}
