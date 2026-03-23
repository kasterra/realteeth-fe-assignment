import { getLocationCatalog } from "@/shared/api/location-catalog/service";
import { queryOptions } from "@tanstack/react-query";

export const locationSearchQueries = {
  search: (query: string) => {
    return queryOptions({
      queryKey: ["location-catalog", query],
      queryFn: async () => {
        const catalog = await getLocationCatalog();
        const normalizedQuery = query.trim().toLowerCase();

        return catalog.filter((locationName) =>
          locationName.toLowerCase().includes(normalizedQuery),
        );
      },
      staleTime: Infinity,
      gcTime: Infinity,
    });
  },
};
