import ky from "ky";
import { env } from "@/shared/config/env";

const OPEN_CAGE_API_BASE_URL = "https://api.opencagedata.com";

const client = ky.create({
  prefixUrl: OPEN_CAGE_API_BASE_URL,
  searchParams: {
    key: env.OPENCAGE_API_KEY,
    countrycode: "kr",
  },
  timeout: 10_000,
  hooks: {
    beforeError: [
      (error) => {
        const { response } = error;

        if (!response) {
          error.name = "OpenCageApiNetworkError";
          error.message = "openCage API 요청 중 네트워크 오류가 발생했습니다.";
          return error;
        }

        error.name = "OpenCageApiError";
        error.message = `openCage API 요청에 실패했습니다. (status: ${response.status})`;

        return error;
      },
    ],
  },
});

export const openCageApiClient = {
  get: <T>(url: string, options?: Parameters<typeof client.get>[1]) =>
    client.get(url, options).json<T>(),
};
