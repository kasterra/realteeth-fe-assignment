import { locationQueries } from "@/entities/location";
import { WeatherDetailCard } from "@/features/weather-detail";
import { useCurrentLocation } from "@/shared/lib";
import { ErrorBoundary, Suspense } from "@suspensive/react";
import { SuspenseQuery } from "@suspensive/react-query";
import { QueryErrorResetBoundary } from "@tanstack/react-query";

export function CurrentLocationWeatherSection() {
  const currentLocation = useCurrentLocation();

  if (currentLocation.status === "pending") {
    return (
      <section className="rounded-[2.25rem] bg-stone-100 p-6 shadow-sm">
        <p className="text-sm text-stone-500">현재 위치를 불러오는 중...</p>
      </section>
    );
  }

  if (currentLocation.status === "error") {
    return (
      <section className="rounded-[2.25rem] bg-rose-50 p-6 shadow-sm">
        <p className="text-sm font-medium text-rose-700">
          {currentLocation.error.message}
        </p>
      </section>
    );
  }

  const { lat, lon } = currentLocation.data;

  return (
    <QueryErrorResetBoundary>
      {({ reset }) => (
        <ErrorBoundary
          fallback={({ error, reset: resetBoundary }) => (
            <section className="rounded-[2.25rem] bg-rose-50 p-6 shadow-sm">
              <p className="text-sm font-medium text-rose-700">
                {error.message ||
                  "현재 위치의 주소 정보를 불러오지 못했습니다."}
              </p>
              <button
                type="button"
                onClick={resetBoundary}
                className="mt-4 rounded-full bg-stone-950 px-4 py-2 text-sm font-medium text-white transition hover:bg-stone-800"
              >
                다시 시도
              </button>
            </section>
          )}
          onReset={reset}
        >
          <Suspense
            fallback={
              <section className="rounded-[2.25rem] bg-stone-100 p-6 shadow-sm">
                <p className="text-sm text-stone-500">
                  현재 위치의 주소 정보를 불러오는 중...
                </p>
              </section>
            }
          >
            <SuspenseQuery {...locationQueries.reverseGeocode(lat, lon)}>
              {({ data: location }) => (
                <section className="space-y-3">
                  <div className="space-y-1 px-1">
                    <h2 className="text-xl font-semibold tracking-tight text-stone-950">
                      현재 위치 날씨
                    </h2>
                    <p className="text-sm text-stone-500">
                      현재 위치를 기준으로 조회한 날씨 정보입니다.
                    </p>
                  </div>
                  <WeatherDetailCard
                    locationName={location.name}
                    lat={lat}
                    lon={lon}
                  />
                </section>
              )}
            </SuspenseQuery>
          </Suspense>
        </ErrorBoundary>
      )}
    </QueryErrorResetBoundary>
  );
}
