function getRequiredEnv(name: string): string {
  const value = import.meta.env[name];

  if (!value || typeof value !== "string") {
    throw new Error(`환경변수 ${name} 가 설정되지 않았습니다.`);
  }

  return value;
}

export const env = {
  OPEN_WEATHER_API_KEY: getRequiredEnv("VITE_OPEN_WEATHER_API_KEY"),
  OPENCAGE_API_KEY: getRequiredEnv("VITE_OPENCAGE_API_KEY"),
} as const;
