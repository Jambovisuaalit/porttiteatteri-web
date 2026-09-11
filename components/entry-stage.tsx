"use client";

import { CSSProperties, useEffect, useRef } from "react";

const WORD = "PORTTITEATTERI".split("");
const PORTTI = "PORTTI".split("");
const TEATTERI = "TEATTERI".split("");

function clamp(value: number, min = 0, max = 1) {
  return Math.min(max, Math.max(min, value));
}

export function EntryStage() {
  const stageRef = useRef<HTMLElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const stage = stageRef.current;
    const frame = frameRef.current;
    if (!stage || !frame) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");

    const update = () => {
      rafRef.current = null;
      const rect = stage.getBoundingClientRect();
      const scrollable = Math.max(1, stage.offsetHeight - window.innerHeight);
      const progress = clamp(-rect.top / scrollable);

      frame.style.setProperty("--progress", progress.toFixed(4));
      frame.style.setProperty("--opening", clamp(progress / 0.42).toFixed(4));
      frame.style.setProperty("--reveal", clamp((progress - 0.28) / 0.28).toFixed(4));
      frame.style.setProperty("--header", clamp((progress - 0.66) / 0.18).toFixed(4));
    };

    const schedule = () => {
      if (reduced.matches) return;
      if (rafRef.current === null) rafRef.current = requestAnimationFrame(update);
    };

    if (reduced.matches) {
      frame.style.setProperty("--progress", "1");
      frame.style.setProperty("--opening", "1");
      frame.style.setProperty("--reveal", "1");
      frame.style.setProperty("--header", "1");
    } else {
      update();
      window.addEventListener("scroll", schedule, { passive: true });
      window.addEventListener("resize", schedule, { passive: true });
    }

    const onMotionChange = () => update();
    reduced.addEventListener("change", onMotionChange);

    return () => {
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      reduced.removeEventListener("change", onMotionChange);
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <section ref={stageRef} className="entry-stage" aria-label="Porttiteatteri — Avoimet portit">
      <div ref={frameRef} className="entry-frame">
        <div className="top-rule" aria-hidden="true">
          <span>PORTTITEATTERI</span>
          <span>AVOIMET PORTIT</span>
        </div>

        <div className="desktop-wordmark" aria-hidden="true">
          {WORD.map((letter, index) => {
            const center = (WORD.length - 1) / 2;
            const side = index - center;
            const distance = Math.abs(side);
            const x = side * (16 + distance * 1.8);
            const y = (index % 3 - 1) * 2.2;
            const style = {
              "--i": index,
              "--x": `${x}vw`,
              "--y": `${y}vh`,
            } as CSSProperties;
            return (
              <span className="letter" style={style} key={`${letter}-${index}`}>
                {letter}
              </span>
            );
          })}
        </div>

        <div className="mobile-wordmark" aria-hidden="true">
          <div className="mobile-row mobile-row-top">
            {PORTTI.map((letter, index) => <span key={`${letter}-${index}`}>{letter}</span>)}
          </div>
          <div className="mobile-row mobile-row-bottom">
            {TEATTERI.map((letter, index) => <span key={`${letter}-${index}`}>{letter}</span>)}
          </div>
        </div>

        <h1 className="sr-only">PORTTITEATTERI</h1>

        <div className="portal-copy">
          <p className="portal-kicker">PORTTITEATTERI</p>
          <p className="portal-title">IHMISIÄ.<br />TARINOITA.<br />TILAA.</p>
          <a href="#ohjelmisto" className="portal-cta">ASTU SISÄÄN</a>
        </div>

        <div className="sticky-mark" aria-label="Porttiteatteri">
          <span>PORTTI</span>
          <span>TEATTERI</span>
        </div>

        <div className="scroll-cue" aria-hidden="true">VIERITÄ ↓</div>
      </div>
    </section>
  );
}
