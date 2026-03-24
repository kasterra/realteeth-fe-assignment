import { useFavoriteLocationStore } from "@/features/favorite-location";
import { WeatherDetailCard } from "@/features/weather-detail";
import { Link, useNavigate, useParams } from "react-router";

export function FavoriteDetailPage() {
  const navigate = useNavigate();
  const { favoriteId } = useParams();
  const favorite = useFavoriteLocationStore((state) =>
    state.favorites.find((item) => item.id === favoriteId),
  );

  if (!favoriteId || !favorite) {
    return (
      <main className="min-h-screen bg-stone-50 px-6 py-16 text-stone-900">
        <div className="mx-auto flex min-h-[calc(100vh-8rem)] max-w-3xl flex-col justify-center">
          <div className="inline-flex w-fit rounded-full border border-stone-200 bg-white px-3 py-1 text-sm text-stone-500 shadow-sm">
            즐겨찾기 없음
          </div>
          <h1 className="mt-6 text-4xl font-semibold tracking-tight text-stone-950 sm:text-5xl">
            요청한 즐겨찾기 장소를 찾을 수 없습니다.
          </h1>
          <p className="mt-5 max-w-xl text-base leading-7 text-stone-600 sm:text-lg">
            즐겨찾기에서 이미 제거되었거나, 상세 페이지 주소가 올바르지 않을 수
            있습니다.
          </p>
          <div className="mt-10 flex flex-wrap gap-3">
            <Link
              to="/"
              className="rounded-full bg-stone-950 px-5 py-3 text-sm font-medium text-white transition hover:bg-stone-800"
            >
              메인으로 이동
            </Link>
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="rounded-full border border-stone-300 bg-white px-5 py-3 text-sm font-medium text-stone-700 transition hover:border-stone-400 hover:bg-stone-100"
            >
              뒤로 가기
            </button>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="mx-auto min-h-screen max-w-3xl px-4 py-10">
      <div className="mb-8 flex items-center justify-between gap-3">
        <div className="space-y-1">
          <p className="text-sm font-medium text-stone-500">즐겨찾기 상세</p>
          <h1 className="text-3xl font-semibold tracking-tight text-stone-950">
            {favorite.alias}
          </h1>
          {favorite.alias !== favorite.location.name ? (
            <p className="text-sm text-stone-500">{favorite.location.name}</p>
          ) : null}
        </div>
        <Link
          to="/"
          className="shrink-0 rounded-full border border-stone-300 bg-white px-4 py-2 text-sm font-medium text-stone-700 transition hover:border-stone-950 hover:text-stone-950"
        >
          메인으로 이동
        </Link>
      </div>

      <WeatherDetailCard
        locationName={favorite.location.name}
        lat={favorite.location.lat}
        lon={favorite.location.lon}
      />
    </main>
  );
}
