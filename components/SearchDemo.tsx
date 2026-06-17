'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

/* ── TIMING CONSTANTS (mirrors CSS vars — retune here) ─────────── */
const TYPE_SPEED         = 45;    // ms per char typed
const BACKSPACE_SPEED    = 22;    // ms per char erased
const FADE_DURATION      = 400;   // ms — results panel fade
const HOLD_DURATION      = 2750;  // ms — fully-revealed pause
const TYPE_PAUSE         = 300;   // ms — gap before showing results
const CROSSFADE_DURATION = 400;   // ms — light ↔ dark transition

const ACT1_QUERY = 'roof repair in bradford';
const ACT2_QUERY = 'hey chatgpt, find the best roof repair in bradford';

const sleep = (ms: number) => new Promise<void>(r => setTimeout(r, ms));

export function SearchDemo() {
  const prefersReducedMotion = useReducedMotion();

  const [isDark,         setIsDark]         = useState(false);
  const [act1Text,       setAct1Text]       = useState('');
  const [act2Text,       setAct2Text]       = useState('');
  const [mappackVisible, setMappackVisible] = useState(false);
  const [aiVisible,      setAiVisible]      = useState(false);
  const [showAct1Cursor, setShowAct1Cursor] = useState(true);
  const [showAct2Cursor, setShowAct2Cursor] = useState(false);

  const act1Ref    = useRef('');
  const act2Ref    = useRef('');
  /*
    Generation counter instead of a boolean cancel flag.
    Problem with the old boolean: the second useEffect invocation (React
    strict-mode double-invoke) resets cancelRef.current = false before
    the first loop's pending setTimeout callbacks resolve. Those callbacks
    then see false and keep running, producing two parallel loops that
    each append characters → doubled output.

    Fix: each effect invocation captures its own generation number. Cleanup
    increments the counter, so any pending async step from the old invocation
    will see a mismatched generation and return early. The new invocation
    captures the next number and becomes the sole active loop.
  */
  const loopGenRef = useRef(0);

  useEffect(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (reducedMotion) {
      setAct1Text(ACT1_QUERY);
      setShowAct1Cursor(false);
      setMappackVisible(true);
      return;
    }

    const myGen = ++loopGenRef.current;
    const alive = () => loopGenRef.current === myGen;

    async function typeIn(
      setter: (s: string) => void,
      ref: React.MutableRefObject<string>,
      text: string,
      speed: number
    ) {
      for (const ch of text) {
        if (!alive()) return;
        ref.current += ch;
        setter(ref.current);
        await sleep(speed);
      }
    }

    async function eraseAll(
      setter: (s: string) => void,
      ref: React.MutableRefObject<string>,
      speed: number
    ) {
      while (ref.current.length > 0) {
        if (!alive()) return;
        ref.current = ref.current.slice(0, -1);
        setter(ref.current);
        await sleep(speed);
      }
    }

    async function runLoop() {
      while (alive()) {
        /* ── ACT 1: Light / Google ── */
        setIsDark(false);
        act1Ref.current = '';
        act2Ref.current = '';
        setAct1Text('');
        setAct2Text('');
        setShowAct1Cursor(true);
        setShowAct2Cursor(false);
        setMappackVisible(false);
        setAiVisible(false);

        await typeIn(setAct1Text, act1Ref, ACT1_QUERY, TYPE_SPEED);
        if (!alive()) return;
        await sleep(TYPE_PAUSE);
        if (!alive()) return;
        setMappackVisible(true);
        await sleep(HOLD_DURATION);
        if (!alive()) return;
        setMappackVisible(false);
        await sleep(FADE_DURATION);
        if (!alive()) return;
        await eraseAll(setAct1Text, act1Ref, BACKSPACE_SPEED);
        if (!alive()) return;

        /* ── Crossfade → Act 2: Dark / ChatGPT ── */
        setShowAct1Cursor(false);
        setShowAct2Cursor(true);
        setIsDark(true);
        await sleep(CROSSFADE_DURATION);
        if (!alive()) return;

        await typeIn(setAct2Text, act2Ref, ACT2_QUERY, TYPE_SPEED);
        if (!alive()) return;
        await sleep(TYPE_PAUSE);
        if (!alive()) return;
        setAiVisible(true);
        await sleep(HOLD_DURATION);
        if (!alive()) return;
        setAiVisible(false);
        await sleep(FADE_DURATION);
        if (!alive()) return;
        await eraseAll(setAct2Text, act2Ref, BACKSPACE_SPEED);
        if (!alive()) return;

        /* ── Crossfade → Act 1 ── */
        setShowAct2Cursor(false);
        setIsDark(false);
        await sleep(CROSSFADE_DURATION);
      }
    }

    runLoop();
    // Increment generation → all pending async steps from this invocation
    // see a stale gen and exit, stopping the loop cleanly.
    return () => { loopGenRef.current++; };
  }, []);

  const panelTransition = { duration: prefersReducedMotion ? 0 : FADE_DURATION / 1000 };

  return (
    <div
      role="img"
      aria-label="Dual-search animation showing Bradford Roofing Co. ranking #1 on Google and being recommended first by ChatGPT"
    >
      <p className="sr-only">
        This animation cycles between two search scenarios. First: a Google search bar types
        &ldquo;roof repair in bradford&rdquo; and a map pack appears showing Bradford Roofing Co. ranked #1
        with a 4.9-star rating. Second: a ChatGPT prompt types &ldquo;find the best roof repair in
        bradford&rdquo; and an AI response lists Bradford Roofing Co. as the top recommendation.
      </p>

      <div className={`demo-card${isDark ? ' is-dark' : ''}`} aria-hidden="true">

        {/* ── ACT 1: LIGHT / GOOGLE ───────────────────────────── */}
        <div className="act act-1">
          <div
            className="flex items-center gap-2 px-3.5 py-2.5 border-b"
            style={{ borderColor: 'rgba(15,61,46,0.07)', background: 'rgba(255,255,255,0.5)' }}
          >
            <div className="flex gap-1 shrink-0">
              <div className="w-[9px] h-[9px] rounded-full bg-[#FF5F57]" />
              <div className="w-[9px] h-[9px] rounded-full bg-[#FFBD2E]" />
              <div className="w-[9px] h-[9px] rounded-full bg-[#28C840]" />
            </div>
            <div
              className="flex-1 flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[0.67rem]"
              style={{ background: 'rgba(15,61,46,0.06)', color: 'var(--brand-dark-green)', opacity: 0.55 }}
            >
              <LockIcon />
              google.com/search
            </div>
          </div>

          <div className="flex flex-col gap-3 p-3.5">
            {/* Search pill */}
            <div
              className="flex items-center gap-2 rounded-full px-3.5 py-2"
              style={{ background: '#fff', border: '1.5px solid rgba(15,61,46,0.12)', boxShadow: '0 1px 4px rgba(15,61,46,0.05)' }}
            >
              <SearchIcon />
              <span
                className="flex-1 text-left text-[0.83rem] min-h-[1.2em]"
                style={{ color: 'var(--brand-dark-green)' }}
              >
                {act1Text}
                {showAct1Cursor && (
                  <span
                    className="inline-block w-[1.5px] h-[0.9em] align-bottom rounded-sm cursor-blink"
                    style={{ background: 'var(--brand-green)' }}
                  />
                )}
              </span>
            </div>

            {/*
              Fixed-height panel area — height never changes regardless of
              whether the map pack is visible or not, so nothing below this
              component shifts. Both panels live permanently in the DOM and
              are shown/hidden via opacity only (no mount/unmount).
            */}
            <div style={{ position: 'relative', minHeight: 230 }}>
              <motion.div
                style={{
                  position: 'absolute',
                  inset: 0,
                  pointerEvents: mappackVisible ? 'auto' : 'none',
                }}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: mappackVisible ? 1 : 0, y: mappackVisible ? 0 : 6 }}
                transition={panelTransition}
              >
                <div className="flex gap-2.5">
                  <div
                    className="shrink-0 w-[110px] min-h-[136px] rounded-xl relative overflow-hidden"
                    style={{ background: 'color-mix(in srgb, var(--brand-teal) 38%, white)' }}
                  >
                    <svg className="absolute inset-0 w-full h-full" viewBox="0 0 110 136" fill="none" aria-hidden="true">
                      <path d="M12 42 Q32 35 58 48 Q80 60 102 50" stroke="white" strokeWidth="3"   strokeOpacity="0.5"  strokeLinecap="round"/>
                      <path d="M8  78 Q32 68 62 80 Q84 88 108 77" stroke="white" strokeWidth="2"   strokeOpacity="0.35" strokeLinecap="round"/>
                      <path d="M46 12 Q50 44 42 82 Q36 104 50 130" stroke="white" strokeWidth="2"  strokeOpacity="0.35" strokeLinecap="round"/>
                      <path d="M4  104 Q26 97 48 103 Q70 109 92 103" stroke="white" strokeWidth="1.5" strokeOpacity="0.25" strokeLinecap="round"/>
                      <path d="M76 18 Q80 54 74 92"                stroke="white" strokeWidth="1.5" strokeOpacity="0.2"  strokeLinecap="round"/>
                      <ellipse cx="24" cy="93" rx="15" ry="9" fill="rgba(255,255,255,0.14)"/>
                      <ellipse cx="84" cy="38" rx="11" ry="7" fill="rgba(255,255,255,0.10)"/>
                    </svg>
                    <MapPin style={{ top: '41%', left: '44%' }} primary />
                    <MapPin style={{ top: '62%', left: '68%' }} />
                    <MapPin style={{ top: '27%', left: '65%' }} />
                  </div>

                  <div className="flex-1 flex flex-col gap-1.5">
                    <ResultRow winner>
                      <div className="flex items-center gap-1.5 text-[0.7rem] font-semibold mb-[0.15rem]" style={{ color: 'var(--brand-dark-green)' }}>
                        1. Bradford Roofing Co.
                        <span
                          className="text-[0.58rem] font-bold px-1.5 py-0.5 rounded"
                          style={{ background: 'color-mix(in srgb, var(--brand-teal) 48%, white)', color: 'var(--brand-dark-green)' }}
                        >
                          #1
                        </span>
                      </div>
                      <div className="text-[0.6rem]" style={{ color: 'rgba(15,61,46,0.48)' }}>
                        <span className="text-amber-400">★★★★★</span> 4.9 · 87 reviews
                      </div>
                    </ResultRow>
                    <ResultRow>
                      <div className="text-[0.7rem] mb-[0.15rem]" style={{ color: 'rgba(15,61,46,0.4)' }}>2. Yorkshire Roof Specialists</div>
                      <div className="text-[0.6rem] opacity-55" style={{ color: 'rgba(15,61,46,0.48)' }}><span className="text-amber-400">★★★★</span>☆ 4.2 · 31 reviews</div>
                    </ResultRow>
                    <ResultRow>
                      <div className="text-[0.7rem] mb-[0.15rem]" style={{ color: 'rgba(15,61,46,0.4)' }}>3. BD Roofers Ltd.</div>
                      <div className="text-[0.6rem] opacity-55" style={{ color: 'rgba(15,61,46,0.48)' }}><span className="text-amber-400">★★★★</span>☆ 4.0 · 18 reviews</div>
                    </ResultRow>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>

        {/* ── ACT 2: DARK / CHATGPT ───────────────────────────── */}
        <div className="act act-2">
          <div className="px-4 pt-3.5 pb-1 text-[0.78rem] font-medium text-left tracking-wide shrink-0" style={{ color: 'rgba(255,255,255,0.72)' }}>
            ChatGPT<span className="text-[0.6rem] ml-1 opacity-50">▾</span>
          </div>

          {/* Fixed-height panel area mirrors act-1's dimensions */}
          <div style={{ position: 'relative', minHeight: 230 }}>
            <motion.div
              style={{
                position: 'absolute',
                top: 6, right: 14, bottom: 4, left: 14,
                pointerEvents: aiVisible ? 'auto' : 'none',
              }}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: aiVisible ? 1 : 0, y: aiVisible ? 0 : 6 }}
              transition={panelTransition}
            >
              <div
                className="rounded-xl p-3"
                style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.08)' }}
              >
                <p className="text-[0.68rem] mb-2 leading-[1.45]" style={{ color: 'rgba(255,255,255,0.5)', textAlign: 'left' }}>
                  Here are the best roofers in Bradford I&apos;d recommend:
                </p>
                <AiItem num="1" winner reason="Top-rated local roofer: 4.9★ across 87 reviews, fast response &amp; fully insured.">
                  Bradford Roofing Co.
                </AiItem>
                <AiItem num="2" reason="Good reputation, fewer reviews than the top pick.">
                  Yorkshire Roof Specialists
                </AiItem>
                <AiItem num="3" reason="Solid option, best for smaller repair jobs." last>
                  BD Roofers Ltd.
                </AiItem>
              </div>
            </motion.div>
          </div>

          <div className="px-3.5 pb-3.5 pt-1.5 shrink-0">
            <div
              className="flex items-center gap-2 rounded-full px-3 py-2"
              style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.13)' }}
            >
              <div
                className="w-[22px] h-[22px] rounded-full flex items-center justify-center text-[1.05rem] shrink-0"
                style={{ background: 'rgba(255,255,255,0.12)', color: 'rgba(255,255,255,0.6)' }}
                aria-hidden="true"
              >
                +
              </div>
              <div className="flex-1 text-left font-mono text-[0.78rem] min-h-[1em]" style={{ color: 'rgba(255,255,255,0.82)' }}>
                {act2Text}
                {showAct2Cursor && (
                  <span
                    className="inline-block w-[1.5px] h-[0.9em] align-bottom rounded-sm cursor-blink"
                    style={{ background: 'rgba(255,255,255,0.75)' }}
                  />
                )}
              </div>
              <div className="flex items-center gap-1.5 shrink-0" style={{ color: 'rgba(255,255,255,0.5)' }} aria-hidden="true">
                <MicIcon />
                <Soundwave />
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

