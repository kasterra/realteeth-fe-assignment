import ky from "ky";

const OPEN_METEO_API_BASE_URL = "https://api.open-meteo.com";

const client = ky.create({
  prefixUrl: OPEN_METEO_API_BASE_URL,
  timeout: 10_000,
  hooks: {
    beforeError: [
      (error) => {
        const { response } = error;

        if (!response) {
          error.name = "OpenMeteoApiNetworkError";
          error.message = "open-meteo API 요청 중 네트워크 오류가 발생했습니다.";
          return error;
        }

        error.name = "OpenMeteoApiError";
        error.message = `open-meteo API 요청에 실패했습니다. (status: ${response.status})`;

        return error;
      },
    ],
  },
});

export const openMeteoApiClient = {
  get: <T>(url: string, options?: Parameters<typeof client.get>[1]) =>
    client.get(url, options).json<T>(),
};
