'use client';

import { useEffect, useState } from 'react';

declare global {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  interface Window { Cal: any; }
}

export function CalInlineEmbed() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (!window.Cal) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const p = (a: any, ar: any) => { (a.q = a.q || []).push(ar); };

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      window.Cal = function (...ar: any[]) {
        const cal = window.Cal;
        if (!cal.loaded) {
          cal.ns = {};
          cal.q  = [];
          const s = document.createElement('script');
          s.src   = 'https://app.cal.com/embed/embed.js';
          document.head.appendChild(s);
          cal.loaded = true;
        }
        if (ar[0] === 'init') {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const api: any = function (...a: any[]) { p(api, a); };
          api.q = [];
          const ns = ar[1];
          if (typeof ns === 'string') {
            cal.ns[ns] = cal.ns[ns] || api;
            p(cal.ns[ns], ar);
            p(cal, ['initNamespace', ns]);
          } else {
            p(cal, ar);
          }
          return;
        }
        p(cal, ar);
      };
    }

    const Cal = window.Cal;

    Cal('init', 'consultation', { origin: 'https://app.cal.com' });
    Cal.config = Cal.config || {};
    Cal.config.forwardQueryParams = true;

    Cal.ns.consultation('inline', {
      elementOrSelector: '#my-cal-inline-30min',
      config: { layout: 'month_view', useSlotsViewOnSmallScreen: 'true' },
      calLink: 'nirmal-chochange/consultation',
    });

    Cal.ns.consultation('ui', {
      hideEventTypeDetails: false,
      layout: 'month_view',
    });

    // Primary signal: Cal.com linkReady event
    Cal.ns.consultation('on', {
      action: 'linkReady',
      callback: () => setReady(true),
    });

    // Fallback: MutationObserver detects iframe injection
    const container = document.getElementById('my-cal-inline-30min');
    if (!container) return;

    const observer = new MutationObserver(() => {
      if (container.querySelector('iframe')) {
        setReady(true);
        observer.disconnect();
      }
    });
    observer.observe(container, { childList: true, subtree: true });

    return () => observer.disconnect();
  }, []);

  return (
    <div style={{ position: 'relative', minHeight: 650 }}>
      {/* Skeleton — fades out once embed content is detected */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          borderRadius: 10,
          overflow: 'hidden',
          opacity: ready ? 0 : 1,
          transition: 'opacity 0.45s ease',
          pointerEvents: ready ? 'none' : 'auto',
        }}
      >
        <div
          className="animate-pulse"
          style={{
            width: '100%',
            height: '100%',
            background: 'rgba(255,255,255,0.07)',
          }}
        />
      </div>

      {/* Cal.com embed target — fades in once ready */}
      <div
        id="my-cal-inline-30min"
        style={{
          width: '100%',
          minHeight: 650,
          overflow: 'auto',
          opacity: ready ? 1 : 0,
          transition: 'opacity 0.45s ease',
        }}
      />
    </div>
  );
}
