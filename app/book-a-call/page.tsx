import { CalInlineEmbed } from '@/components/CalInlineEmbed';
import { BackHomeLink } from '@/components/BackHomeLink';

const kickerStyle: React.CSSProperties = {
  fontWeight: 700,
  textDecoration: 'underline',
  textDecorationColor: 'var(--brand-green)',
  textDecorationThickness: '2px',
  textUnderlineOffset: '6px',
  textDecorationSkipInk: 'auto',
};

export default function BookACall() {
  return (
    <main style={{ background: 'var(--brand-cream)' }}>
      <BackHomeLink />
      <div
        style={{
          maxWidth: 960,
          margin: '0 auto',
          padding: '52px 24px 100px',
          textAlign: 'center',
        }}
      >
        {/* nth-child(1) → hero-item delay 0ms */}
        <h1
          className="hero-item font-display text-brand-dark-green"
          style={{
            fontSize: 'clamp(1.875rem, 3.2vw, 2.75rem)',
            lineHeight: 1.15,
            fontWeight: 400,
            marginBottom: 28,
          }}
        >
          Ready to Stop Wondering Where Your Next Customer Is Coming From?
        </h1>

        {/* nth-child(2) → hero-item delay 150ms */}
        <div
          className="hero-item font-sans text-brand-dark-green space-y-4"
          style={{
            fontSize: '1.125rem',
            lineHeight: '1.75rem',
            opacity: 0.78,
            maxWidth: 680,
            margin: '0 auto',
          }}
        >
          <p>
            Book a free{' '}
            <strong style={kickerStyle}>30-minute call</strong>
            {' '}and we&apos;ll show you exactly why competitors are outranking you and where
            you&apos;re losing leads on{' '}
            <strong style={kickerStyle}>Google</strong>.
          </p>
          <p>
            If it looks like a good fit, we&apos;ll walk you through how our SEO program works and
            what it would take to get you{' '}
            <strong style={kickerStyle}>ranked in 90 days</strong>.{' '}
            No pressure. Just a clear picture of where you stand and what&apos;s possible.
          </p>
        </div>

        {/* nth-child(3) → hero-item delay 300ms */}
        <div className="hero-item" style={{ marginTop: 48 }}>
          <CalInlineEmbed />
        </div>
      </div>
    </main>
  );
}
