const GEOLOCATION_ERROR_CODE = {
  PERMISSION_DENIED: 1,
  POSITION_UNAVAILABLE: 2,
  TIMEOUT: 3,
} as const;

interface GeolocationErrorLike {
  code?: unknown;
  message?: unknown;
}

export class GeolocationRequestError extends Error {
  code?: number;

  constructor(message: string, code?: number) {
    super(message);
    this.name = "GeolocationRequestError";
    this.code = code;
  }
}

export function mapGeolocationErrorMessage(code?: number, message?: string): string {
  switch (code) {
    case GEOLOCATION_ERROR_CODE.PERMISSION_DENIED:
      return "위치 권한이 거부되었습니다. 브라우저, OS 설정 또는 확장 프로그램에서 위치 접근을 차단했는지 확인해 주세요.";
    case GEOLOCATION_ERROR_CODE.POSITION_UNAVAILABLE:
      return "현재 위치를 확인할 수 없습니다. 네트워크 또는 기기 위치 서비스 상태를 확인해 주세요.";
    case GEOLOCATION_ERROR_CODE.TIMEOUT:
      return "현재 위치를 가져오는 시간이 초과되었습니다. 잠시 후 다시 시도해 주세요.";
    default:
      return message || "현재 위치를 가져오지 못했습니다.";
  }
}

export function normalizeGeolocationError(error: unknown): GeolocationRequestError {
  if (error instanceof GeolocationRequestError) {
    return error;
  }

  if (error instanceof Error) {
    return new GeolocationRequestError(error.message);
  }

  if (error && typeof error === "object") {
    const geolocationError = error as GeolocationErrorLike;
    const code =
      typeof geolocationError.code === "number" ? geolocationError.code : undefined;
    const message =
      typeof geolocationError.message === "string"
        ? geolocationError.message
        : undefined;

    return new GeolocationRequestError(
      mapGeolocationErrorMessage(code, message),
      code,
    );
  }

  return new GeolocationRequestError("현재 위치를 가져오지 못했습니다.");
}
