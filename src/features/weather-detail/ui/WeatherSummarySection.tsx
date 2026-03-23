interface WeatherDetailSummary {
  locationName: string;
  current: {
    measuredAt: number;
    timezoneOffset: number;
    temperature: number;
    minTemperature: number;
    maxTemperature: number;
  };
}

function formatTemperature(value: number): string {
  return `${Math.round(value)}°C`;
}

function formatMeasuredTime(unixTime: number, timezoneOffset: number): string {
  const localDate = new Date((unixTime + timezoneOffset) * 1000);

  return new Intl.DateTimeFormat("ko-KR", {
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
    hour12: false,
    timeZone: "UTC",
  }).format(localDate);
}

export function WeatherSummarySection({
  weather,
}: {
  weather: WeatherDetailSummary;
}) {
  return (
    <section className="rounded-[1.75rem] bg-stone-50 p-6 sm:p-7">
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <div className="min-w-0">
            <p className="text-sm font-medium text-stone-500">날씨</p>
            <h2 className="mt-1 break-keep text-3xl font-semibold tracking-tight text-stone-950 sm:text-4xl">
              {weather.locationName}
            </h2>
            <p className="mt-2 text-sm text-stone-500">
              기준 시각{" "}
              {formatMeasuredTime(
                weather.current.measuredAt,
                weather.current.timezoneOffset,
              )}
            </p>
          </div>

          <div className="shrink-0 rounded-3xl bg-white px-5 py-4">
            <p className="text-sm font-medium text-stone-500">현재 기온</p>
            <p className="mt-2 text-5xl font-semibold tracking-tight text-stone-950">
              {formatTemperature(weather.current.temperature)}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:max-w-sm">
          <div className="rounded-3xl bg-white px-4 py-4">
            <p className="text-sm text-stone-500">당일 최저</p>
            <p className="mt-2 text-2xl font-semibold text-stone-900">
              {formatTemperature(weather.current.minTemperature)}
            </p>
          </div>
          <div className="rounded-3xl bg-white px-4 py-4">
            <p className="text-sm text-stone-500">당일 최고</p>
            <p className="mt-2 text-2xl font-semibold text-stone-900">
              {formatTemperature(weather.current.maxTemperature)}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
