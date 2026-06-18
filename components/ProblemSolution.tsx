'use client';

import type { ReactNode } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, useReducedMotion, type Variants } from 'framer-motion';
import { SearchDemo } from './SearchDemo';
import problemPhoto from '@/brand_assets/problem.png';
import desirePhoto  from '@/brand_assets/desire.png';

/* ── ANIMATION ─────────────────────────────────────────────────────
   whileInView is safe for below-the-fold content: SSR bakes opacity:0
   into the HTML, but by the time users scroll here JS is running and
   Framer Motion's IntersectionObserver fires the transition.
────────────────────────────────────────────────────────────────────── */
const VIEWPORT = { once: true, margin: '-100px' } as const;

const fadeUp: Variants = {
  hidden:  { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const rowContainer: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const rowItem: Variants = {
  hidden:  { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: 'easeOut' } },
};

const b4Container: Variants = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const b4Item: Variants = {
  hidden:  { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
};

type RM = boolean | null;

function fadeProps(rm: RM, delay = 0) {
  if (rm) return {};
  return {
    variants:    fadeUp,
    initial:     'hidden'  as const,
    whileInView: 'visible' as const,
    viewport:    VIEWPORT,
    transition:  { duration: 0.55, ease: 'easeOut' as const, delay },
  };
}

function staggerProps(rm: RM) {
  if (rm) return {};
  return {
    variants:    rowContainer,
    initial:     'hidden'  as const,
    whileInView: 'visible' as const,
    viewport:    VIEWPORT,
  };
}

/* ── SHARED ATOMS ─────────────────────────────────────────────────── */

const kickerStyle: React.CSSProperties = {
  fontWeight: 700,
  textDecoration: 'underline',
  textDecorationColor: 'var(--brand-green)',
  textDecorationThickness: '2px',
  textUnderlineOffset: '6px',
  textDecorationSkipInk: 'auto',
};

function Kicker({ children }: { children: ReactNode }) {
  return <strong style={kickerStyle}>{children}</strong>;
}

function BlockHeadline({ id, children }: { id?: string; children: ReactNode }) {
  return (
    <h2
      id={id}
      className="font-display text-brand-dark-green mb-5"
      style={{ fontSize: 'clamp(1.875rem, 3.2vw, 2.75rem)', lineHeight: 1.15, fontWeight: 400 }}
    >
      {children}
    </h2>
  );
}

function BodyText({ children }: { children: ReactNode }) {
  return (
    <div
      className="font-sans text-brand-dark-green space-y-4"
      style={{ fontSize: '1.1875rem', lineHeight: '30px', opacity: 0.78 }}
    >
      {children}
    </div>
  );
}

/* ── SVG ICON WRAPPER + ICONS ─────────────────────────────────────── */

function SvgIcon({ children }: { children: ReactNode }) {
  return (
    <svg
      width="20" height="20" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth={2}
      strokeLinecap="round" strokeLinejoin="round"
      aria-hidden="true"
    >
      {children}
    </svg>
  );
}

const PhoneIcon    = () => <SvgIcon><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 10.8a19.79 19.79 0 01-3.07-8.63 2 2 0 012-2.18h3a2 2 0 012 1.72c.13.96.36 1.9.7 2.81a2 2 0 01-.45 2.11L6.91 6.91a16 16 0 006.18 6.18l.27-.27a2 2 0 012.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0122 16.92z" /></SvgIcon>;
const StarIcon     = () => <SvgIcon><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" /></SvgIcon>;
const UserCheckIcon = () => <SvgIcon><path d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" /><circle cx="8.5" cy="7" r="4" /><polyline points="17 11 19 13 23 9" /></SvgIcon>;
const CalendarIcon  = () => <SvgIcon><rect x="3" y="4" width="18" height="18" rx="2" ry="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" /></SvgIcon>;
const TrendingUpIcon = () => <SvgIcon><polyline points="23 6 13.5 15.5 8.5 10.5 1 18" /><polyline points="17 6 23 6 23 12" /></SvgIcon>;
const TrophyIcon   = () => <SvgIcon><line x1="8" y1="21" x2="16" y2="21" /><line x1="12" y1="17" x2="12" y2="21" /><path d="M6 4h12l-1.5 8.5a5 5 0 01-9 0L6 4z" /><path d="M6 4H3.5A1.5 1.5 0 002 5.5v1A4.5 4.5 0 006.5 11" /><path d="M18 4h2.5A1.5 1.5 0 0122 5.5v1A4.5 4.5 0 0117.5 11" /></SvgIcon>;

/* ── WANT ITEMS ───────────────────────────────────────────────────── */
const WANT_ITEMS = [
  { Icon: PhoneIcon,       text: 'The phone ringing consistently' },
  { Icon: StarIcon,        text: 'Better-quality jobs' },
  { Icon: UserCheckIcon,   text: 'Customers coming to you instead of you chasing them' },
  { Icon: CalendarIcon,    text: "A schedule that's booked out in advance" },
  { Icon: TrendingUpIcon,  text: 'A business that keeps growing month after month' },
  { Icon: TrophyIcon,      text: 'To be the company everyone recommends in your area' },
] as const;

/* ── BLOCK LAYOUT SHELL ───────────────────────────────────────────── */
function BlockWrap({ bg, id, children }: { bg: string; id?: string; children: ReactNode }) {
  return (
    <div id={id} className="py-20 md:py-28" style={{ background: bg }}>
      <div className="max-w-6xl mx-auto px-6 md:px-10">
        {children}
      </div>
    </div>
  );
}

/* ── BLOCK 1 — THE PROBLEM ────────────────────────────────────────── */
function Block1({ rm }: { rm: RM }) {
  return (
    <BlockWrap bg="var(--brand-cream)">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 lg:gap-20 items-center">

        {/* Text — left on desktop, first on mobile (DOM order) */}
        <motion.div {...fadeProps(rm, 0)}>
          <BlockHeadline id="ps-heading">Does This Sound Like You?</BlockHeadline>
          <BodyText>
            <p>You&apos;re good at what you do. Your customers love your work.</p>
            <p>But some weeks you&apos;re slammed with jobs, and other weeks you&apos;re <Kicker>staring at your phone wondering why it hasn&apos;t rung</Kicker>.</p>
            <p>You know people need your service. You just don&apos;t know why they&apos;re <Kicker>calling your competitors instead of you</Kicker>.</p>
            <p>And after being out on jobs all day, the last thing you want to do is spend your evenings trying to figure out Google, websites, SEO, or whatever marketing trick people are talking about this week.</p>
          </BodyText>
        </motion.div>

        {/* Image — right on desktop, second on mobile */}
        <motion.div className="relative" {...fadeProps(rm, 0.1)}>
          {/* Atmospheric glow blob — sits behind the photo, peeks from bottom-right */}
          <div
            aria-hidden="true"
            style={{
              position: 'absolute',
              bottom: -36, right: -36,
              width: 180, height: 180,
              borderRadius: '50%',
              background: 'var(--brand-teal)',
              opacity: 0.3,
              filter: 'blur(50px)',
              zIndex: 0,
              pointerEvents: 'none',
            }}
          />
          {/* Photo with duotone overlay */}
          <div
            className="relative w-full rounded-2xl overflow-hidden"
            style={{ aspectRatio: '4 / 3', zIndex: 1 }}
          >
            <Image
              src={problemPhoto}
              alt="Tradesperson pausing mid-job to check their phone."
              fill
              loading="lazy"
              className="object-cover"
              style={{ filter: 'grayscale(1) contrast(1.1)' }}
            />
            <div
              aria-hidden="true"
              style={{
                position: 'absolute', inset: 0,
                pointerEvents: 'none',
                mixBlendMode: 'color',
                background: 'linear-gradient(135deg, var(--brand-dark-green), var(--brand-teal))',
              }}
            />
          </div>
        </motion.div>

      </div>
    </BlockWrap>
  );
}

/* ── BLOCK 2 — WHAT YOU ACTUALLY WANT ────────────────────────────── */
function Block2({ rm }: { rm: RM }) {
  return (
    <BlockWrap bg="var(--brand-cream)">
      {/*
        Mobile:  text first  (DOM order → top)
        Desktop: image left  (md:order-first), text right (md:order-last)
      */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 lg:gap-20 items-center">

        {/* Text — right on desktop, first on mobile */}
        <div className="md:order-last">
          <motion.div className="mb-6" {...fadeProps(rm, 0)}>
            <BlockHeadline>
              You don&apos;t want to become a marketing expert. You just want:
            </BlockHeadline>
          </motion.div>

          {/* Six staggered icon rows */}
          <motion.div className="space-y-2.5" {...staggerProps(rm)}>
            {WANT_ITEMS.map(({ Icon, text }, i) => (
              <motion.div
                key={text}
                variants={rm ? undefined : rowItem}
                className="flex items-center gap-4"
              >
                <span
                  className="shrink-0 flex items-center justify-center w-10 h-10 rounded-full"
                  style={{
                    background: 'color-mix(in srgb, var(--brand-teal) 20%, transparent)',
                    color: 'var(--brand-green)',
                  }}
                >
                  <Icon />
                </span>
                <span
                  className="font-sans text-brand-dark-green"
                  style={{ fontSize: '1.1875rem', lineHeight: '30px', opacity: 0.85 }}
                >
                  {i === WANT_ITEMS.length - 1
                    ? <>To be <Kicker>the company everyone recommends in your area</Kicker></>
                    : text}
                </span>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Image — left on desktop, second on mobile */}
        <motion.div className="relative md:order-first" {...fadeProps(rm, 0.1)}>
          {/* Atmospheric glow blob — sits behind the photo, peeks from top-left */}
          <div
            aria-hidden="true"
            style={{
              position: 'absolute',
              top: -36, left: -36,
              width: 180, height: 180,
              borderRadius: '50%',
              background: 'var(--brand-lavender)',
              opacity: 0.32,
              filter: 'blur(50px)',
              zIndex: 0,
              pointerEvents: 'none',
            }}
          />
          {/* Photo with duotone overlay — gradient mirrored at 315deg */}
          <div
            className="relative w-full rounded-2xl overflow-hidden"
            style={{ aspectRatio: '4 / 3', zIndex: 1 }}
          >
            <Image
              src={desirePhoto}
              alt="Tradesperson confidently talking with a customer on a busy job site."
              fill
              loading="lazy"
              className="object-cover"
              style={{ filter: 'grayscale(1) contrast(1.1)' }}
            />
            <div
              aria-hidden="true"
              style={{
                position: 'absolute', inset: 0,
                pointerEvents: 'none',
                mixBlendMode: 'color',
                background: 'linear-gradient(315deg, var(--brand-dark-green), var(--brand-teal))',
              }}
            />
          </div>
        </motion.div>

      </div>
    </BlockWrap>
  );
}

/* ── BLOCK 3 — THE FIX ────────────────────────────────────────────── */
function Block3({ rm }: { rm: RM }) {
  return (
    <BlockWrap bg="var(--brand-cream)">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 lg:gap-20 items-center">

        {/* Text — left on desktop, first on mobile. */}
        <motion.div {...fadeProps(rm, 0)}>
          <div style={{ width: 48, height: 3, background: 'var(--brand-green)', marginBottom: 18 }} aria-hidden="true" />
          <BlockHeadline>That&apos;s Exactly What We Help With</BlockHeadline>
          <BodyText>
            <p>At MamaVanja, we help local businesses get found when customers are actively searching for their services.</p>
            <p>No cold calling. No chasing referrals. No constantly pouring money into ads.</p>
            <p>We create custom SEO strategy that helps your business <Kicker>rank in the Top 3 on Google</Kicker> so the right customers find you first.</p>
            <p>And if we don&apos;t get you there within 90 days, <Kicker>we&apos;ll keep working for free until we do</Kicker>.</p>
          </BodyText>
        </motion.div>

        {/*
          SearchDemo recycled from the hero — serves as the "AI SEO agent" visual
          callback. Wrapping div applies the faint brand-green tint for this block.
          The demo naturally fits the column width (~50% of max-6xl) which reads
          at roughly 70% of the hero's 760px max-width.
        */}
        <motion.div {...fadeProps(rm, 0.1)}>
          <div
            className="rounded-2xl p-4 md:p-5"
            style={{
              background: 'color-mix(in srgb, var(--brand-green) 8%, var(--brand-cream))',
            }}
          >
            <SearchDemo />
          </div>
        </motion.div>

      </div>
    </BlockWrap>
  );
}

/* ── BLOCK 4 — BOOK A CALL ────────────────────────────────────────── */
function Block4({ rm }: { rm: RM }) {
  const containerProps = rm ? {} : {
    variants:    b4Container,
    initial:     'hidden'  as const,
    whileInView: 'visible' as const,
    viewport:    VIEWPORT,
  };

  return (
    <BlockWrap bg="var(--brand-cream)" id="book-a-call">
      <motion.div {...containerProps}>

        <motion.div variants={rm ? undefined : b4Item} className="max-w-[960px] mx-auto text-center mt-4">
          <BlockHeadline>
            Ready to Stop Wondering Where Your Next Customer Is Coming From?
          </BlockHeadline>
        </motion.div>

        <motion.div variants={rm ? undefined : b4Item} className="max-w-[960px] mx-auto text-center">
          <div
            className="font-sans text-brand-dark-green space-y-4"
            style={{ fontSize: '1.125rem', lineHeight: '1.75rem', opacity: 0.78 }}
          >
            <p>
              Book a free{' '}
              <strong style={{ fontWeight: 700, textDecoration: 'underline', textDecorationColor: 'var(--brand-green)', textDecorationThickness: '2px', textUnderlineOffset: '6px', textDecorationSkipInk: 'auto' }}>30-minute call</strong>
              {' '}and we&apos;ll show you exactly why competitors are outranking you and where you&apos;re losing leads on{' '}
              <strong style={{ fontWeight: 700, textDecoration: 'underline', textDecorationColor: 'var(--brand-green)', textDecorationThickness: '2px', textUnderlineOffset: '6px', textDecorationSkipInk: 'auto' }}>Google</strong>.
            </p>
            <p>
              If it looks like a good fit, we&apos;ll walk you through how our SEO program works and what it would take to get you{' '}
              <strong style={{ fontWeight: 700, textDecoration: 'underline', textDecorationColor: 'var(--brand-green)', textDecorationThickness: '2px', textUnderlineOffset: '6px', textDecorationSkipInk: 'auto' }}>ranked in 90 days</strong>.{' '}
              No pressure. Just a clear picture of where you stand and what&apos;s possible.
            </p>
          </div>
        </motion.div>

        <motion.div variants={rm ? undefined : b4Item} className="max-w-[960px] mx-auto text-center mt-10">
          <Link href="/book-a-call" className="btn btn--primary">
            Book A Free Consultation
          </Link>
        </motion.div>

      </motion.div>
    </BlockWrap>
  );
}

/* ── MAIN EXPORT ──────────────────────────────────────────────────── */
export function ProblemSolution() {
  const rm = useReducedMotion();

  return (
    <section aria-labelledby="ps-heading">
      <Block1 rm={rm} />
      <Block2 rm={rm} />
      <Block3 rm={rm} />
      <Block4 rm={rm} />
    </section>
  );
}
