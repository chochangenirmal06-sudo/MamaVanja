'use client';

import { useState } from 'react';
import { AuditFormModal } from '@/components/AuditFormModal';
import { TrustBar } from '@/components/TrustBar';
import { BackHomeLink } from '@/components/BackHomeLink';

function OrnamentalDivider() {
  return (
    <div
      style={{
        maxWidth: 600,
        margin: '72px auto 0',
        position: 'relative',
        height: 20,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
      aria-hidden="true"
    >
      {/* Gradient line */}
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
      {/* Diamond — box-shadow in cream creates the gap so the line reads around it */}
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

export default function FreeAudit() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <main>
        <BackHomeLink />
        <div
          style={{
            maxWidth: 800,
            margin: '0 auto',
            padding: '52px 24px 0',
            textAlign: 'center',
          }}
        >
          {/* nth-child(1) → hero-item delay 0ms */}
          <h1
            className="hero-item font-display text-brand-dark-green"
            style={{
              fontSize: 'clamp(2.25rem, 5.5vw, 4rem)',
              lineHeight: 1.15,
              fontWeight: 400,
              marginBottom: 36,
            }}
          >
            Find Out Why You&apos;re{' '}
            <strong style={{ color: 'var(--brand-green)', fontWeight: 'bold', textDecoration: 'underline', textDecorationColor: 'var(--brand-green)', textDecorationThickness: '2px', textUnderlineOffset: '6px', textDecorationSkipInk: 'auto' }}>Not Ranking</strong>
            {' '}in the Top 3 on Google
          </h1>

          {/* nth-child(2) → hero-item delay 150ms */}
          <p
            className="hero-item font-sans text-brand-dark-green"
            style={{
              fontSize: '1.375rem',
              lineHeight: '34px',
              opacity: 0.78,
              marginBottom: 56,
              maxWidth: 640,
              marginLeft: 'auto',
              marginRight: 'auto',
            }}
          >
            We&apos;ll personally review your website, Google Business Profile, and current
            search visibility, then send you a clear breakdown of what&apos;s holding you back
            and exactly what to fix first in order to rank higher on Google.
          </p>

          {/* nth-child(3) → hero-item delay 300ms — page-scoped size override */}
          <button
            className="hero-item btn btn--primary"
            onClick={() => setModalOpen(true)}
            style={{ fontSize: '1.125rem', padding: '22px 56px' }}
          >
            Get My Free SEO Audit
          </button>
        </div>

        <OrnamentalDivider />

        <TrustBar />
      </main>

      <AuditFormModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </>
  );
}
