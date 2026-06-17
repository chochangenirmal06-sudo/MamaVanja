'use client';

import { useState } from 'react';

export function AnnouncementBar() {
  const [visible, setVisible] = useState(true);
  if (!visible) return null;

  return (
    <div
      className="relative flex items-center justify-center w-full py-2.5 px-10 text-center"
      style={{ backgroundColor: 'var(--brand-green)' }}
    >
      <a
        href="#audit"
        className="text-white text-xs font-medium tracking-wide hover:underline font-mono"
      >
        Free SEO audit for the next 10 businesses this month. Claim yours →
      </a>
      <button
        onClick={() => setVisible(false)}
        className="absolute right-4 top-1/2 -translate-y-1/2 text-white/70 hover:text-white text-xl leading-none"
        aria-label="Dismiss announcement"
      >
        ×
      </button>
    </div>
  );
}
