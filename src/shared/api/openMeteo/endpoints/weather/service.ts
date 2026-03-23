import { openMeteoApiClient } from "../../client";
import {
  openMeteoWeatherResponseSchema,
  type OpenMeteoWeatherResponse,
} from "./contracts";

export async function getWeather(
  lat: number,
  lon: number,
): Promise<OpenMeteoWeatherResponse> {
  const data = await openMeteoApiClient.get<OpenMeteoWeatherResponse>(
    "v1/forecast",
    {
      searchParams: {
        latitude: lat,
        longitude: lon,
        daily: "temperature_2m_max,temperature_2m_min",
        hourly: "temperature_2m",
        current: "temperature_2m",
        models: "kma_seamless",
        timezone: "Asia/Tokyo",
        timeformat: "unixtime",
      },
    },
  );

  return openMeteoWeatherResponseSchema.parse(data);
}
