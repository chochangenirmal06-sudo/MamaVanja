import Image from 'next/image';

const BADGES = [
  {
    src: 'https://lwfiles.mycourse.app/brightlocalacademy-public/7a2ee11e212e8289492e2b289a549fe9.png',
    alt: 'BrightLocal Academy: How to Create a Winning Local SEO Strategy for Any Business',
  },
  {
    src: 'https://lwfiles.mycourse.app/brightlocalacademy-public/e15674db5193214b833759ed36cc7c26.png',
    alt: 'BrightLocal Academy: How to Create Custom Local SEO Audits',
  },
  {
    src: 'https://lwfiles.mycourse.app/brightlocalacademy-public/a48ee12b0a87386cecdbf78d6544cbca.png',
    alt: "BrightLocal Academy: A Beginner's Guide to Generating and Managing Reviews",
  },
  {
    src: 'https://lwfiles.mycourse.app/brightlocalacademy-public/ab21a5d3a2a9a633ba60de77861fa64e.png',
    alt: 'BrightLocal Academy: Course Completed: Essential GBP Tasks for Agencies',
  },
  {
    src: 'https://lwfiles.mycourse.app/brightlocalacademy-public/6e409bd0832b4cd3a263506a0578306a.png',
    alt: 'BrightLocal Academy: Course Completed: How to Master Local Keyword Research',
  },
];

export function TrustBar() {
  return (
    <section
      className="py-16 sm:py-20 text-center overflow-hidden"
      style={{ background: 'var(--brand-cream)' }}
      aria-label="Industry recognition"
    >
      <p
        className="font-sans font-normal mb-10 px-6"
        style={{
          fontSize: 'clamp(1rem, 1.25vw, 1.125rem)',
          color: 'var(--brand-dark-green)',
          opacity: 0.75,
        }}
      >
        Certified by the industry&apos;s leading local SEO platform
      </p>

      {/*
        Overflow containment: wrapper clips the track at the section's
        content boundary. The mask fades the cut edges to transparent.
        Inner track renders 4 copies of the 5-badge set so the loop
        has plenty of buffer across any screen width.
        Animation moves exactly --set-w pixels (one set's distance),
        reset to 0 = same visual = no jump.
      */}
      <div
        className="ticker-wrapper overflow-hidden"
        style={{
          maskImage:
            'linear-gradient(to right, transparent 0%, black 14%, black 86%, transparent 100%)',
          WebkitMaskImage:
            'linear-gradient(to right, transparent 0%, black 14%, black 86%, transparent 100%)',
        }}
      >
        <div
          className="ticker-track flex items-center"
          style={{ width: 'max-content', gap: '52px' }}
        >
          {/* Set 1 — real alt text for screen readers */}
          {BADGES.map((badge) => (
            <Image
              key={badge.src}
              src={badge.src}
              alt={badge.alt}
              width={126}
              height={126}
              loading="lazy"
              style={{ objectFit: 'contain', flexShrink: 0 }}
              className="w-24 h-24 sm:w-[126px] sm:h-[126px] transition-transform duration-200 ease-out hover:-translate-y-0.5"
            />
          ))}
          {/* Sets 2–4 — decorative duplicates, hidden from screen readers */}
          {[...BADGES, ...BADGES, ...BADGES].map((badge, i) => (
            <Image
              key={`dup-${i}`}
              src={badge.src}
              alt=""
              aria-hidden="true"
              width={126}
              height={126}
              loading="lazy"
              style={{ objectFit: 'contain', flexShrink: 0 }}
              className="w-24 h-24 sm:w-[126px] sm:h-[126px] transition-transform duration-200 ease-out hover:-translate-y-0.5"
            />
          ))}
        </div>
      </div>
    </section>
  );
}
