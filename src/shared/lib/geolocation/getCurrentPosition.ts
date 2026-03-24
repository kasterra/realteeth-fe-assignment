import {
  GeolocationRequestError,
  mapGeolocationErrorMessage,
} from "./error";

export function getCurrentPosition(
  options?: PositionOptions,
): Promise<GeolocationPosition> {
  if (!navigator.geolocation) {
    throw new GeolocationRequestError(
      "이 브라우저에서는 Geolocation API를 지원하지 않습니다.",
    );
  }

  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(
      resolve,
      (error) => {
        reject(
          new GeolocationRequestError(
            mapGeolocationErrorMessage(error.code, error.message),
            error.code,
          ),
        );
      },
      options,
    );
  });
}
