import type { Location } from "@/entities/location";
import { create } from "zustand";
import { combine, persist } from "zustand/middleware";
import {
  FAVORITE_LOCATION_STORAGE_KEY,
  MAX_FAVORITE_LOCATION_COUNT,
} from "../config";
import { createFavoriteLocationId } from "../lib";
import type { FavoriteLocationItem, FavoriteLocationState } from "./types";

function hasSameLocation(
  favorite: FavoriteLocationItem,
  location: Location,
): boolean {
  return (
    favorite.location.lat === location.lat &&
    favorite.location.lon === location.lon
  );
}

export const useFavoriteLocationStore = create<FavoriteLocationState>()(
  persist(
    combine(
      { favorites: [] as FavoriteLocationItem[] },

      (set, get) => ({
        addFavorite: (location, alias) => {
          set((state) => {
            if (
              state.favorites.some((favorite) =>
                hasSameLocation(favorite, location),
              )
            ) {
              return state;
            }

            if (state.favorites.length >= MAX_FAVORITE_LOCATION_COUNT) {
              throw new Error(
                `즐겨찾기는 최대 ${MAX_FAVORITE_LOCATION_COUNT}개까지 추가할 수 있습니다.`,
              );
            }

            const nextFavorite: FavoriteLocationItem = {
              id: createFavoriteLocationId(location),
              location,
              alias: alias?.trim() || location.name,
              createdAt: Date.now(),
            };

            return {
              favorites: [...state.favorites, nextFavorite],
            };
          });
        },
        removeFavorite: (id) => {
          set((state) => ({
            favorites: state.favorites.filter((favorite) => favorite.id !== id),
          }));
        },
        renameFavorite: (id, alias) => {
          const nextAlias = alias.trim();

          set((state) => ({
            favorites: state.favorites.map((favorite) =>
              favorite.id === id
                ? {
                    ...favorite,
                    alias: nextAlias || favorite.location.name,
                  }
                : favorite,
            ),
          }));
        },
        isFavorite: (location) =>
          get().favorites.some((favorite) =>
            hasSameLocation(favorite, location),
          ),
      }),
    ),
    {
      name: FAVORITE_LOCATION_STORAGE_KEY,
      partialize: (state) => ({
        favorites: state.favorites,
      }),
    },
  ),
);
