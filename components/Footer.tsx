'use client';

import Image from 'next/image';
import Link from 'next/link';
import invertedLogo from '@/brand_assets/invertedlogo.png';
import { useScrollToSection } from '@/lib/scrollToSection';

const labelStyle: React.CSSProperties = {
  fontFamily: 'var(--font-mono)',
  color: 'var(--brand-cream)',
  opacity: 0.65,
  fontSize: '0.8125rem',
  fontWeight: 500,
  letterSpacing: '0.09em',
  textTransform: 'uppercase',
  marginBottom: 18,
  display: 'block',
};

const navLinkStyle: React.CSSProperties = {
  fontFamily: 'var(--font-sans)',
  color: 'var(--brand-cream)',
  opacity: 0.8,
  fontSize: '1.0625rem',
  textDecoration: 'none',
  display: 'inline-block',
};

const buttonLinkStyle: React.CSSProperties = {
  ...navLinkStyle,
  background: 'none',
  border: 'none',
  cursor: 'pointer',
  padding: 0,
  textAlign: 'left',
};

function FacebookIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M7 10v4h3v7h4v-7h3l1-4h-4v-2a1 1 0 0 1 1-1h3v-4h-3a5 5 0 0 0-5 5v2h-3" />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="4" y="4" width="16" height="16" rx="4" />
      <circle cx="12" cy="12" r="3" />
      <line x1="16.5" y1="7.5" x2="16.5" y2="7.501" />
    </svg>
  );
}

function XIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M4 4l11.733 16h4.267l-11.733-16z" />
      <path d="M4 20l6.768-6.768m2.46-2.46l6.772-6.772" />
    </svg>
  );
}

function TikTokIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M21 7.917v4.034a9.948 9.948 0 0 1-5.905-1.951v8.876a7.25 7.25 0 1 1-5.895-7.106v4.171a3.25 3.25 0 1 0 1.895 2.935v-15.876h4.005c0 2.16 1.6 3.971 3.9 4.917z" />
    </svg>
  );
}

const SOCIAL = [
  { label: 'Facebook',  Icon: FacebookIcon },
  { label: 'Instagram', Icon: InstagramIcon },
  { label: 'X',         Icon: XIcon },
  { label: 'TikTok',    Icon: TikTokIcon },
] as const;

export function Footer() {
  const year = new Date().getFullYear();

  const scrollToFaq = useScrollToSection('faq-heading');

  return (
    <footer style={{ background: 'var(--brand-dark-green)' }}>
      <div className="max-w-6xl mx-auto px-6 md:px-10 pt-16 md:pt-20 pb-8 md:pb-10">

        {/* ── Top two-column grid ── */}
        <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr_1fr] gap-12 md:gap-8 lg:gap-16 mb-14 md:mb-16 md:items-start">

          {/* Left: logo + tagline + social */}
          <div>
            <Image
              src={invertedLogo}
              alt="MamaVanja"
              width={224}
              height={56}
              style={{ height: 56, width: 'auto' }}
            />
            <p
              style={{
                fontFamily: 'var(--font-sans)',
                color: 'var(--brand-cream)',
                opacity: 0.7,
                fontSize: '1.0625rem',
                lineHeight: 1.65,
                marginTop: 20,
                marginBottom: 28,
              }}
            >
              Helping local businesses get found, get called, and get booked.
            </p>

            {/* Social icon row */}
            <div className="flex items-center gap-3">
              {/* TODO: add real social links once profiles exist */}
              {SOCIAL.map(({ label, Icon }) => (
                <a
                  key={label}
                  href="#"
                  aria-label={label}
                  style={{
                    width: 44, height: 44, borderRadius: '50%', flexShrink: 0,
                    border: '1px solid color-mix(in srgb, var(--brand-cream) 28%, transparent)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: 'var(--brand-cream)', opacity: 0.75,
                    transition: 'opacity 150ms ease',
                  }}
                >
                  <Icon />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <span style={labelStyle}>Quick Links</span>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 12 }}>
              <li>
                <button onClick={scrollToFaq} style={buttonLinkStyle}>FAQs</button>
              </li>
              <li>
                <Link href="/book-a-call" style={navLinkStyle}>Book a Call</Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <span style={labelStyle}>Contact</span>
            <a
              href="mailto:nirmal.mamavanja@gmail.com"
              style={{ ...navLinkStyle, wordBreak: 'break-word' }}
            >
              nirmal.mamavanja@gmail.com
            </a>
          </div>

        </div>

        {/* ── CTA nudge ── */}
        <p className="text-center" style={{ marginBottom: 40 }}>
          <Link
            href="/book-a-call"
            style={{
              fontFamily: 'var(--font-sans)',
              color: 'var(--brand-cream)',
              opacity: 0.8,
              fontSize: '1.0625rem',
              textDecoration: 'none',
              borderBottom: '1px solid color-mix(in srgb, var(--brand-cream) 35%, transparent)',
              paddingBottom: 1,
            }}
          >
            Ready to get started? Book a free consultation →
          </Link>
        </p>

        {/* ── Bottom bar ── */}
        <div
          style={{
            borderTop: '1px solid color-mix(in srgb, var(--brand-cream) 15%, transparent)',
            paddingTop: 24,
          }}
        >
          <p
            className="text-center"
            style={{
              fontFamily: 'var(--font-sans)',
              color: 'var(--brand-cream)',
              opacity: 0.5,
              fontSize: '0.875rem',
              margin: 0,
            }}
          >
            © {year} MamaVanja. All rights reserved.
          </p>
        </div>

      </div>
    </footer>
  );
}
