'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion, useReducedMotion, type Variants } from 'framer-motion';
import founderPhoto from '@/brand_assets/founder.png.jpeg';

const VIEWPORT = { once: true, margin: '-100px' } as const;

const fadeUp: Variants = {
  hidden:  { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
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

export function Founder() {
  const rm = useReducedMotion();

  return (
    <section
      className="pt-12 pb-20 md:pt-16 md:pb-28"
      style={{ background: 'var(--brand-cream)' }}
      aria-labelledby="founder-heading"
    >
      <div className="max-w-6xl mx-auto px-6 md:px-10">
        <div className="grid grid-cols-1 md:grid-cols-[3fr_2fr] gap-12 md:gap-16 lg:gap-20 items-center">

          {/* Text column — left on desktop, first on mobile */}
          <motion.div {...fadeProps(rm, 0)}>
            <h2
              id="founder-heading"
              className="font-display text-brand-dark-green mb-6"
              style={{ fontSize: 'clamp(1.875rem, 3.2vw, 2.75rem)', lineHeight: 1.15, fontWeight: 400 }}
            >
              The Founder
            </h2>
            <div
              className="font-sans text-brand-dark-green space-y-4"
              style={{ fontSize: '1.125rem', lineHeight: '1.75rem', opacity: 0.78 }}
            >
              <p>Hi, I&apos;m Nirmal Chochange, founder of MamaVanja.</p>
              <p>I&apos;m passionate about solving problems and helping businesses grow.</p>
              <p>
                If you&apos;re tired of waiting for the phone to ring, wondering why some weeks are
                packed while others are completely quiet, you&apos;re not alone.
              </p>
              <p>
                I started MamaVanja to help businesses like yours{' '}
                <strong style={{ fontWeight: 700, textDecoration: 'underline', textDecorationColor: 'var(--brand-green)', textDecorationThickness: '2px', textUnderlineOffset: '6px', textDecorationSkipInk: 'auto' }}>rank higher on Google and AI search</strong>,
                {' '}attract qualified customers consistently, and become{' '}
                <strong style={{ fontWeight: 700, textDecoration: 'underline', textDecorationColor: 'var(--brand-green)', textDecorationThickness: '2px', textUnderlineOffset: '6px', textDecorationSkipInk: 'auto' }}>the obvious choice when people are ready to buy</strong>.
              </p>
            </div>
          </motion.div>

          {/* Photo + button column — right on desktop, second on mobile */}
          <motion.div
            className="flex flex-col items-center gap-6"
            {...fadeProps(rm, 0.1)}
          >
            <Image
              src={founderPhoto}
              alt="Nirmal Chochange, founder of MamaVanja"
              width={300}
              height={300}
              loading="lazy"
              className="w-[200px] h-[200px] sm:w-[300px] sm:h-[300px] rounded-full object-cover"
            />
            <Link href="/book-a-call" className="btn btn--primary">
              Speak With Nirmal
            </Link>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
