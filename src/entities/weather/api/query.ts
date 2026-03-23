import { getWeather } from "@/shared/api";
import { queryOptions } from "@tanstack/react-query";
import { mapOpenMeteoWeatherResponseToCurrentWeather } from "../lib/mapOpenMeteoWeatherResponseToCurrentWeather";
import { mapOpenMeteoWeatherResponseToForecastWeather } from "../lib/mapOpenMeteoWeatherResponseToForecastWeather";

export const weatherQueries = {
  getWeatherByCoord: (lat: number, lon: number) => {
    return queryOptions({
      queryKey: ["weather", lat, lon],
      queryFn: () => getWeather(lat, lon),
    });
  },
  getCurrentWeatherByCoord: (lat: number, lon: number) => {
    return queryOptions({
      ...weatherQueries.getWeatherByCoord(lat, lon),
      select: mapOpenMeteoWeatherResponseToCurrentWeather,
    });
  },
  getForecastWeatherByCoord: (lat: number, lon: number) => {
    return queryOptions({
      ...weatherQueries.getWeatherByCoord(lat, lon),
      select: mapOpenMeteoWeatherResponseToForecastWeather,
    });
  },
};
