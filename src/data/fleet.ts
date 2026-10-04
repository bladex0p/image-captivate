import type { AssetKey } from "./assets";

export type FleetVehicle = {
  name: string;
  description: string;
  image: AssetKey;
  spec: {
    payload: string;
    loadSpace: string;
    floorArea: string;
    pallets: string;
    tailLift: string;
  };
};

export const fleetIntro =
  "LES Transport operates a versatile fleet designed to accommodate a wide range of transport needs. This flexibility allows us to handle everything from small parcels to larger freight deliveries, ensuring the right vehicle is used for every job.";

export const fleet: FleetVehicle[] = [
  {
    name: "Small Vans",
    description:
      "Ideal for smaller deliveries, our small vans are perfect for transporting documents, parcels and lightweight goods quickly and efficiently. A cost-effective option for urgent local and regional deliveries.",
    image: "fleetSmallVan",
    spec: { payload: "~500 kg", loadSpace: "~1.6 x 1.1 x 1.1 m", floorArea: "~1.8 m²", pallets: "Not listed", tailLift: "No" },
  },
  {
    name: "Medium / Midi Vans",
    description:
      "Our medium or midi vans offer additional space for larger parcels and multiple items, making them a practical choice for small business deliveries and multi-item transport.",
    image: "fleetMidiVan",
    spec: { payload: "~800 kg", loadSpace: "~2.2 x 1.4 x 1.3 m", floorArea: "~3.1 m²", pallets: "1 UK pallet", tailLift: "Optional" },
  },
  {
    name: "Short Wheelbase Vans (SWB)",
    description:
      "Short wheelbase vans provide a balance between capacity and manoeuvrability, making them suitable for medium-sized deliveries and urban transport where flexibility is important.",
    image: "fleetSwb",
    spec: { payload: "~1,000 kg", loadSpace: "~2.6 x 1.7 x 1.6 m", floorArea: "~4.4 m²", pallets: "2 UK pallets", tailLift: "Optional" },
  },
  {
    name: "Medium Wheelbase Vans (MWB)",
    description:
      "Medium wheelbase vans offer increased load space for bulkier items, making them ideal for larger deliveries that require extra capacity without moving to a full-size vehicle.",
    image: "fleetMwb",
    spec: { payload: "~1,200 kg", loadSpace: "~3.2 x 1.7 x 1.7 m", floorArea: "~5.4 m²", pallets: "3 UK pallets", tailLift: "Optional" },
  },
  {
    name: "Long Wheelbase Vans (LWB up to 4m)",
    description:
      "Our long wheelbase vans provide maximum capacity for large or heavy deliveries, including palletised goods and bulk shipments, ensuring efficient transport for more demanding logistics needs.",
    image: "fleetLwb",
    spec: { payload: "~1,200 kg", loadSpace: "~4.2 x 1.7 x 1.9 m", floorArea: "~7.1 m²", pallets: "4 UK pallets", tailLift: "No" },
  },
];

export const specFootnote =
  "Specifications are typical and vary by vehicle, make and model. UK pallet capacity is based on standard 1.0 x 1.2 m pallets. We'll always match the right vehicle to your delivery; share your dimensions and weight when you request a quote and we'll confirm the best fit.";
