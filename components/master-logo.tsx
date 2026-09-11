const GLYPHS: Record<string, string[]> = {
  P: [
    "M4 0H40C54 0 60 12 60 31V75C60 95 54 107 40 107H22V200H4V0ZM22 22V85H33C40 85 42 80 42 71V36C42 27 40 22 33 22H22Z",
  ],
  O: [
    "M12 0H48C56 0 60 10 60 25V175C60 190 56 200 48 200H12C4 200 0 190 0 175V25C0 10 4 0 12 0ZM22 22V178H38V22H22Z",
  ],
  R: [
    "M4 0H40C54 0 60 12 60 31V72C60 90 55 101 44 105L62 200H43L28 112H22V200H4V0ZM22 22V88H33C40 88 42 83 42 74V36C42 27 40 22 33 22H22Z",
  ],
  T: ["M0 0H64V26H42V200H22V26H0V0Z"],
  I: ["M20 0H44V200H20V0Z"],
  E: ["M4 0H62V26H23V84H54V110H23V174H62V200H4V0Z"],
  A: [
    "M18 0H46L64 200H44L40 148H24L20 200H0L18 0ZM29 42L26 124H38L35 42H29Z",
  ],
};

export function LogoGlyph({ letter, className = "" }: { letter: string; className?: string }) {
  const paths = GLYPHS[letter] ?? GLYPHS.I;
  return (
    <svg
      className={`logo-glyph ${className}`.trim()}
      viewBox="0 0 64 200"
      preserveAspectRatio="none"
      aria-hidden="true"
      focusable="false"
    >
      {paths.map((d, index) => (
        <path key={index} d={d} fill="currentColor" fillRule="evenodd" clipRule="evenodd" />
      ))}
    </svg>
  );
}

function LogoRow({ word }: { word: string }) {
  return (
    <span className="stacked-logo-row" style={{ gridTemplateColumns: `repeat(${word.length}, 1fr)` }}>
      {word.split("").map((letter, index) => (
        <LogoGlyph key={`${letter}-${index}`} letter={letter} />
      ))}
    </span>
  );
}

export function StackedMasterLogo({ className = "" }: { className?: string }) {
  return (
    <span className={`stacked-master-logo ${className}`.trim()} aria-hidden="true">
      <LogoRow word="PORTTI" />
      <LogoRow word="TEATTERI" />
    </span>
  );
}
