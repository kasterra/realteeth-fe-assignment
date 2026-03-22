import { z } from "zod";

const openWeatherForecastMainSchema = z.object({
  temp: z.number(),
  feels_like: z.number(),
  temp_min: z.number(),
  temp_max: z.number(),
  pressure: z.number(),
  sea_level: z.number().optional(),
  grnd_level: z.number().optional(),
  humidity: z.number(),
  temp_kf: z.number(),
});

const openWeatherForecastWeatherSchema = z.object({
  id: z.number(),
  main: z.string(),
  description: z.string(),
  icon: z.string(),
});

const openWeatherForecastCloudsSchema = z.object({
  all: z.number(),
});

const openWeatherForecastWindSchema = z.object({
  speed: z.number(),
  deg: z.number(),
  gust: z.number().optional(),
});

const openWeatherForecastPrecipitationSchema = z.object({
  "1h": z.number(),
});

const openWeatherForecastSysSchema = z.object({
  pod: z.enum(["n", "d"]),
});

const openWeatherForecastItemSchema = z.object({
  dt: z.number(),
  main: openWeatherForecastMainSchema,
  weather: z.array(openWeatherForecastWeatherSchema),
  clouds: openWeatherForecastCloudsSchema,
  wind: openWeatherForecastWindSchema,
  rain: openWeatherForecastPrecipitationSchema.optional(),
  snow: openWeatherForecastPrecipitationSchema.optional(),
  visibility: z.number(),
  pop: z.number(),
  sys: openWeatherForecastSysSchema,
  dt_txt: z.string(),
});

const openWeatherForecastCoordSchema = z.object({
  lat: z.number(),
  lon: z.number(),
});

const openWeatherForecastCitySchema = z.object({
  id: z.number(),
  name: z.string(),
  coord: openWeatherForecastCoordSchema,
  country: z.string(),
  timezone: z.number(),
  sunrise: z.number(),
  sunset: z.number(),
});

export const openWeatherForecastResponseSchema = z.object({
  cod: z.string(),
  message: z.number(),
  cnt: z.number(),
  list: z.array(openWeatherForecastItemSchema),
  city: openWeatherForecastCitySchema,
});

export type OpenWeatherForecastResponse = z.infer<
  typeof openWeatherForecastResponseSchema
>;
