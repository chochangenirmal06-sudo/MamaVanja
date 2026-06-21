'use client';

import { useMemo, useState } from 'react';
import {
  TRADES,
  AREA_SIZES,
  RANKINGS,
  calculateROI,
  formatCurrency,
  type TradeKey,
  type AreaSizeKey,
  type RankingKey,
} from '@/lib/roiCalculatorData';

const labelStyle: React.CSSProperties = {
  display: 'block',
  fontFamily: 'var(--font-mono)',
  fontSize: '0.75rem',
  fontWeight: 600,
  letterSpacing: '0.04em',
  textTransform: 'uppercase',
  color: 'var(--brand-green)',
  marginBottom: 6,
};

const helperStyle: React.CSSProperties = {
  fontFamily: 'var(--font-sans)',
  fontSize: '0.8125rem',
  color: 'var(--brand-dark-green)',
  opacity: 0.55,
  marginTop: 4,
  marginBottom: 0,
};

const selectStyle: React.CSSProperties = {
  width: '100%',
  padding: '13px 14px',
  borderRadius: 8,
  border: '1.5px solid rgba(15, 61, 46, 0.2)',
  fontFamily: 'var(--font-sans)',
  fontSize: '1rem',
  color: 'var(--brand-dark-green)',
  background: '#fff',
  outline: 'none',
  boxSizing: 'border-box',
  cursor: 'pointer',
};

function FieldCard({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        background: '#fff',
        border: '1px solid rgba(15, 61, 46, 0.1)',
        borderRadius: 14,
        padding: '20px 22px',
      }}
    >
      {children}
    </div>
  );
}

function SliderField({
  label,
  value,
  min,
  max,
  step,
  display,
  onChange,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  display: string;
  onChange: (v: number) => void;
}) {
  return (
    <FieldCard>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 10 }}>
        <span style={labelStyle}>{label}</span>
        <span
          className="font-display"
          style={{ fontSize: '1.25rem', color: 'var(--brand-dark-green)', fontWeight: 500 }}
        >
          {display}
        </span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={e => onChange(Number(e.target.value))}
        style={{
          width: '100%',
          accentColor: 'var(--brand-green)',
          cursor: 'pointer',
        }}
      />
    </FieldCard>
  );
}

