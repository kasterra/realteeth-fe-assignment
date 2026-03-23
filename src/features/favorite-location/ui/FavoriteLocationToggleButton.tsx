import type { Location } from "@/entities/location";
import { useFavoriteLocationStore } from "../model/store";

interface FavoriteLocationToggleButtonProps {
  location: Location;
  alias?: string;
}

export function FavoriteLocationToggleButton({
  location,
  alias,
}: FavoriteLocationToggleButtonProps) {
  const addFavorite = useFavoriteLocationStore((state) => state.addFavorite);
  const removeFavorite = useFavoriteLocationStore((state) => state.removeFavorite);
  const favorites = useFavoriteLocationStore((state) => state.favorites);
  const favorite = favorites.find(
    (item) =>
      item.location.lat === location.lat && item.location.lon === location.lon,
  );

  const handleClick = () => {
    if (favorite) {
      removeFavorite(favorite.id);
      return;
    }

    addFavorite(location, alias);
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-pressed={Boolean(favorite)}
      className="inline-flex items-center rounded-full border border-stone-300 bg-white px-3 py-1.5 text-sm font-medium text-stone-700 transition hover:border-stone-950 hover:text-stone-950"
    >
      {favorite ? "즐겨찾기 삭제" : "즐겨찾기 추가"}
    </button>
  );
}
