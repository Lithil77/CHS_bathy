  import { GeoserverBaseURL, GeoserverBaseBSH_Bathy_URL } from "../appConfig";

  export const mapLayers = [
  {
    url: GeoserverBaseURL,
    workspace: "CHS-S102",
    layer: "S-101 Depth areas"
  },
  {
    url: GeoserverBaseURL,
    workspace: "CHS-S102",
    layer: "S-101 Depth areas mismatch"
  },
  {
    url: GeoserverBaseURL,
    workspace: "CHS-S102",
    layer: "S-101 Sounding mismatch"
  },
  {
    url: GeoserverBaseURL,
    workspace: "CHS-S102",
    layer: "S-101 Soundings"
  },
  {
    url: GeoserverBaseURL,
    workspace: "CHS-S102",
    layer: "S-101 VALSOU mismatch"
  },
  {
    url: GeoserverBaseURL,
    workspace: "CHS-S102",
    layer: "S-57 Depth areas"
  },
  {
    url: GeoserverBaseURL,
    workspace: "CHS-S102",
    layer: "S-57 Depth areas mismatch"
  },
  {
    url: GeoserverBaseURL,
    workspace: "CHS-S102",
    layer: "S-57 Other areas with DRVAL1 mismatch"
  },
  {
    url: GeoserverBaseURL,
    workspace: "CHS-S102",
    layer: "S-57 Sounding mismatch"
  },
  {
    url: GeoserverBaseURL,
    workspace: "CHS-S102",
    layer: "S-57 Soundings"
  },
 
  {
    url: GeoserverBaseURL,
    workspace: "CHS-S102",
    layer: "S-57 VALSOU mismatch"
  },
  {
    url: GeoserverBaseBSH_Bathy_URL,
    workspace: "BSH_BATHY",
    layer: "BSH S102 Bathy Raster"
  },
  {
    url: GeoserverBaseURL,
    workspace: "CHS-S102",
    layer: "S102 Bathy Raster"
  }
];