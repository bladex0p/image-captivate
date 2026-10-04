/**
 * Every image the site uses, in one place. Drop a file with the matching name
 * into /public/assets/ and set `available: true` — no component changes needed.
 * Files marked `available: false` render a neutral labelled placeholder.
 */
export type AssetKey =
  | "logoWhite"
  | "logoBlack"
  | "favicon"
  | "ogShare"
  | "heroVan"
  | "whyUsDriver"
  | "fleetSmallVan"
  | "fleetMidiVan"
  | "fleetSwb"
  | "fleetMwb"
  | "fleetLwb"
  | "serviceSameDay"
  | "serviceHighValue"
  | "serviceDefault";

type Asset = { file: string; available: boolean };

export const assets: Record<AssetKey, Asset> = {
  logoWhite: { file: "logo-white.svg", available: true },
  logoBlack: { file: "logo-black.svg", available: false },
  favicon: { file: "favicon.png", available: true },
  ogShare: { file: "og-share.jpg", available: false },
  heroVan: { file: "hero-van.jpg", available: true },
  whyUsDriver: { file: "why-us-driver.jpg", available: true },
  fleetSmallVan: { file: "fleet-small-van.jpg", available: false },
  fleetMidiVan: { file: "fleet-midi-van.jpg", available: true },
  fleetSwb: { file: "fleet-swb.jpg", available: false },
  fleetMwb: { file: "fleet-mwb.jpg", available: true },
  fleetLwb: { file: "fleet-lwb.jpg", available: true },
  serviceSameDay: { file: "service-same-day.jpg", available: true },
  serviceHighValue: { file: "service-high-value.jpg", available: true },
  serviceDefault: { file: "service-default.jpg", available: true },
};

export const assetSrc = (key: AssetKey) => `/assets/${assets[key].file}`;
