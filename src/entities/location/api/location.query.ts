import { getGeocodeResult } from "@/shared/api";
import { queryOptions } from "@tanstack/react-query";
import { mapOpenCageGeocodeResponseToLocation } from "../lib/mapOpenCageGeocodeResponseToLocation";

export const locationQueries = {
  geocode: (q: string) => {
    return queryOptions({
      queryKey: ["location", "geocode", q],
      queryFn: async () => {
        const result = await getGeocodeResult(q);
        const location = mapOpenCageGeocodeResponseToLocation(result);
        return location;
      },
      staleTime: 1000 * 60 * 60 * 24, // 24시간
      gcTime: 1000 * 60 * 60 * 24,
    });
  },
  reverseGeocode: (lat: number, lon: number) => {
    return queryOptions({
      queryKey: ["location", "name", lat, lon],
      queryFn: async () => {
        const result = await getGeocodeResult(`${lat},${lon}`);
        const location = mapOpenCageGeocodeResponseToLocation(result);
        return location;
      },
      staleTime: 1000 * 60 * 10,
    });
  },
};
