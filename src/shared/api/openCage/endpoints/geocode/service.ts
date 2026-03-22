import { openCageApiClient } from "../../client";
import {
  openCageGeocodeResponseSchema,
  type OpenCageGeocodeResponse,
} from "./contracts";

export async function getGeocodeResult(
  q: string,
): Promise<OpenCageGeocodeResponse> {
  const data = await openCageApiClient.get<OpenCageGeocodeResponse>(
    "geocode/v1/json",
    {
      searchParams: {
        q,
      },
    },
  );
  return openCageGeocodeResponseSchema.parse(data);
}
