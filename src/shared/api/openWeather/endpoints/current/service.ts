import { openWeatherApiClient } from "../../client";
import {
  openWeatherCurrentResponseSchema,
  type OpenWeatherCurrentResponse,
} from "./contracts";

export async function getCurrentWeather(
  lat: number,
  lon: number,
): Promise<OpenWeatherCurrentResponse> {
  const data = await openWeatherApiClient.get<OpenWeatherCurrentResponse>(
    "data/2.5/weather",
    {
      searchParams: {
        lat,
        lon,
      },
    },
  );

  return openWeatherCurrentResponseSchema.parse(data);
}