export function RoiCalculator() {
  const [trade, setTrade] = useState<TradeKey>('plumber');
  const [areaSize, setAreaSize] = useState<AreaSizeKey>('mid');
  const [ranking, setRanking] = useState<RankingKey>('page2plus');
  const [avgJobValue, setAvgJobValue] = useState<number>(TRADES.plumber.avgJobValue);
  const [closeRatePct, setCloseRatePct] = useState<number>(TRADES.plumber.closeRatePct);
  const [breakdownOpen, setBreakdownOpen] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);

  function handleTradeChange(next: TradeKey) {
    setTrade(next);
    // Re-anchor sliders to the new trade's defaults so the tool never feels "stuck"
    // on a previous trade's numbers — same trick the reference calculator used.
    setAvgJobValue(TRADES[next].avgJobValue);
    setCloseRatePct(TRADES[next].closeRatePct);
    setHasInteracted(true);
  }

  const results = useMemo(
    () => calculateROI({ trade, areaSize, ranking, avgJobValue, closeRatePct }),
    [trade, areaSize, ranking, avgJobValue, closeRatePct]
  );

  const rankingEntries = Object.entries(RANKINGS) as [RankingKey, (typeof RANKINGS)[RankingKey]][];

  return (
    <div style={{ maxWidth: 720, margin: '0 auto' }}>
      {/* ── STEP 1 — BUSINESS BASICS ─────────────────────────────── */}
      <div style={{ marginBottom: 28 }}>
        <p
          className="font-mono"
          style={{ fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.04em', textTransform: 'uppercase', color: 'var(--brand-green)', marginBottom: 14 }}
        >
          Step 1 — Your Business
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }} className="roi-grid-2">
          <FieldCard>
            <label htmlFor="roi-trade" style={labelStyle}>Your trade</label>
            <select
              id="roi-trade"
              value={trade}
              onChange={e => handleTradeChange(e.target.value as TradeKey)}
              style={selectStyle}
            >
              {(Object.entries(TRADES) as [TradeKey, (typeof TRADES)[TradeKey]][]).map(([key, t]) => (
                <option key={key} value={key}>{t.label}</option>
              ))}
            </select>
            <p style={helperStyle}>What you do</p>
          </FieldCard>

          <FieldCard>
            <label htmlFor="roi-area" style={labelStyle}>Where you work</label>
            <select
              id="roi-area"
              value={areaSize}
              onChange={e => { setAreaSize(e.target.value as AreaSizeKey); setHasInteracted(true); }}
              style={selectStyle}
            >
              {(Object.entries(AREA_SIZES) as [AreaSizeKey, (typeof AREA_SIZES)[AreaSizeKey]][]).map(([key, a]) => (
                <option key={key} value={key}>{a.label}</option>
              ))}
            </select>
            <p style={helperStyle}>{AREA_SIZES[areaSize].helper}</p>
          </FieldCard>
        </div>
      </div>

      {/* ── STEP 2 — RANKING ─────────────────────────────────────── */}
      <div style={{ marginBottom: 28 }}>
        <p
          className="font-mono"
          style={{ fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.04em', textTransform: 'uppercase', color: 'var(--brand-green)', marginBottom: 14 }}
        >
          Step 2 — Where You Show Up
        </p>
        <FieldCard>
          <label style={labelStyle}>
            Google your service + your city right now. Where do you show up?
          </label>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginTop: 10 }}>
            {rankingEntries.map(([key, r]) => (
              <button
                key={key}
                type="button"
                onClick={() => { setRanking(key); setHasInteracted(true); }}
                style={{
                  textAlign: 'left',
                  padding: '12px 14px',
                  borderRadius: 8,
                  border: `1.5px solid ${ranking === key ? 'var(--brand-green)' : 'rgba(15, 61, 46, 0.15)'}`,
                  background: ranking === key ? 'color-mix(in srgb, var(--brand-green) 8%, white)' : '#fff',
                  cursor: 'pointer',
                  transition: 'all 150ms ease',
                }}
              >
                <div className="font-sans" style={{ fontSize: '0.95rem', fontWeight: 500, color: 'var(--brand-dark-green)' }}>
                  {r.label}
                </div>
                <div className="font-sans" style={{ fontSize: '0.8125rem', color: 'var(--brand-dark-green)', opacity: 0.55 }}>
                  {r.sublabel}
                </div>
              </button>
            ))}
          </div>
        </FieldCard>
      </div>

      {/* ── STEP 3 — YOUR NUMBERS ────────────────────────────────── */}
      <div style={{ marginBottom: 28 }}>
        <p
          className="font-mono"
          style={{ fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.04em', textTransform: 'uppercase', color: 'var(--brand-green)', marginBottom: 6 }}
        >
          Step 3 — Your Numbers
        </p>
        <p className="font-sans" style={{ fontSize: '0.8125rem', color: 'var(--brand-dark-green)', opacity: 0.55, marginBottom: 14 }}>
          Pre-filled with typical numbers for your trade — drag to adjust if you know your real figures.
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }} className="roi-grid-2">
          <SliderField
            label="Average job value"
            value={avgJobValue}
            min={50}
            max={3000}
            step={10}
            display={formatCurrency(avgJobValue)}
            onChange={v => { setAvgJobValue(v); setHasInteracted(true); }}
          />
          <SliderField
            label="Close rate"
            value={closeRatePct}
            min={10}
            max={70}
            step={1}
            display={`${closeRatePct}%`}
            onChange={v => { setCloseRatePct(v); setHasInteracted(true); }}
          />
        </div>
      </div>

      {/* ── METHODOLOGY NOTE ──────────────────────────────────────── */}
      <div
        style={{
          background: 'color-mix(in srgb, var(--brand-lavender) 22%, var(--brand-cream))',
          border: '1.5px solid color-mix(in srgb, var(--brand-green) 18%, transparent)',
          borderRadius: 12,
          padding: '16px 20px',
          marginBottom: 28,
        }}
      >
        <p className="font-sans" style={{ fontSize: '0.8125rem', lineHeight: 1.6, color: 'var(--brand-dark-green)', opacity: 0.75, margin: 0 }}>
          <strong style={{ opacity: 1 }}>Conservative by design.</strong> These figures use cautious,
          widely-observed click-through rates for local search positions and a 15% buffer for
          seasonality — not best-case numbers. Your actual results depend on your competition and market.
        </p>
      </div>

      {/* ── RESULTS ───────────────────────────────────────────────── */}
      <div
        className={hasInteracted ? 'hero-item' : undefined}
        style={{
          background: 'var(--brand-dark-green)',
          borderRadius: 18,
          padding: '32px 28px',
          marginBottom: 16,
          boxShadow: '0 0 0 1px rgba(15,61,46,0.06), 0 16px 48px rgba(15,61,46,0.18)',
        }}
      >
        <p
          className="font-mono"
          style={{ fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--brand-teal)', marginBottom: 18 }}
        >
          What This Could Be Costing You
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 24 }} className="roi-grid-2">
          <div>
            <div className="font-sans" style={{ fontSize: '0.8125rem', color: '#fff', opacity: 0.6, marginBottom: 4 }}>
              Per month
            </div>
            <div className="font-display" style={{ fontSize: 'clamp(2rem, 6vw, 2.75rem)', fontWeight: 500, color: '#fff', lineHeight: 1.05 }}>
              {formatCurrency(results.monthlyOpportunity)}
            </div>
          </div>
          <div>
            <div className="font-sans" style={{ fontSize: '0.8125rem', color: '#fff', opacity: 0.6, marginBottom: 4 }}>
              Per year
            </div>
            <div className="font-display" style={{ fontSize: 'clamp(2rem, 6vw, 2.75rem)', fontWeight: 500, color: 'var(--brand-teal)', lineHeight: 1.05 }}>
              {formatCurrency(results.annualOpportunity)}
            </div>
          </div>
        </div>

        <p className="font-sans" style={{ fontSize: '0.875rem', color: '#fff', opacity: 0.65, lineHeight: 1.6, margin: 0 }}>
          That&apos;s the estimated revenue gap between where you rank today and ranking in the
          top 3 for &ldquo;{TRADES[trade].label.toLowerCase()} near me&rdquo; searches in your area.
        </p>

        {/* Secondary stats */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: 1,
            marginTop: 24,
            background: 'rgba(255,255,255,0.12)',
            borderRadius: 10,
            overflow: 'hidden',
          }}
          className="roi-grid-2"
        >
          <StatCell label="Monthly searches" value={results.monthlySearches.toLocaleString()} sub="Local searches in your area" />
          <StatCell label="Leads now" value={results.currentMonthlyLeads.toLocaleString()} sub={`At your current position`} />
          <StatCell label="Leads at top 3" value={results.potentialMonthlyLeads.toLocaleString()} sub="If you ranked top 3" />
          <StatCell label="Jobs won now vs. top 3" value={`${results.currentJobsWon} → ${results.potentialJobsWon}`} sub="At your close rate" />
        </div>
      </div>

      {/* ── COLLAPSIBLE MATH BREAKDOWN ───────────────────────────── */}
      <div style={{ marginBottom: 8 }}>
        <button
          type="button"
          onClick={() => setBreakdownOpen(o => !o)}
          className="font-mono"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            fontSize: '0.8125rem',
            fontWeight: 600,
            letterSpacing: '0.03em',
            color: 'var(--brand-green)',
            padding: '8px 0',
          }}
        >
          <span style={{ transform: breakdownOpen ? 'rotate(90deg)' : 'rotate(0deg)', transition: 'transform 150ms ease', display: 'inline-block' }}>
            ▸
          </span>
          How we calculated this
        </button>

        {breakdownOpen && (
          <div
            style={{
              background: '#fff',
              border: '1px solid rgba(15, 61, 46, 0.1)',
              borderRadius: 10,
              padding: '4px 20px',
              marginTop: 4,
            }}
          >
            <BreakdownRow label="Monthly local searches for your trade" value={results.monthlySearches.toLocaleString()} />
            <BreakdownRow label={`Click share at "${RANKINGS[ranking].label}"`} value={`${Math.round(RANKINGS[ranking].ctrShare * 100)}%`} />
            <BreakdownRow label="Click share at top 3" value={`${Math.round(0.36 * 100)}%`} />
            <BreakdownRow label="Seasonality buffer" value="−15%" />
            <BreakdownRow label="Leads now → at top 3" value={`${results.currentMonthlyLeads} → ${results.potentialMonthlyLeads}`} />
            <BreakdownRow label="Your close rate" value={`${closeRatePct}%`} />
            <BreakdownRow label="Jobs won now → at top 3" value={`${results.currentJobsWon} → ${results.potentialJobsWon}`} />
            <BreakdownRow label="Average job value" value={formatCurrency(avgJobValue)} />
            <BreakdownRow label="Monthly revenue now → at top 3" value={`${formatCurrency(results.currentMonthlyRevenue)} → ${formatCurrency(results.potentialMonthlyRevenue)}`} last />
          </div>
        )}
      </div>

      <style>{`
        @media (max-width: 640px) {
          .roi-grid-2 { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}

function StatCell({ label, value, sub }: { label: string; value: string; sub: string }) {
  return (
    <div style={{ background: 'var(--brand-dark-green)', padding: '16px 18px' }}>
      <div className="font-sans" style={{ fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.04em', color: '#fff', opacity: 0.55, marginBottom: 6 }}>
        {label}
      </div>
      <div className="font-display" style={{ fontSize: '1.4rem', color: '#fff', fontWeight: 500, marginBottom: 2 }}>
        {value}
      </div>
      <div className="font-sans" style={{ fontSize: '0.7rem', color: '#fff', opacity: 0.45 }}>
        {sub}
      </div>
    </div>
  );
}

function BreakdownRow({ label, value, last }: { label: string; value: string; last?: boolean }) {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        gap: 12,
        padding: '12px 0',
        borderBottom: last ? 'none' : '1px solid rgba(15, 61, 46, 0.08)',
      }}
    >
      <span className="font-sans" style={{ fontSize: '0.875rem', color: 'var(--brand-dark-green)', opacity: 0.7 }}>
        {label}
      </span>
      <span className="font-mono" style={{ fontSize: '0.875rem', color: 'var(--brand-dark-green)', fontWeight: 600, textAlign: 'right' }}>
        {value}
      </span>
    </div>
  );
}
