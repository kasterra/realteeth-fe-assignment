import { getCurrentWeather, getForecastWeather } from "@/shared/api";
import { queryOptions } from "@tanstack/react-query";
import { mapOpenWeatherCurrentResponseToCurrentWeather } from "../lib/mapOpenWeatherCurrentResponseToCurrentWeather";
import { mapOpenWeatherForecastResponseToForecastWeather } from "../lib/mapOpenWeatherForecastResponseToForecastWeather";

export const weatherQueries = {
  getCurrentWeatherByCoord: (lat: number, lon: number) => {
    return queryOptions({
      queryKey: ["weather", "current", lat, lon],
      queryFn: async () => {
        const result = await getCurrentWeather(lat, lon);
        return mapOpenWeatherCurrentResponseToCurrentWeather(result);
      },
    });
  },
  getForecastWeatherByCoord: (lat: number, lon: number) => {
    return queryOptions({
      queryKey: ["weather", "forecast", lat, lon],
      queryFn: async () => {
        const result = await getForecastWeather(lat, lon);
        return mapOpenWeatherForecastResponseToForecastWeather(result);
      },
    });
  },
};
