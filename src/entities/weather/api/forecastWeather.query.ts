import { getForecastWeather } from "@/shared/api";
import { queryOptions } from "@tanstack/react-query";
import { mapOpenWeatherForecastResponseToForecastWeather } from "../lib/mapOpenWeatherForecastResponseToForecastWeather";

export const forecastWeatherQueries = {
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
