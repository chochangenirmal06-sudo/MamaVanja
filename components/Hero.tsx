'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { SearchDemo } from './SearchDemo';

const btnMotion = { duration: 0.15 };

export function Hero() {
  const reducedMotion = useReducedMotion();

  return (
    <section
      className="relative overflow-hidden flex flex-col items-center text-center px-6 pt-12 pb-20"
      aria-labelledby="hero-h1"
    >
      <div className="relative z-10 flex flex-col items-center w-full">

        <h1
          id="hero-h1"
          className="hero-item font-display font-normal tracking-[-0.01em] text-brand-dark-green mb-5"
          style={{ fontSize: 'clamp(1.75rem, 4vw, 2.75rem)', lineHeight: 1.15, maxWidth: '1280px' }}
        >
          Get a steady stream of <strong>qualified leads</strong> who are already
          in buying mode by ranking in the{' '}
          <strong>Top&nbsp;3 on Google &amp; AI&nbsp;Search</strong> within{' '}
          <strong>90&nbsp;Days</strong> or we{' '}
          <strong>Work&nbsp;for&nbsp;Free</strong> until you do.
        </h1>

        <p
          className="hero-item font-sans font-normal leading-[1.7] text-brand-dark-green opacity-70 mb-10"
          style={{ fontSize: 'clamp(0.85rem, 1.4vw, 1rem)', maxWidth: '720px' }}
        >
          We help local businesses generate predictable inbound leads through SEO
          without relying on expensive ads, cold outreach, or referrals.
        </p>

        <div className="hero-demo w-full mb-10" style={{ maxWidth: '760px' }}>
          <SearchDemo />
        </div>

        <div className="hero-item flex flex-wrap justify-center gap-3">
          <motion.a
            href="/book-a-call"
            className="btn btn--outline"
            whileHover={reducedMotion ? undefined : { scale: 1.03 }}
            whileTap={reducedMotion   ? undefined : { scale: 0.97 }}
            transition={btnMotion}
          >
            Book A Free Consultation
          </motion.a>
          <motion.a
            href="/free-audit"
            className="btn btn--primary"
            whileHover={reducedMotion ? undefined : { scale: 1.03 }}
            whileTap={reducedMotion   ? undefined : { scale: 0.97 }}
            transition={btnMotion}
          >
            Get My Free SEO Audit
          </motion.a>
        </div>

      </div>
    </section>
  );
}
