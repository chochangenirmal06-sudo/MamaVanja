'use client';

import { useState } from 'react';
import { motion, useReducedMotion, type Variants } from 'framer-motion';

const FAQS = [
  {
    q: "I've been burned by an agency before. How are you different?",
    a: "You're not alone. Many businesses come to us after bad agency experiences: long contracts, vague reports, and no real clarity. We built our process to be the opposite. You own everything we create: your website, Google Business Profile, content, and citations. No transfer fees, no hostage situations. We don't lock you into contracts. You stay because it's working. And everything we do is documented so you always know what's happening and why.",
  },
  {
    q: "What does it cost to work with you?",
    a: "We don't have a fixed price and it depends on market, competition, and goals. We'll review your situation on a call and recommend the right plan based on where you are and where you want to go.",
  },
  {
    q: "What kind of businesses do you work with?",
    a: "We specialize in home service businesses: plumbers, HVAC, roofers, electricians, landscapers, pest control, and similar trades. We work with companies that want more qualified calls and consistent growth.",
  },
  {
    q: "What do you need from me to get started?",
    a: "Just a few basics: access to your Google Business Profile, details about your services and service area, and job photos if available. We handle execution. You stay focused on running your business.",
  },
  {
    q: "How can we get started?",
    a: "Book a free consultation with us. On that call, we'll learn about your business and figure out if we're the right fit to help you grow. If it makes sense to move forward, we'll walk you through exactly what that looks like.",
  },
] as const;

const VIEWPORT = { once: true, margin: '-80px' } as const;

const fadeUp: Variants = {
  hidden:  { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const listContainer: Variants = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.07, delayChildren: 0.12 } },
};

const listItem: Variants = {
  hidden:  { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: 'easeOut' } },
};

type RM = boolean | null;

function AccordionItem({
  q, a, isOpen, onToggle, idx, rm,
}: {
  q: string; a: string; isOpen: boolean;
  onToggle: () => void; idx: number; rm: RM;
}) {
  return (
    <motion.div variants={rm ? undefined : listItem}>
      <div
        style={{
          background: '#ffffff',
          borderRadius: 16,
          border: '1px solid color-mix(in srgb, var(--brand-dark-green) 10%, transparent)',
          boxShadow: '0 2px 14px rgba(15, 61, 46, 0.06), 0 1px 3px rgba(15, 61, 46, 0.04)',
          padding: 24,
        }}
      >
        <button
          id={`faq-btn-${idx}`}
          aria-expanded={isOpen}
          aria-controls={`faq-answer-${idx}`}
          onClick={onToggle}
          style={{
            display: 'flex', width: '100%',
            alignItems: 'center', justifyContent: 'space-between',
            gap: 16, background: 'none', border: 'none',
            cursor: 'pointer', padding: 0,
          }}
        >
          <span
            className="font-sans text-brand-dark-green text-left"
            style={{ fontSize: '1.125rem', fontWeight: 500, lineHeight: 1.4 }}
          >
            {q}
          </span>
          <span
            aria-hidden="true"
            style={{
              width: 36, height: 36, borderRadius: '50%', flexShrink: 0,
              border: '1px solid color-mix(in srgb, var(--brand-dark-green) 18%, transparent)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              transform: isOpen ? 'rotate(45deg)' : 'rotate(0deg)',
              transition: rm ? 'none' : 'transform 200ms ease',
              color: 'var(--brand-dark-green)',
            }}
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
              <line x1="7" y1="1" x2="7" y2="13" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
              <line x1="1" y1="7" x2="13" y2="7" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
            </svg>
          </span>
        </button>

        <div
          id={`faq-answer-${idx}`}
          role="region"
          aria-labelledby={`faq-btn-${idx}`}
          style={{
            display: 'grid',
            gridTemplateRows: isOpen ? '1fr' : '0fr',
            transition: rm ? 'none' : 'grid-template-rows 260ms ease',
          }}
        >
          <div style={{ overflow: 'hidden', minHeight: 0 }}>
            <p
              className="font-sans text-brand-dark-green"
              style={{ fontSize: '1rem', lineHeight: 1.6, opacity: 0.65, paddingTop: 16 }}
            >
              {a}
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export function Faq() {
  const rm = useReducedMotion();
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  return (
    <section
      className="py-20 md:py-28"
      style={{ background: 'var(--brand-cream)' }}
      aria-labelledby="faq-heading"
    >
      <div className="max-w-[800px] mx-auto px-6 md:px-10">

        {/* Section header */}
        <motion.div
          className="text-center mb-12 md:mb-16"
          variants={rm ? undefined : fadeUp}
          initial={rm ? undefined : 'hidden'}
          whileInView={rm ? undefined : 'visible'}
          viewport={VIEWPORT}
          transition={{ duration: 0.55, ease: 'easeOut' }}
        >
          {/* Pill badge */}
          <div
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              background: '#ffffff',
              borderRadius: 9999,
              border: '1px solid color-mix(in srgb, var(--brand-dark-green) 14%, transparent)',
              boxShadow: '0 1px 4px rgba(15, 61, 46, 0.08)',
              padding: '6px 14px',
              marginBottom: 20,
            }}
          >
            <svg
              width="15" height="15" viewBox="0 0 24 24" fill="none"
              stroke="var(--brand-dark-green)" strokeWidth={2}
              strokeLinecap="round" strokeLinejoin="round"
              aria-hidden="true"
            >
              <circle cx="12" cy="12" r="10" />
              <path d="M9.09 9a3 3 0 015.83 1c0 2-3 3-3 3" />
              <circle cx="12" cy="17" r="0.5" fill="var(--brand-dark-green)" />
            </svg>
            <span
              className="font-mono text-brand-dark-green"
              style={{ fontSize: '0.75rem', fontWeight: 500, letterSpacing: '0.04em' }}
            >
              FAQs
            </span>
          </div>

          <h2
            id="faq-heading"
            className="font-display text-brand-dark-green"
            style={{ fontSize: 'clamp(1.875rem, 3.2vw, 2.75rem)', lineHeight: 1.15, fontWeight: 400 }}
          >
            Frequently Asked <em>Questions</em>
          </h2>
        </motion.div>

        {/* Accordion stack */}
        <motion.div
          className="space-y-3"
          variants={rm ? undefined : listContainer}
          initial={rm ? undefined : 'hidden'}
          whileInView={rm ? undefined : 'visible'}
          viewport={VIEWPORT}
        >
          {FAQS.map((faq, i) => (
            <AccordionItem
              key={i}
              idx={i}
              q={faq.q}
              a={faq.a}
              isOpen={openIdx === i}
              onToggle={() => setOpenIdx(openIdx === i ? null : i)}
              rm={rm}
            />
          ))}
        </motion.div>

      </div>
    </section>
  );
}
