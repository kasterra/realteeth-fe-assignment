import { z } from "zod";

const openCageLicenseSchema = z.object({
  name: z.string(),
  url: z.url(),
});

const openCageRateSchema = z.object({
  limit: z.number(),
  remaining: z.number(),
  reset: z.number(),
});

const openCageLatLngSchema = z.object({
  lat: z.number(),
  lng: z.number(),
});

const openCageDmsSchema = z.object({
  lat: z.string(),
  lng: z.string(),
});

const openCageMercatorSchema = z.object({
  x: z.number(),
  y: z.number(),
});

const openCageOsmSchema = z.object({
  edit_url: z.url().optional(),
  note_url: z.url().optional(),
  url: z.url().optional(),
});

const openCageUnM49Schema = z.object({
  regions: z.record(z.string(), z.string()),
  statistical_groupings: z.array(z.string()),
});

const openCageCurrencySchema = z.object({
  decimal_mark: z.string(),
  html_entity: z.string(),
  iso_code: z.string(),
  iso_numeric: z.string(),
  name: z.string(),
  smallest_denomination: z.number(),
  subunit: z.string().optional(),
  subunit_to_unit: z.number(),
  symbol: z.string(),
  symbol_first: z.number(),
  thousands_separator: z.string(),
});

const openCageRoadInfoSchema = z.object({
  drive_on: z.string(),
  road: z.string().optional(),
  road_type: z.string().optional(),
  speed_in: z.string(),
});

const openCageSunPhaseSchema = z.object({
  apparent: z.number(),
  astronomical: z.number(),
  civil: z.number(),
  nautical: z.number(),
});

const openCageSunSchema = z.object({
  rise: openCageSunPhaseSchema,
  set: openCageSunPhaseSchema,
});

const openCageTimezoneSchema = z.object({
  name: z.string(),
  now_in_dst: z.number(),
  offset_sec: z.number(),
  offset_string: z.string(),
  short_name: z.string(),
});

const openCageWhat3WordsSchema = z.object({
  words: z.string(),
});

const openCageAnnotationsSchema = z.object({
  DMS: openCageDmsSchema.optional(),
  MGRS: z.string().optional(),
  Maidenhead: z.string().optional(),
  Mercator: openCageMercatorSchema.optional(),
  OSM: openCageOsmSchema.optional(),
  UN_M49: openCageUnM49Schema.optional(),
  callingcode: z.number().optional(),
  currency: openCageCurrencySchema.optional(),
  flag: z.string().optional(),
  geohash: z.string().optional(),
  qibla: z.number().optional(),
  roadinfo: openCageRoadInfoSchema.optional(),
  sun: openCageSunSchema.optional(),
  timezone: openCageTimezoneSchema.optional(),
  what3words: openCageWhat3WordsSchema.optional(),
});

const openCageBoundsSchema = z.object({
  northeast: openCageLatLngSchema,
  southwest: openCageLatLngSchema,
});

const openCageComponentsSchema = z
  .object({
    "ISO_3166-1_alpha-2": z.string().optional(),
    "ISO_3166-1_alpha-3": z.string().optional(),
    "ISO_3166-2": z.array(z.string()).optional(),
    _category: z.string().optional(),
    _normalized_city: z.string().optional(),
    _type: z.string().optional(),
    city: z.string().optional(),
    city_district: z.string().optional(),
    continent: z.string().optional(),
    country: z.string().optional(),
    country_code: z.string().optional(),
    county: z.string().optional(),
    municipality: z.string().optional(),
    postcode: z.string().optional(),
    region: z.string().optional(),
    road: z.string().optional(),
    road_type: z.string().optional(),
    state: z.string().optional(),
    state_code: z.string().optional(),
    state_district: z.string().optional(),
    suburb: z.string().optional(),
  })
  .catchall(z.union([z.string(), z.array(z.string())]));

const openCageGeometrySchema = z.object({
  lat: z.number(),
  lng: z.number(),
});

const openCageResultSchema = z.object({
  annotations: openCageAnnotationsSchema.optional(),
  bounds: openCageBoundsSchema.optional(),
  components: openCageComponentsSchema,
  confidence: z.number(),
  formatted: z.string(),
  geometry: openCageGeometrySchema,
});

const openCageStatusSchema = z.object({
  code: z.number(),
  message: z.string(),
});

const openCageStayInformedSchema = z.object({
  blog: z.url(),
  mastodon: z.url(),
});

const openCageTimestampSchema = z.object({
  created_http: z.string(),
  created_unix: z.number(),
});

export const openCageGeocodeResponseSchema = z.object({
  documentation: z.url(),
  licenses: z.array(openCageLicenseSchema),
  rate: openCageRateSchema,
  results: z.array(openCageResultSchema),
  status: openCageStatusSchema,
  stay_informed: openCageStayInformedSchema,
  thanks: z.string(),
  timestamp: openCageTimestampSchema,
  total_results: z.number(),
});

export type OpenCageGeocodeResponse = z.infer<
  typeof openCageGeocodeResponseSchema
>;
export type OpenCageResult = z.infer<typeof openCageResultSchema>;
export type OpenCageGeometry = z.infer<typeof openCageGeometrySchema>;
export type OpenCageComponents = z.infer<typeof openCageComponentsSchema>;
