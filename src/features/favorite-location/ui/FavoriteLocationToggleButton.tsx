import type { Location } from "@/entities/location";
import { useState } from "react";
import { useFavoriteLocationStore } from "../model/store";

interface FavoriteLocationToggleButtonProps {
  location: Location;
  alias?: string;
}

export function FavoriteLocationToggleButton({
  location,
  alias,
}: FavoriteLocationToggleButtonProps) {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
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
      setErrorMessage(null);
      return;
    }

    const result = addFavorite(location, alias);

    if (!result.ok) {
      setErrorMessage(result.message);
      return;
    }

    setErrorMessage(null);
  };

  return (
    <div className="flex flex-col items-end gap-2 text-right">
      <button
        type="button"
        onClick={handleClick}
        aria-pressed={Boolean(favorite)}
        className="inline-flex items-center rounded-full border border-stone-300 bg-white px-3 py-1.5 text-sm font-medium text-stone-700 transition hover:border-stone-950 hover:text-stone-950"
      >
        {favorite ? "즐겨찾기 삭제" : "즐겨찾기 추가"}
      </button>
      {errorMessage ? (
        <p
          aria-live="polite"
          className="text-sm leading-5 text-rose-600"
        >
          {errorMessage}
        </p>
      ) : null}
    </div>
  );
}
