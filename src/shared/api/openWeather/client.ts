import ky from "ky";
import { env } from "@/shared/config/env";

const OPEN_WEATHER_API_BASE_URL = "https://api.openweathermap.org";

const client = ky.create({
  prefixUrl: OPEN_WEATHER_API_BASE_URL,
  searchParams: {
    appid: env.OPEN_WEATHER_API_KEY,
    units: "metric",
    lang: "kr",
  },
  timeout: 10_000,
  hooks: {
    beforeError: [
      (error) => {
        const { response } = error;

        if (!response) {
          error.name = "WeatherApiNetworkError";
          error.message = "날씨 API 요청 중 네트워크 오류가 발생했습니다.";
          return error;
        }

        error.name = "WeatherApiError";
        error.message = `날씨 API 요청에 실패했습니다. (status: ${response.status})`;

        return error;
      },
    ],
  },
});

export const openWeatherApiClient = {
  get: <T>(url: string, options?: Parameters<typeof client.get>[1]) =>
    client.get(url, options).json<T>(),
};
