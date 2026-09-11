"use client";

import { CSSProperties, useEffect, useRef, useState } from "react";

const WORD = "PORTTITEATTERI".split("");
const PORTTI = "PORTTI".split("");
const TEATTERI = "TEATTERI".split("");
const HEIGHTS = [1.02, 0.96, 1.08, 1.03, 0.98, 1.1, 0.93, 1.04, 0.97, 1.09, 1.0, 0.95, 1.06, 1.12];

function clamp(value: number, min = 0, max = 1) {
  return Math.min(max, Math.max(min, value));
}

export function SiteHeader() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      setVisible(window.scrollY > window.innerHeight * 1.18);
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule, { passive: true });
    return () => {
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <header className="site-header" data-visible={visible ? "true" : "false"}>
      <a className="header-mark" href="#top" aria-label="Porttiteatteri — alkuun">
        <span>PORTTI</span>
        <span>TEATTERI</span>
      </a>
      <nav className="header-nav" aria-label="Päänavigaatio">
        <a href="#ohjelmisto">Ohjelmisto</a>
        <a href="#toiminta">Toiminta</a>
        <a href="#mukaan">Tule mukaan</a>
      </nav>
      <span className="header-signal" aria-hidden="true" />
    </header>
  );
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
      const opening = clamp(progress / 0.46);
      const surface = clamp((progress - 0.12) / 0.3);
      const reveal = clamp((progress - 0.3) / 0.24);

      frame.style.setProperty("--progress", progress.toFixed(4));
      frame.style.setProperty("--opening", opening.toFixed(4));
      frame.style.setProperty("--surface", surface.toFixed(4));
      frame.style.setProperty("--reveal", reveal.toFixed(4));
    };

    const schedule = () => {
      if (reduced.matches) return;
      if (rafRef.current === null) rafRef.current = requestAnimationFrame(update);
    };

    if (reduced.matches) {
      frame.style.setProperty("--progress", "0.7");
      frame.style.setProperty("--opening", "1");
      frame.style.setProperty("--surface", "1");
      frame.style.setProperty("--reveal", "1");
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
    <section id="top" ref={stageRef} className="entry-stage" aria-label="Porttiteatteri — Avoimet portit">
      <div ref={frameRef} className="entry-frame">
        <div className="stage-meta" aria-hidden="true">
          <span>PORTTITEATTERI</span>
          <span>YHTEISÖTEATTERI / HELSINKI</span>
          <span>AVOIMET PORTIT</span>
        </div>

        <div className="desktop-wordmark" aria-hidden="true">
          {WORD.map((letter, index) => {
            const center = (WORD.length - 1) / 2;
            const side = index - center;
            const direction = side < 0 ? -1 : 1;
            const closedX = side * 4.38;
            const openX = side * 5.08 + direction * 7.6;
            const style = {
              "--closed-x": `${closedX}vw`,
              "--delta-x": `${openX - closedX}vw`,
              "--sy": HEIGHTS[index],
              "--lift": `${((index % 4) - 1.5) * 0.75}vh`,
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

        <div className="portal-aperture" aria-hidden="true" />
        <div className="portal-copy">
          <p className="portal-kicker">AVOIN TILA / 01</p>
          <p className="portal-title">IHMISIÄ.<br />TARINOITA.<br />TILAA.</p>
          <a href="#ohjelmisto" className="portal-cta">ASTU SISÄÄN</a>
        </div>

        <div className="scroll-cue" aria-hidden="true">
          <span>VIERITÄ</span>
          <span className="scroll-line" />
          <span>AVAA PORTTI</span>
        </div>

        <div className="stage-foot" aria-hidden="true">
          <span>SULJETTU TILA</span>
          <span>→</span>
          <span>AVAUTUVA TILA</span>
        </div>
      </div>
    </section>
  );
}
