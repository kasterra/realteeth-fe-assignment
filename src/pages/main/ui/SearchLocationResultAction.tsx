import { locationQueries } from "@/entities/location";
import { FavoriteLocationToggleButton } from "@/features/favorite-location";
import { useQuery } from "@tanstack/react-query";

export function SearchLocationResultAction({
  locationName,
}: {
  locationName: string;
}) {
  const geocodeQuery = locationName.replaceAll("-", " ");
  const locationQuery = useQuery(locationQueries.geocode(geocodeQuery));

  if (locationQuery.isPending) {
    return (
      <span className="rounded-full bg-stone-100 px-3 py-1.5 text-sm text-stone-500">
        확인 중...
      </span>
    );
  }

  if (locationQuery.isError) {
    console.error("SearchLocationResultAction geocode error", {
      locationName,
      geocodeQuery,
      error: locationQuery.error,
    });

    return (
      <div className="rounded-2xl bg-rose-50 px-3 py-2 text-sm text-rose-700">
        해당 장소의 정보가 제공되지 않습니다
      </div>
    );
  }

  return <FavoriteLocationToggleButton location={locationQuery.data} />;
}
