import type { OpenCageGeocodeResponse } from "@/shared/api";
import type { Location } from "../model/types";

export function mapOpenCageGeocodeResponseToLocation(
  response: OpenCageGeocodeResponse,
): Location {
  const firstResult = response.results[0];

  if (!firstResult) {
    throw new Error("OpenCage 응답에 위치 결과가 없습니다.");
  }

  return {
    name: firstResult.formatted,
    lat: firstResult.geometry.lat,
    lon: firstResult.geometry.lng,
  };
}
