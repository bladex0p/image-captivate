/**
 * PRICING CONFIG — the only place pricing lives.
 *
 * TODO (client): supply real rates. Until then SHOW_INSTANT_PRICE stays false
 * and the quote result shows "Final price confirmed by our dispatch team".
 * Never display invented prices.
 */
export const SHOW_INSTANT_PRICE = false;

export const VAT_RATE = 0.2;

/** PLACEHOLDER values — not real rates. */
export const RATES = {
  baseFee: { standard: 0, express: 0, specialised: 0 } as Record<string, number>,
  perMile: {
    "small-van": 0,
    swb: 0,
    mwb: 0,
    lwb: 0,
    xlwb: 0,
    "luton-box": 0,
    "luton-box-tail": 0,
    "luton-curtain": 0,
    "luton-curtain-tail": 0,
  } as Record<string, number>,
};

export type QuoteInput = { deliveryType: string; vehicleType: string; miles: number | null };
export type QuotePrice = { subtotal: number; vat: number; total: number };

export function calculateQuote(input: QuoteInput): QuotePrice | null {
  if (!SHOW_INSTANT_PRICE || input.miles == null) return null;
  const base = RATES.baseFee[input.deliveryType] ?? 0;
  const perMile = RATES.perMile[input.vehicleType] ?? 0;
  const subtotal = Math.round((base + perMile * input.miles) * 100) / 100;
  const vat = Math.round(subtotal * VAT_RATE * 100) / 100;
  return { subtotal, vat, total: Math.round((subtotal + vat) * 100) / 100 };
}
