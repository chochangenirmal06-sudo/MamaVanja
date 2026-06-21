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
  /**
   * A realistic ceiling on jobs ONE typical small/solo-to-small-crew business
   * in this trade can actually complete in a month. Without this, high search
   * volume + high CTR + high close rate can mathematically produce more won
   * jobs than a real business has hours in the month to fulfill — physically
   * impossible regardless of how good their ranking is. This keeps the
   * calculator's "jobs won" number grounded in delivery capacity, not just
   * demand capture.
   */
  maxMonthlyJobs: number;
}

export const TRADES: Record<TradeKey, TradeProfile> = {
  plumber:      { label: 'Plumbing',          baseMonthlySearches: 880, avgJobValue: 350,  closeRatePct: 38, maxMonthlyJobs: 60 },
  electrician:  { label: 'Electrical',        baseMonthlySearches: 720, avgJobValue: 400,  closeRatePct: 35, maxMonthlyJobs: 55 },
  hvac:         { label: 'HVAC / Heating & Cooling', baseMonthlySearches: 1100, avgJobValue: 550, closeRatePct: 32, maxMonthlyJobs: 45 },
  // Blended average across repairs ($400-1,500) and full replacements (~$11,500) —
  // weighted toward repairs/smaller jobs since those are far higher-volume than
  // full replacements for a typical local roofer's monthly call mix.
  // maxMonthlyJobs is low because full crews can usually only complete a
  // handful of multi-day replacement jobs per month, even mixed with repairs.
  roofer:       { label: 'Roofing',           baseMonthlySearches: 590, avgJobValue: 2800, closeRatePct: 22, maxMonthlyJobs: 18 },
  landscaper:   { label: 'Landscaping / Lawn Care', baseMonthlySearches: 640, avgJobValue: 220, closeRatePct: 40, maxMonthlyJobs: 80 },
  locksmith:    { label: 'Locksmith',         baseMonthlySearches: 480, avgJobValue: 150,  closeRatePct: 45, maxMonthlyJobs: 90 },
  pest_control: { label: 'Pest Control',      baseMonthlySearches: 560, avgJobValue: 180,  closeRatePct: 42, maxMonthlyJobs: 90 },
  garage_door:  { label: 'Garage Door Repair',baseMonthlySearches: 390, avgJobValue: 320,  closeRatePct: 36, maxMonthlyJobs: 60 },
  cleaning:     { label: 'House Cleaning',    baseMonthlySearches: 710, avgJobValue: 160,  closeRatePct: 30, maxMonthlyJobs: 100 },
  painter:      { label: 'Painting',          baseMonthlySearches: 430, avgJobValue: 650,  closeRatePct: 28, maxMonthlyJobs: 25 },
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

/**
 * CRITICAL: ctrShare above is the click share of THE WHOLE POSITION GROUP
 * (e.g. 36% of all searchers click somewhere in the top-3 map pack), not
 * one business's individual share. The map pack has 3 listings competing
 * for that 36% — a single business doesn't capture all of it.
 *
 * This factor divides the group's click share down to ONE business's
 * realistic slice. 38% (rather than a naive 1/3 = 33%) reflects that the
 * #1 map-pack spot pulls disproportionately more clicks than #2 or #3,
 * so we model "ranking top 3" as roughly equivalent to landing the
 * better end of that group — while still being conservative, not
 * assuming the #1 spot outright.
 *
 * Page 1 (non-map-pack organic) and page 2+ are typically a single listing
 * each, so no division is needed there — the searcher sees one result,
 * not three competing ones.
 */
export const SINGLE_BUSINESS_SHARE_OF_TOP3: Record<RankingKey, number> = {
  top3: 0.38,
  page1: 1,
  page2plus: 1,
  unsure: 1,
};

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
    monthlySearches
      * ranking.ctrShare
      * SINGLE_BUSINESS_SHARE_OF_TOP3[inputs.ranking]
      * SEASONALITY_BUFFER
  );
  const potentialMonthlyLeads = Math.round(
    monthlySearches
      * TOP3_CTR_SHARE
      * SINGLE_BUSINESS_SHARE_OF_TOP3.top3
      * SEASONALITY_BUFFER
  );

  const closeRate = inputs.closeRatePct / 100;
  const currentJobsWon = Math.min(
    Math.round(currentMonthlyLeads * closeRate),
    trade.maxMonthlyJobs
  );
  const potentialJobsWon = Math.min(
    Math.round(potentialMonthlyLeads * closeRate),
    trade.maxMonthlyJobs
  );

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
