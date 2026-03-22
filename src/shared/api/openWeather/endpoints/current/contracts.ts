import { z } from "zod";

const openWeatherCurrentMainSchema = z.object({
  temp: z.number(),
});

export const openWeatherCurrentResponseSchema = z.object({
  dt: z.number(),
  timezone: z.number(),
  main: openWeatherCurrentMainSchema,
});

export type OpenWeatherCurrentResponse = z.infer<
  typeof openWeatherCurrentResponseSchema
>;
