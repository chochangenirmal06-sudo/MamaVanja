/**
 * ROI Calculator — data model
 *
 * Every number in here is a deliberately CONSERVATIVE estimate, not a precise
 * figure pulled from a keyword API. The goal is directional credibility for a
 * home-service owner who has never seen their own search volume — not false
 * precision. Each constant is commented with its reasoning so it's easy to
 * revise later without re-deriving the logic.
 */

export type TradeKey =
  | 'plumber'
  | 'electrician'
  | 'hvac'
  | 'roofer'
  | 'landscaper'
  | 'locksmith'
  | 'pest_control'
  | 'garage_door'
  | 'cleaning'
  | 'painter';

export type AreaSizeKey = 'small' | 'mid' | 'large';

export interface TradeProfile {
  label: string;
  /** Baseline monthly local searches for this trade in a MID-sized city. */
  baseMonthlySearches: number;
  /** Pre-filled average job value ($), adjustable via slider. */
  avgJobValue: number;
  /** Pre-filled close rate (% of calls that become paid jobs), adjustable via slider. */
  closeRatePct: number;
}

export const TRADES: Record<TradeKey, TradeProfile> = {
  plumber:      { label: 'Plumbing',          baseMonthlySearches: 880, avgJobValue: 350, closeRatePct: 38 },
  electrician:  { label: 'Electrical',        baseMonthlySearches: 720, avgJobValue: 400, closeRatePct: 35 },
  hvac:         { label: 'HVAC / Heating & Cooling', baseMonthlySearches: 1100, avgJobValue: 550, closeRatePct: 32 },
  roofer:       { label: 'Roofing',           baseMonthlySearches: 590, avgJobValue: 1200, closeRatePct: 22 },
  landscaper:   { label: 'Landscaping / Lawn Care', baseMonthlySearches: 640, avgJobValue: 220, closeRatePct: 40 },
  locksmith:    { label: 'Locksmith',         baseMonthlySearches: 480, avgJobValue: 150, closeRatePct: 45 },
  pest_control: { label: 'Pest Control',      baseMonthlySearches: 560, avgJobValue: 180, closeRatePct: 42 },
  garage_door:  { label: 'Garage Door Repair',baseMonthlySearches: 390, avgJobValue: 320, closeRatePct: 36 },
  cleaning:     { label: 'House Cleaning',    baseMonthlySearches: 710, avgJobValue: 160, closeRatePct: 30 },
  painter:      { label: 'Painting',          baseMonthlySearches: 430, avgJobValue: 650, closeRatePct: 28 },
};

export interface AreaProfile {
  label: string;
  helper: string;
  /** Multiplier applied to the trade's base (mid-city) search volume. */
  searchMultiplier: number;
}

export const AREA_SIZES: Record<AreaSizeKey, AreaProfile> = {
  small: { label: 'Small town / suburb',     helper: 'Under ~50,000 people',     searchMultiplier: 0.45 },
  mid:   { label: 'Mid-sized city',          helper: '~50,000–300,000 people',   searchMultiplier: 1.0  },
  large: { label: 'Large city / metro area', helper: '300,000+ people',          searchMultiplier: 2.2  },
};

export type RankingKey = 'top3' | 'page1' | 'page2plus' | 'unsure';

export interface RankingProfile {
  label: string;
  sublabel: string;
  /**
   * Share of clicks on a local "near me" search this position realistically
   * captures. Based on widely-cited local-pack CTR research, kept on the
   * conservative end deliberately. "unsure" defaults to the page2plus rate —
   * if you don't know, you're very unlikely to be in the map pack.
   */
  ctrShare: number;
}

export const RANKINGS: Record<RankingKey, RankingProfile> = {
  top3:      { label: 'Top 3 (the map pack)',        sublabel: 'You show up in the first 3 results with the map', ctrShare: 0.36 },
  page1:     { label: 'Page 1, but not top 3',        sublabel: 'You\u2019re there, just below the map pack',         ctrShare: 0.09 },
  page2plus: { label: 'Page 2 or further back',       sublabel: 'Most people never scroll this far',              ctrShare: 0.02 },
  unsure:    { label: 'Not sure',                      sublabel: 'We\u2019ll assume the same as page 2+ for now',      ctrShare: 0.02 },
};

/** The CTR share a business WOULD capture if ranked in the top 3 — used for the "potential" side of the comparison. */
export const TOP3_CTR_SHARE = RANKINGS.top3.ctrShare;

/** Conservative seasonality / no-show buffer applied to the final lead count. */
export const SEASONALITY_BUFFER = 0.85; // i.e. reduce raw estimate by 15%

export interface CalculatorInputs {
  trade: TradeKey;
  areaSize: AreaSizeKey;
  ranking: RankingKey;
  avgJobValue: number;
  closeRatePct: number;
}

export interface CalculatorResults {
  monthlySearches: number;
  currentMonthlyLeads: number;
  potentialMonthlyLeads: number;
  currentJobsWon: number;
  potentialJobsWon: number;
  currentMonthlyRevenue: number;
  potentialMonthlyRevenue: number;
  monthlyOpportunity: number;
  annualOpportunity: number;
}

export function calculateROI(inputs: CalculatorInputs): CalculatorResults {
  const trade = TRADES[inputs.trade];
  const area = AREA_SIZES[inputs.areaSize];
  const ranking = RANKINGS[inputs.ranking];

  const monthlySearches = Math.round(trade.baseMonthlySearches * area.searchMultiplier);

  const currentMonthlyLeads = Math.round(
    monthlySearches * ranking.ctrShare * SEASONALITY_BUFFER
  );
  const potentialMonthlyLeads = Math.round(
    monthlySearches * TOP3_CTR_SHARE * SEASONALITY_BUFFER
  );

  const closeRate = inputs.closeRatePct / 100;
  const currentJobsWon = Math.round(currentMonthlyLeads * closeRate);
  const potentialJobsWon = Math.round(potentialMonthlyLeads * closeRate);

  const currentMonthlyRevenue = currentJobsWon * inputs.avgJobValue;
  const potentialMonthlyRevenue = potentialJobsWon * inputs.avgJobValue;

  const monthlyOpportunity = Math.max(0, potentialMonthlyRevenue - currentMonthlyRevenue);
  const annualOpportunity = monthlyOpportunity * 12;

  return {
    monthlySearches,
    currentMonthlyLeads,
    potentialMonthlyLeads,
    currentJobsWon,
    potentialJobsWon,
    currentMonthlyRevenue,
    potentialMonthlyRevenue,
    monthlyOpportunity,
    annualOpportunity,
  };
}

export function formatCurrency(n: number): string {
  return n.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 });
}
