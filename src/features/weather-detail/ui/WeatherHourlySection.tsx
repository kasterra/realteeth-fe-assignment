import { formatWeatherHour } from "../lib/formatWeatherHour";

interface WeatherDetail {
  timezoneOffset: number;
  todayHourly: {
    timestamp: number;
    temperature: number;
  }[];
}

export function WeatherHourlySection({ weather }: { weather: WeatherDetail }) {
  return (
    <section className="space-y-4 rounded-[1.75rem] bg-stone-50 p-5 sm:p-6">
      <div className="space-y-1">
        <h2 className="text-lg font-semibold text-stone-950">시간대별 기온</h2>
        <p className="text-sm text-stone-500">
          당일 기준으로 제공되는 시간 단위 예보를 보여줍니다.
        </p>
      </div>

      {weather.todayHourly.length === 0 ? (
        <div className="rounded-3xl bg-white px-4 py-6 text-sm text-stone-500">
          현재 사용 가능한 당일 시간대별 기온 정보가 없습니다.
        </div>
      ) : (
        <ul className="flex gap-3 overflow-x-auto pb-2">
          {weather.todayHourly.map((hourlyWeather) => (
            <li
              key={hourlyWeather.timestamp}
              className="min-w-24 rounded-3xl bg-white px-4 py-4 text-center"
            >
              <p className="text-sm text-stone-500">
                {formatWeatherHour(
                  hourlyWeather.timestamp,
                  weather.timezoneOffset,
                )}
              </p>
              <p className="mt-2 text-xl font-semibold text-stone-900">
                {Math.round(hourlyWeather.temperature)}
                <span className="ml-0.5 text-sm font-medium text-stone-500">
                  °C
                </span>
              </p>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
