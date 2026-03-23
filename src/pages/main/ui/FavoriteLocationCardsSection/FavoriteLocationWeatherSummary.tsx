import { weatherQueries } from "@/entities/weather";
import { getLocalDateKey } from "@/features/weather-detail/lib/getLocalDateKey";
import { ErrorBoundary, Suspense } from "@suspensive/react";
import { SuspenseQueries } from "@suspensive/react-query";
import { QueryErrorResetBoundary } from "@tanstack/react-query";

function formatTemperature(value: number): string {
  return `${Math.round(value)}°C`;
}

export function FavoriteLocationWeatherSummary({
  lat,
  lon,
}: {
  lat: number;
  lon: number;
}) {
  return (
    <QueryErrorResetBoundary>
      {({ reset }) => (
        <ErrorBoundary
          fallback={({ reset: resetBoundary }) => (
            <section className="rounded-[1.5rem] bg-rose-50 px-4 py-5">
              <p className="text-sm text-rose-700">
                날씨 정보를 불러오지 못했습니다.
              </p>
              <button
                type="button"
                onClick={resetBoundary}
                className="mt-3 rounded-full bg-rose-600 px-3 py-1.5 text-sm font-medium text-white"
              >
                다시 시도
              </button>
            </section>
          )}
          onReset={reset}
        >
          <Suspense
            fallback={
              <section className="rounded-[1.5rem] bg-stone-50 px-4 py-5">
                <p className="text-sm text-stone-500">
                  날씨 정보를 불러오는 중입니다.
                </p>
              </section>
            }
          >
            <SuspenseQueries
              queries={[
                weatherQueries.getCurrentWeatherByCoord(lat, lon),
                weatherQueries.getForecastWeatherByCoord(lat, lon),
              ]}
            >
              {([currentQuery, forecastQuery]) => {
                const current = currentQuery.data;
                const forecast = forecastQuery.data;
                const todayKey = getLocalDateKey(
                  current.measuredAt,
                  current.timezoneOffset,
                );
                const todayHourly = forecast.hourly.filter(
                  (hourlyWeather) =>
                    getLocalDateKey(
                      hourlyWeather.timestamp,
                      forecast.timezoneOffset,
                    ) === todayKey,
                );
                const lowCandidates = [
                  current.temperature,
                  ...todayHourly.map(
                    (hourlyWeather) => hourlyWeather.minTemperature,
                  ),
                ];
                const highCandidates = [
                  current.temperature,
                  ...todayHourly.map(
                    (hourlyWeather) => hourlyWeather.maxTemperature,
                  ),
                ];

                return (
                  <section className="rounded-[1.5rem] bg-stone-50 px-4 py-5">
                    <div className="grid grid-cols-3 gap-3">
                      <div className="rounded-2xl bg-white px-3 py-4 text-center">
                        <p className="text-xs font-medium uppercase tracking-wide text-stone-500">
                          현재
                        </p>
                        <p className="mt-2 text-lg font-semibold text-stone-950">
                          {formatTemperature(current.temperature)}
                        </p>
                      </div>
                      <div className="rounded-2xl bg-white px-3 py-4 text-center">
                        <p className="text-xs font-medium uppercase tracking-wide text-stone-500">
                          최저
                        </p>
                        <p className="mt-2 text-lg font-semibold text-stone-950">
                          {formatTemperature(Math.min(...lowCandidates))}
                        </p>
                      </div>
                      <div className="rounded-2xl bg-white px-3 py-4 text-center">
                        <p className="text-xs font-medium uppercase tracking-wide text-stone-500">
                          최고
                        </p>
                        <p className="mt-2 text-lg font-semibold text-stone-950">
                          {formatTemperature(Math.max(...highCandidates))}
                        </p>
                      </div>
                    </div>
                  </section>
                );
              }}
            </SuspenseQueries>
          </Suspense>
        </ErrorBoundary>
      )}
    </QueryErrorResetBoundary>
  );
}
