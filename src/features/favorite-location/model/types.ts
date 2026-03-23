import type { Location } from "@/entities/location";

export interface FavoriteLocationItem {
  id: string;
  location: Location;
  alias: string;
  createdAt: number;
}

export type AddFavoriteResult =
  | { ok: true }
  | {
      ok: false;
      reason: "duplicate" | "limit_exceeded";
      message: string;
    };

export interface FavoriteLocationState {
  favorites: FavoriteLocationItem[];
  addFavorite: (location: Location, alias?: string) => AddFavoriteResult;
  removeFavorite: (id: string) => void;
  renameFavorite: (id: string, alias: string) => void;
  isFavorite: (location: Location) => boolean;
}
