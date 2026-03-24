import { useFavoriteLocationStore } from "../model/store";

interface FavoriteLocationRemoveButtonProps {
  id: string;
}

export function FavoriteLocationRemoveButton({
  id,
}: FavoriteLocationRemoveButtonProps) {
  const removeFavorite = useFavoriteLocationStore(
    (state) => state.removeFavorite,
  );

  return (
    <button
      type="button"
      onClick={() => removeFavorite(id)}
      className="rounded-full border border-rose-200 px-3 py-1.5 text-sm font-medium text-rose-600 transition hover:border-rose-500 hover:text-rose-700"
    >
      삭제
    </button>
  );
}
