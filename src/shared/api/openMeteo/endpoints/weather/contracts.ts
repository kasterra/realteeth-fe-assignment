import { z } from "zod";

const openMeteoWeatherCurrentUnitsSchema = z.object({
  time: z.string(),
  temperature_2m: z.string(),
});

const openMeteoWeatherCurrentSchema = z.object({
  time: z.number(),
  temperature_2m: z.number(),
});

const openMeteoWeatherHourlyUnitsSchema = z.object({
  time: z.string(),
  temperature_2m: z.string(),
});

const openMeteoWeatherHourlySchema = z.object({
  time: z.array(z.number()),
  temperature_2m: z.array(z.number()),
});

const openMeteoWeatherDailyUnitsSchema = z.object({
  time: z.string(),
  temperature_2m_max: z.string(),
  temperature_2m_min: z.string(),
});

const openMeteoWeatherDailySchema = z.object({
  time: z.array(z.number()),
  temperature_2m_max: z.array(z.number()),
  temperature_2m_min: z.array(z.number()),
});

export const openMeteoWeatherResponseSchema = z.object({
  latitude: z.number(),
  longitude: z.number(),
  generationtime_ms: z.number(),
  utc_offset_seconds: z.number(),
  timezone: z.string(),
  timezone_abbreviation: z.string(),
  elevation: z.number().optional(),
  current_units: openMeteoWeatherCurrentUnitsSchema,
  current: openMeteoWeatherCurrentSchema,
  hourly_units: openMeteoWeatherHourlyUnitsSchema,
  hourly: openMeteoWeatherHourlySchema,
  daily_units: openMeteoWeatherDailyUnitsSchema,
  daily: openMeteoWeatherDailySchema,
});

export type OpenMeteoWeatherResponse = z.infer<
  typeof openMeteoWeatherResponseSchema
>;
