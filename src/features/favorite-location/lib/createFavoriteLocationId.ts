import type { Location } from "@/entities/location";

export function createFavoriteLocationId(location: Location): string {
  return `${location.lat},${location.lon}`;
}
