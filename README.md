# porttiteatteri-web

Porttiteatterin digitaalisen identiteetin interaktiivinen prototyyppi.

## Konsepti

- Hero alkaa suljettuna typografisena seinänä.
- Scroll avaa kirjaimet tilaksi transform-pohjaisesti.
- Keskiaukkoon nousee ensimmäinen sisältö ja yksi Signal Accent -CTA.
- Loppuvaiheessa pinottu PORTTI / TEATTERI -leima toimii kompassina.
- Mobiilissa avautuminen tapahtuu pystysuunnassa: PORTTI ylös, TEATTERI alas.
- `prefers-reduced-motion` saa toimivan staattisen version.

## Tekninen rakenne

- Next.js App Router
- TypeScript
- React
- Ei animaatiokirjastoja MVP:ssä: scroll-päivitykset ajetaan `requestAnimationFrame` + `transform: translate3d()` -mallilla.
- Ei ulkoisia fonttilatauksia. Tuotantoversiossa display-typografia korvataan lisensoidulla Porttiteatteri-variable-fontilla.

## Käynnistys

```bash
npm install
npm run dev
```

QA ennen productionia:

```bash
npm run typecheck
npm run lint
npm run build
```

## Bränditokenit

- Carbon Black: `#000000`
- Pure White: `#FFFFFF`
- Off-white: `#F5F3ED`
- Signal Accent: `#EF4A2D`
