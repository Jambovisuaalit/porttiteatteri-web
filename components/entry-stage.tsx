"use client";

import { CSSProperties, useEffect, useRef, useState } from "react";
import { LogoGlyph, StackedMasterLogo } from "@/components/master-logo";

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
      const stage = document.querySelector<HTMLElement>(".entry-stage");
      if (!stage) {
        setVisible(window.scrollY > window.innerHeight);
        return;
      }

      const rect = stage.getBoundingClientRect();
      const scrollable = Math.max(1, stage.offsetHeight - window.innerHeight);
      const progress = clamp(-rect.top / scrollable);
      setVisible(progress >= 0.88);
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
        <StackedMasterLogo />
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

      const opening = clamp((progress - 0.18) / 0.24);
      const surface = clamp((progress - 0.38) / 0.2);
      const copyReveal = clamp((progress - 0.5) / 0.22);
      const ctaReveal = clamp((progress - 0.72) / 0.16);

      frame.style.setProperty("--progress", progress.toFixed(4));
      frame.style.setProperty("--opening", opening.toFixed(4));
      frame.style.setProperty("--surface", surface.toFixed(4));
      frame.style.setProperty("--copy-reveal", copyReveal.toFixed(4));
      frame.style.setProperty("--cta-reveal", ctaReveal.toFixed(4));
      frame.style.setProperty("--copy-y", `${((1 - copyReveal) * 12).toFixed(3)}vh`);
      frame.style.setProperty("--cta-y", `${((1 - ctaReveal) * 16).toFixed(2)}px`);
      frame.dataset.ctaActive = ctaReveal >= 0.12 ? "true" : "false";
    };

    const schedule = () => {
      if (reduced.matches) return;
      if (rafRef.current === null) rafRef.current = requestAnimationFrame(update);
    };

    if (reduced.matches) {
      frame.style.setProperty("--progress", "0.78");
      frame.style.setProperty("--opening", "1");
      frame.style.setProperty("--surface", "1");
      frame.style.setProperty("--copy-reveal", "1");
      frame.style.setProperty("--cta-reveal", "1");
      frame.style.setProperty("--copy-y", "0vh");
      frame.style.setProperty("--cta-y", "0px");
      frame.dataset.ctaActive = "true";
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
      <div ref={frameRef} className="entry-frame" data-cta-active="false">
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
            const distance = Math.abs(side);
            const closedX = side * 6.05;
            const openShift = direction * (8 - distance * 0.6);
            const style = {
              "--closed-x": `${closedX}vw`,
              "--open-shift": `${openShift}vw`,
              "--sy": HEIGHTS[index],
              "--lift": `${((index % 4) - 1.5) * 0.9}vh`,
            } as CSSProperties;
            return (
              <span className="master-letter" style={style} key={`${letter}-${index}`}>
                <LogoGlyph letter={letter} />
              </span>
            );
          })}
        </div>

        <div className="mobile-wordmark" aria-hidden="true">
          <div className="mobile-row mobile-row-top">
            {PORTTI.map((letter, index) => <LogoGlyph letter={letter} key={`${letter}-${index}`} />)}
          </div>
          <div className="mobile-row mobile-row-bottom">
            {TEATTERI.map((letter, index) => <LogoGlyph letter={letter} key={`${letter}-${index}`} />)}
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
