import { z } from "zod";

export const locationCatalogSchema = z.array(z.string());

export type LocationCatalogResponse = z.infer<typeof locationCatalogSchema>;
