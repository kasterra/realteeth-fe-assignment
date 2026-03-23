import type { Location } from "@/entities/location";
import { create } from "zustand";
import { combine, persist } from "zustand/middleware";
import {
  FAVORITE_LOCATION_STORAGE_KEY,
  MAX_FAVORITE_LOCATION_COUNT,
} from "../config";
import { createFavoriteLocationId } from "../lib";
import type {
  AddFavoriteResult,
  FavoriteLocationItem,
  FavoriteLocationState,
} from "./types";

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
          const state = get();

          if (
            state.favorites.some((favorite) => hasSameLocation(favorite, location))
          ) {
            return {
              ok: false,
              reason: "duplicate",
              message: "이미 즐겨찾기에 추가된 장소입니다.",
            } satisfies AddFavoriteResult;
          }

          if (state.favorites.length >= MAX_FAVORITE_LOCATION_COUNT) {
            return {
              ok: false,
              reason: "limit_exceeded",
              message: `즐겨찾기는 최대 ${MAX_FAVORITE_LOCATION_COUNT}개까지 추가할 수 있습니다.`,
            } satisfies AddFavoriteResult;
          }

          const nextFavorite: FavoriteLocationItem = {
            id: createFavoriteLocationId(location),
            location,
            alias: alias?.trim() || location.name,
            createdAt: Date.now(),
          };

          set((currentState) => ({
            favorites: [...currentState.favorites, nextFavorite],
          }));

          return { ok: true } satisfies AddFavoriteResult;
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
