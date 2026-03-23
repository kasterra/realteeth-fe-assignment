import { weatherQueries } from "@/entities/weather";
import { Suspense, ErrorBoundary } from "@suspensive/react";
import { SuspenseQueries } from "@suspensive/react-query";
import { QueryErrorResetBoundary } from "@tanstack/react-query";
import { getLocalDateKey } from "../lib/getLocalDateKey";
import { WeatherHourlySection } from "./WeatherHourlySection";
import { WeatherSummarySection } from "./WeatherSummarySection";

export function WeatherDetailCard({
  locationName,
  lat,
  lon,
}: {
  locationName: string;
  lat: number;
  lon: number;
}) {
  return (
    <QueryErrorResetBoundary>
      {({ reset }) => (
        <ErrorBoundary
          fallback={({ error, reset: resetBoundary }) => (
            <section className="rounded-3xl bg-rose-50 p-6 shadow-sm">
              <p className="text-sm font-medium text-rose-700">
                {error.message || "날씨 정보를 불러오지 못했습니다."}
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
              <section className="rounded-3xl bg-stone-100 p-6 shadow-sm">
                <p className="text-sm text-stone-500">
                  날씨 정보를 불러오는 중...
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
                const todayDaily = forecast.daily.find(
                  (dailyWeather) =>
                    getLocalDateKey(
                      dailyWeather.timestamp,
                      forecast.timezoneOffset,
                    ) === todayKey,
                );

                return (
                  <section className="overflow-hidden rounded-[2.25rem] bg-white p-3 shadow-sm sm:p-4">
                    <div className="space-y-3">
                      <WeatherSummarySection
                        weather={{
                          locationName,
                          current,
                          today: {
                            lowestTemperature:
                              todayDaily?.minTemperature ?? current.temperature,
                            highestTemperature:
                              todayDaily?.maxTemperature ?? current.temperature,
                          },
                        }}
                      />
                      <WeatherHourlySection
                        weather={{
                          timezoneOffset: forecast.timezoneOffset,
                          todayHourly,
                        }}
                      />
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
