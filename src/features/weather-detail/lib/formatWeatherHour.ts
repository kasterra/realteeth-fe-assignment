export function formatWeatherHour(
  unixTime: number,
  timezoneOffset: number,
): string {
  const localDate = new Date((unixTime + timezoneOffset) * 1000);

  return new Intl.DateTimeFormat("ko-KR", {
    hour: "numeric",
    minute: "2-digit",
    hour12: false,
    timeZone: "UTC",
  }).format(localDate);
}
