import type { Location } from "@/entities/location";

export interface FavoriteLocationItem {
  id: string;
  location: Location;
  alias: string;
  createdAt: number;
}

export interface FavoriteLocationState {
  favorites: FavoriteLocationItem[];
  addFavorite: (location: Location, alias?: string) => void;
  removeFavorite: (id: string) => void;
  renameFavorite: (id: string, alias: string) => void;
  isFavorite: (location: Location) => boolean;
}
