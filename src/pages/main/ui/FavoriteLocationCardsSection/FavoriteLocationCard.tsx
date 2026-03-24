import type { FavoriteLocationItem } from "@/features/favorite-location";
import {
  FavoriteLocationAliasForm,
  FavoriteLocationRemoveButton,
} from "@/features/favorite-location";
import { useState } from "react";
import { Link } from "react-router";
import { FavoriteLocationWeatherSummary } from "./FavoriteLocationWeatherSummary";

export function FavoriteLocationCard({
  favorite,
}: {
  favorite: FavoriteLocationItem;
}) {
  const [isEditingAlias, setIsEditingAlias] = useState(false);

  return (
    <article className="overflow-hidden rounded-4xl bg-stone-100 p-3 shadow-sm">
      <div className="space-y-3">
        <div className="rounded-3xl bg-white px-4 py-4">
          {isEditingAlias ? (
            <div className="space-y-3">
              <div className="flex items-center justify-between gap-3">
                <p className="text-xs font-medium uppercase tracking-[0.2em] text-stone-500">
                  Saved Place
                </p>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setIsEditingAlias(false)}
                    className="shrink-0 rounded-full border border-stone-300 px-3 py-1.5 text-sm font-medium text-stone-700 transition hover:border-stone-950 hover:text-stone-950"
                  >
                    취소
                  </button>
                </div>
              </div>
              <FavoriteLocationAliasForm
                id={favorite.id}
                alias={favorite.alias}
                onSubmitted={() => setIsEditingAlias(false)}
              />
            </div>
          ) : (
            <div className="flex items-start justify-between gap-3">
              <Link
                to={`/favorite-detail/${encodeURIComponent(favorite.id)}`}
                className="min-w-0 flex-1 space-y-1 rounded-2xl transition hover:bg-stone-50 focus:outline-none focus:ring-2 focus:ring-stone-400"
              >
                <p className="text-xs font-medium uppercase tracking-[0.2em] text-stone-500">
                  Saved Place
                </p>
                <h3 className="text-lg font-semibold text-stone-950">
                  {favorite.alias}
                </h3>
                {favorite.alias !== favorite.location.name ? (
                  <p className="text-sm text-stone-500">
                    {favorite.location.name}
                  </p>
                ) : null}
              </Link>
              <div className="flex shrink-0 flex-col items-center gap-2">
                <button
                  type="button"
                  onClick={() => setIsEditingAlias(true)}
                  className="shrink-0 rounded-full border border-stone-300 px-3 py-1.5 text-sm font-medium text-stone-700 transition hover:border-stone-950 hover:text-stone-950"
                >
                  수정
                </button>
                <FavoriteLocationRemoveButton id={favorite.id} />
              </div>
            </div>
          )}
        </div>

        <FavoriteLocationWeatherSummary
          lat={favorite.location.lat}
          lon={favorite.location.lon}
        />
      </div>
    </article>
  );
}
