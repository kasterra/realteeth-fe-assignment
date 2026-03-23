import { useFavoriteLocationStore } from "@/features/favorite-location";
import { FavoriteLocationCard } from "./FavoriteLocationCard";

export function FavoriteLocationCardsSection() {
  const favorites = useFavoriteLocationStore((state) => state.favorites);

  return (
    <section className="space-y-4">
      <div className="space-y-1 px-1">
        <h2 className="text-xl font-semibold tracking-tight text-stone-950">
          즐겨찾기한 장소
        </h2>
        <p className="text-sm text-stone-500">
          저장한 장소의 현재 날씨와 당일 최저, 최고 기온을 확인할 수 있습니다.
        </p>
      </div>

      {favorites.length === 0 ? (
        <section className="rounded-[2.25rem] bg-stone-100 p-6 shadow-sm">
          <p className="text-sm text-stone-500">
            아직 추가한 즐겨찾기 장소가 없습니다.
          </p>
        </section>
      ) : (
        <div className="grid gap-5 lg:grid-cols-2">
          {favorites.map((favorite) => (
            <FavoriteLocationCard key={favorite.id} favorite={favorite} />
          ))}
        </div>
      )}
    </section>
  );
}