/* ── SUB-COMPONENTS ─────────────────────────────────────────────── */

function LockIcon() {
  return (
    <svg width="9" height="10" viewBox="0 0 9 10" fill="none" aria-hidden="true">
      <rect x="0.75" y="4.25" width="7.5" height="5.25" rx="1.25" fill="currentColor" opacity="0.5"/>
      <path d="M2.5 4.25V2.75a2 2 0 014 0v1.5" stroke="currentColor" strokeWidth="1.1" fill="none" opacity="0.5"/>
    </svg>
  );
}

function SearchIcon() {
  return (
    <svg className="shrink-0" width="15" height="15" viewBox="0 0 15 15" fill="none" aria-hidden="true"
         style={{ color: 'rgba(15,61,46,0.38)' }}>
      <circle cx="6.5" cy="6.5" r="4.25" stroke="currentColor" strokeWidth="1.4"/>
      <path d="M10 10L13 13" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
    </svg>
  );
}

function MapPin({ style, primary }: { style: React.CSSProperties; primary?: boolean }) {
  return (
    <div className="absolute" style={{ ...style, transform: 'translate(-50%, -100%)' }}>
      <div
        style={{
          width:  primary ? 16 : 12,
          height: primary ? 16 : 12,
          background: primary ? 'var(--brand-green)' : 'rgba(15,61,46,0.28)',
          border: '2px solid white',
          boxShadow: '0 1px 4px rgba(0,0,0,0.22)',
          borderRadius: '50% 50% 50% 0',
          transform: 'rotate(-45deg)',
        }}
      />
    </div>
  );
}

