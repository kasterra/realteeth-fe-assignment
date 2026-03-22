export function getCurrentPosition(
  options?: PositionOptions,
): Promise<GeolocationPosition> {
  if (!navigator.geolocation) {
    throw new Error("이 브라우저에서는 Geolocation API를 지원하지 않습니다.");
  }

  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(resolve, reject, options);
  });
}
