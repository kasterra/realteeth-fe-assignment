import { z } from "zod";

const openWeatherCurrentCoordSchema = z.object({
  lon: z.number(),
  lat: z.number(),
});

const openWeatherCurrentWeatherSchema = z.object({
  id: z.number(),
  main: z.string(),
  description: z.string(),
  icon: z.string(),
});

const openWeatherCurrentMainSchema = z.object({
  temp: z.number(),
  feels_like: z.number(),
  temp_min: z.number(),
  temp_max: z.number(),
  pressure: z.number(),
  humidity: z.number(),
  sea_level: z.number().optional(),
  grnd_level: z.number().optional(),
});

const openWeatherCurrentWindSchema = z.object({
  speed: z.number(),
  deg: z.number(),
  gust: z.number().optional(),
});

const openWeatherCurrentCloudsSchema = z.object({
  all: z.number(),
});

const openWeatherCurrentPrecipitationSchema = z.object({
  "1h": z.number().optional(),
});

const openWeatherCurrentSysSchema = z.object({
  type: z.number().optional(),
  id: z.number().optional(),
  message: z.string().optional(),
  country: z.string(),
  sunrise: z.number(),
  sunset: z.number(),
});

export const openWeatherCurrentResponseSchema = z.object({
  coord: openWeatherCurrentCoordSchema,
  weather: z.array(openWeatherCurrentWeatherSchema),
  base: z.string(),
  main: openWeatherCurrentMainSchema,
  visibility: z.number().optional(),
  wind: openWeatherCurrentWindSchema.optional(),
  clouds: openWeatherCurrentCloudsSchema.optional(),
  rain: openWeatherCurrentPrecipitationSchema.optional(),
  snow: openWeatherCurrentPrecipitationSchema.optional(),
  dt: z.number(),
  sys: openWeatherCurrentSysSchema,
  timezone: z.number(),
  id: z.number(),
  name: z.string(),
  cod: z.number(),
});

export type OpenWeatherCurrentResponse = z.infer<
  typeof openWeatherCurrentResponseSchema
>;
