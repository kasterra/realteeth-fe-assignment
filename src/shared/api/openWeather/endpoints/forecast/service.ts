import { openWeatherApiClient } from "../../client";
import {
  openWeatherForecastResponseSchema,
  type OpenWeatherForecastResponse,
} from "./contracts";

export async function getForecastWeather(
  lat: number,
  lon: number,
): Promise<OpenWeatherForecastResponse> {
  const data = await openWeatherApiClient.get<OpenWeatherForecastResponse>(
    "data/2.5/forecast",
    {
      searchParams: {
        lat,
        lon,
      },
    },
  );

  return openWeatherForecastResponseSchema.parse(data);
}
