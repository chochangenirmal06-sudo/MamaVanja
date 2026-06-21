'use client';

import { useState } from 'react';
import { RoiCalculator } from '@/components/RoiCalculator';
import { SearchDemo } from '@/components/SearchDemo';
import { AuditFormModal } from '@/components/AuditFormModal';
import { BackHomeLink } from '@/components/BackHomeLink';

function OrnamentalDivider() {
  return (
    <div
      style={{
        maxWidth: 600,
        margin: '64px auto',
        position: 'relative',
        height: 20,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
      aria-hidden="true"
    >
      <div
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          top: '50%',
          height: 1.5,
          transform: 'translateY(-50%)',
          background: 'linear-gradient(90deg, transparent, var(--brand-green), transparent)',
        }}
      />
      <div
        style={{
          position: 'relative',
          zIndex: 1,
          width: 8,
          height: 8,
          background: 'var(--brand-green)',
          transform: 'rotate(45deg)',
          boxShadow: '0 0 0 5px var(--brand-cream)',
        }}
      />
    </div>
  );
}

export default function RoiCalculatorPage() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <main>
        <BackHomeLink />

        {/* ── HERO ──────────────────────────────────────────────── */}
        <div
          style={{
            maxWidth: 760,
            margin: '0 auto',
            padding: '52px 24px 0',
            textAlign: 'center',
          }}
        >
          <h1
            className="hero-item font-display text-brand-dark-green"
            style={{
              fontSize: 'clamp(2.25rem, 5.5vw, 3.75rem)',
              lineHeight: 1.15,
              fontWeight: 400,
              marginBottom: 24,
            }}
          >
            What Is Not Ranking on Google{' '}
            <strong style={{ color: 'var(--brand-green)', fontWeight: 'bold' }}>
              Actually Costing You?
            </strong>
          </h1>

          <p
            className="hero-item font-sans text-brand-dark-green"
            style={{
              fontSize: '1.25rem',
              lineHeight: '32px',
              opacity: 0.75,
              marginBottom: 44,
              maxWidth: 600,
              marginLeft: 'auto',
              marginRight: 'auto',
            }}
          >
            Answer a few quick questions about your business — no traffic numbers or
            analytics required. We&apos;ll estimate what you&apos;re leaving on the table.
          </p>
        </div>

        {/* ── CALCULATOR ────────────────────────────────────────── */}
        <div className="hero-demo" style={{ padding: '0 24px 24px' }}>
          <RoiCalculator />
        </div>

        <OrnamentalDivider />

        {/* ── CHECK YOUR RANKING ───────────────────────────────── */}
        <div style={{ maxWidth: 760, margin: '0 auto', padding: '0 24px', textAlign: 'center' }}>
          <p
            className="font-mono"
            style={{
              fontSize: '0.75rem',
              fontWeight: 600,
              letterSpacing: '0.06em',
              textTransform: 'uppercase',
              color: 'var(--brand-green)',
              marginBottom: 14,
            }}
          >
            Next — See Where You Actually Stand
          </p>
          <h2
            className="font-display text-brand-dark-green"
            style={{ fontSize: 'clamp(1.75rem, 4vw, 2.5rem)', lineHeight: 1.2, fontWeight: 400, marginBottom: 18 }}
          >
            Here&apos;s How to Check Your Real Google Ranking
          </h2>
          <p
            className="font-sans text-brand-dark-green"
            style={{ fontSize: '1.0625rem', lineHeight: 1.7, opacity: 0.72, marginBottom: 40, maxWidth: 560, marginLeft: 'auto', marginRight: 'auto' }}
          >
            Open a new tab, search for your service plus your city the way a customer
            would, and look at the map pack — the 3 results with pins next to them.
            That&apos;s the only ranking that matters for local jobs.
          </p>

          <div style={{ maxWidth: 420, margin: '0 auto 48px' }}>
            <SearchDemo />
          </div>
        </div>

        {/* ── AUDIT CTA ─────────────────────────────────────────── */}
        <div
          style={{
            maxWidth: 720,
            margin: '0 auto',
            padding: '40px 24px',
          }}
        >
          <div
            style={{
              background: 'var(--brand-dark-green)',
              borderRadius: 20,
              padding: '44px 36px',
              textAlign: 'center',
            }}
          >
            <h2
              className="font-display"
              style={{ fontSize: 'clamp(1.6rem, 4vw, 2.25rem)', lineHeight: 1.2, fontWeight: 400, color: '#fff', marginBottom: 14 }}
            >
              Not in the Top 3? Let&apos;s Find Out Why.
            </h2>
            <p
              className="font-sans"
              style={{ fontSize: '1.0625rem', lineHeight: 1.7, color: '#fff', opacity: 0.72, marginBottom: 28, maxWidth: 480, marginLeft: 'auto', marginRight: 'auto' }}
            >
              We&apos;ll personally review your website and Google Business Profile, then
              send you a clear breakdown of what&apos;s holding you back — free, no obligation.
            </p>
            <button
              className="btn btn--primary"
              onClick={() => setModalOpen(true)}
              style={{ fontSize: '1.0625rem', padding: '20px 48px' }}
            >
              Get My Free SEO Audit
            </button>
          </div>
        </div>
      </main>

      <AuditFormModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </>
  );
}
