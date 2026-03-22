import { getCurrentWeather } from "@/shared/api";
import { queryOptions } from "@tanstack/react-query";
import { mapOpenWeatherCurrentResponseToCurrentWeather } from "../lib/mapOpenWeatherCurrentResponseToCurrentWeather";

export const currentWeatherQueries = {
  getCurrentWeatherByCoord: (lat: number, lon: number) => {
    return queryOptions({
      queryKey: ["weather", "current", lat, lon],
      queryFn: async () => {
        const result = await getCurrentWeather(lat, lon);
        return mapOpenWeatherCurrentResponseToCurrentWeather(result);
      },
    });
  },
};
