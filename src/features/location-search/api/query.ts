import { getLocationCatalog } from "@/shared/api/location-catalog/service";
import { queryOptions } from "@tanstack/react-query";

export const locationSearchQueries = {
  getCatalog: () =>
    queryOptions({
      queryKey: ["location-catalog"],
      queryFn: getLocationCatalog,
      staleTime: Infinity,
      gcTime: Infinity,
    }),
  search: (query: string) =>
    queryOptions({
      ...locationSearchQueries.getCatalog(),
      queryKey: ["location-catalog", query],
      select: (catalog) => {
        const normalizedQuery = query.trim().toLowerCase();

        if (normalizedQuery.length === 0) {
          return [];
        }

        return catalog.filter((locationName) =>
          locationName.toLowerCase().includes(normalizedQuery),
        );
      },
    }),
};
