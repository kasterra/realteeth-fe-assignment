import ky from "ky";
import {
  locationCatalogSchema,
  type LocationCatalogResponse,
} from "./contracts";

export async function getLocationCatalog(): Promise<LocationCatalogResponse> {
  const data = await ky.get("/korea_districts.json");
  return locationCatalogSchema.parse(data);
}