function ResultRow({ winner, children }: { winner?: boolean; children: React.ReactNode }) {
  return (
    <div
      className="px-2 py-1.5 rounded-lg text-left"
      style={{
        borderLeft: winner ? '2.5px solid var(--brand-green)' : '2.5px solid transparent',
        background: winner ? 'rgba(255,255,255,0.95)' : 'rgba(255,255,255,0.5)',
      }}
    >
      {children}
    </div>
  );
}

function AiItem({
  num, winner, reason, last, children,
}: {
  num: string;
  winner?: boolean;
  reason: string;
  last?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div
      className="flex gap-1.5 py-1.5 text-left"
      style={{ borderBottom: last ? 'none' : '1px solid rgba(255,255,255,0.05)' }}
    >
      <span className="text-[0.63rem] shrink-0 pt-[0.1em] min-w-[1rem]" style={{ color: 'rgba(255,255,255,0.3)' }}>
        {num}.
      </span>
      <div className="flex-1">
        <div
          className="flex items-center gap-1.5 text-[0.72rem] font-semibold mb-[0.12rem]"
          style={{ color: winner ? '#fff' : 'rgba(255,255,255,0.38)' }}
        >
          {winner && (
            <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: 'var(--brand-green)' }} />
          )}
          {children}
        </div>
        <div
          className="text-[0.61rem] leading-[1.4]"
          style={{ color: winner ? 'rgba(255,255,255,0.4)' : 'rgba(255,255,255,0.3)' }}
          dangerouslySetInnerHTML={{ __html: reason }}
        />
      </div>
    </div>
  );
}

function MicIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
      <rect x="4.25" y="1" width="5.5" height="7.5" rx="2.75" fill="currentColor" opacity="0.65"/>
      <path d="M2 7.5a5 5 0 0010 0" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" fill="none" opacity="0.65"/>
      <line x1="7" y1="12.5" x2="7" y2="10.5" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" opacity="0.65"/>
    </svg>
  );
}

function Soundwave() {
  const heights = [3, 7, 11, 6, 3];
  return (
    <div className="flex items-center gap-[1.5px]" style={{ height: 12 }} aria-hidden="true">
      {heights.map((h, i) => (
        <div key={i} className="w-[2px] rounded-sm" style={{ height: h, background: 'rgba(255,255,255,0.38)' }} />
      ))}
    </div>
  );
}
