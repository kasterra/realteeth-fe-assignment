export function getLocalDateKey(
  unixTime: number,
  timezoneOffset: number,
): string {
  const localDate = new Date((unixTime + timezoneOffset) * 1000);

  return `${localDate.getUTCFullYear()}-${localDate.getUTCMonth()}-${localDate.getUTCDate()}`;
}
