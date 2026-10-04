/** Quote wizard vehicle options (separate from the Fleet page spec table). */
export type VehicleCategory = "normal" | "luton";

export const vehicleCategories: { id: VehicleCategory; title: string; desc: string }[] = [
  { id: "normal", title: "Normal Van", desc: "Small Van, SWB, MWB, LWB, XLWB" },
  { id: "luton", title: "Luton Van", desc: "Box Van & Curtainside options" },
];

export const vehicleTypes: Record<VehicleCategory, { id: string; title: string; desc: string }[]> = {
  normal: [
    { id: "small-van", title: "Small Van", desc: "Up to 800 kg · 1 UK pallet / 2 Euro pallets" },
    { id: "swb", title: "SWB", desc: "Up to 1,100 kg · 2 UK / 3 Euro pallets" },
    { id: "mwb", title: "MWB", desc: "Up to 1,200 kg · 3 UK / 4 Euro pallets" },
    { id: "lwb", title: "LWB", desc: "Up to 1,250 kg · 4 UK / 5 Euro pallets" },
    { id: "xlwb", title: "XLWB", desc: "Up to 1,250 kg · 4 UK / 6 Euro pallets" },
  ],
  luton: [
    { id: "luton-box", title: "Luton Box Van", desc: "Enclosed box body" },
    { id: "luton-box-tail", title: "Luton Box Van (Tail Lift)", desc: "Box body with tail lift" },
    { id: "luton-curtain", title: "Luton Curtainside Van", desc: "Side-loading curtain body" },
    { id: "luton-curtain-tail", title: "Luton Curtainside Van (Tail Lift)", desc: "Curtainside with tail lift" },
  ],
};

export const deliveryTypes = [
  { id: "standard", title: "Standard", desc: "24 to 48hr collection" },
  { id: "express", title: "Express", desc: "Same day, 60 to 90 min collection" },
  { id: "specialised", title: "Specialised", desc: "Fragile & Valuable" },
];

export const cargoTypes = [
  { id: "general", title: "General Cargo", desc: "Up to vehicle weight limit" },
  { id: "documents", title: "Documents / Letters", desc: "Paperwork and envelopes" },
];

export const labelFor = (list: { id: string; title: string }[], id: string) =>
  list.find((x) => x.id === id)?.title ?? id;
