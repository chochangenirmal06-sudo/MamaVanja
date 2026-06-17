import Link from 'next/link';

function MailIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="28"
      height="28"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <polyline points="3 7 12 13 21 7" />
    </svg>
  );
}

export default function AuditThankYou() {
  return (
    <main>
      <div
        style={{
          maxWidth: 640,
          margin: '0 auto',
          padding: '80px 24px 100px',
          textAlign: 'center',
        }}
      >
        <h1
          className="font-display text-brand-dark-green"
          style={{
            fontSize: 'clamp(2.25rem, 5.5vw, 4rem)',
            lineHeight: 1.15,
            fontWeight: 400,
            marginBottom: 28,
          }}
        >
          Your Audit Request Is In
        </h1>

        <p
          className="font-sans text-brand-dark-green"
          style={{
            fontSize: '1.375rem',
            lineHeight: '34px',
            opacity: 0.75,
            marginBottom: 36,
          }}
        >
          {/*
            TODO: Replace "soon" with a concrete turnaround commitment once decided —
            e.g. "within 48 hours" or "within 2 business days".
          */}
          We&apos;ll review your website and search presence, then reach out soon with what we find.
        </p>

        {/* What Happens Next callout */}
        <div
          style={{
            background: 'color-mix(in srgb, var(--brand-teal) 10%, var(--brand-cream))',
            border: '1.5px solid color-mix(in srgb, var(--brand-green) 22%, transparent)',
            borderRadius: 12,
            padding: 24,
            marginBottom: 44,
          }}
        >
          <div
            aria-hidden="true"
            style={{
              color: 'var(--brand-green)',
              display: 'flex',
              justifyContent: 'center',
              marginBottom: 14,
            }}
          >
            <MailIcon />
          </div>
          <p
            className="font-sans text-brand-dark-green"
            style={{
              fontSize: '1.0625rem',
              lineHeight: 1.65,
              opacity: 0.8,
              margin: 0,
            }}
          >
            Check your inbox over the next 12–24 hours — we&apos;ll send your audit to the email
            you provided. If you don&apos;t see it, take a look in your spam or promotions folder
            before assuming it didn&apos;t go through.
          </p>
        </div>

        <Link
          href="/"
          className="btn btn--outline"
          style={{ fontSize: '1.125rem', padding: '22px 56px' }}
        >
          Back to Home
        </Link>
      </div>
    </main>
  );
}
