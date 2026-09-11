import { EntryStage, SiteHeader } from "@/components/entry-stage";

export default function Home() {
  return (
    <main>
      <SiteHeader />
      <EntryStage />

      <section id="ohjelmisto" className="content-section section-dark">
        <div className="section-shell">
          <div className="section-index">
            <span>01 / OHJELMISTO</span>
            <span>NYT / 2026</span>
          </div>
          <div className="section-grid section-grid-programme">
            <div className="section-title-wrap">
              <p className="section-kicker">SAMA KAUPUNKI. ENEMMÄN TARINOITA.</p>
              <h2>IHMISIÄ.<br />TARINOITA.<br />TILAA.</h2>
            </div>
            <div className="section-copy">
              <p className="eyebrow">AJANKOHTAINEN</p>
              <p className="lead">Näyttämö ei kysy, mistä tulet. Se kysyy, mitä haluat sanoa nyt.</p>
              <p>Esitykset, työpajat ja yhteisö syntyvät samasta ajatuksesta: ääni kuuluu sille, joka sen ottaa.</p>
              <a className="signal-link" href="#toiminta">Tutustu toimintaan</a>
            </div>
          </div>
        </div>
      </section>

      <section id="toiminta" className="content-section section-light">
        <div className="section-shell">
          <div className="section-index">
            <span>02 / TOIMINTA</span>
            <span>YKSILÖ ↔ YHTEISÖ</span>
          </div>
          <div className="section-grid section-grid-about">
            <div className="section-title-wrap">
              <p className="section-kicker">PORTTI EI OLE KUVA. SE ON SIIRTYMÄ.</p>
              <h2>AVOIMET<br />PORTIT.</h2>
            </div>
            <div className="section-copy">
              <p className="lead">
                Porttiteatteri on vapautumisvaiheessa olevien ja vapautuneiden rikostaustaisten sekä
                ammattitaiteilijoiden yhteisöteatteri.
              </p>
              <p>
                Esiintyjät eivät ole brändin pintaa — he ovat tekijöitä. Työ rakentuu kohtaamisesta,
                taiteellisesta kunnianhimosta ja oikeudesta tulla nähdyksi kokonaisena ihmisenä.
              </p>
              <div className="principle-row" aria-label="Toiminnan periaatteet">
                <span>RASKAS ↔ AVOIN</span>
                <span>KONTROLLOITU ↔ ILMAISEVA</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="mukaan" className="content-section section-signal">
        <div className="section-shell">
          <div className="section-index">
            <span>03 / TULE MUKAAN</span>
            <span>OVI ON AUKI</span>
          </div>
          <div className="section-grid section-grid-join">
            <div className="section-title-wrap">
              <p className="section-kicker">SAMAT IHMISET. UUSIA TARINOITA.</p>
              <h2>TEATTERI<br />KUULUU<br />KAIKILLE.</h2>
            </div>
            <div className="section-copy">
              <p className="lead">Portti ei ole vain formaatti. Se on elämäntilanne, raja ja mahdollisuus ylittää se.</p>
              <a className="black-link" href="mailto:info@porttiteatteri.fi">Ota yhteyttä</a>
            </div>
          </div>
        </div>
      </section>

      <footer className="site-footer">
        <span className="footer-mark">PORTTI / TEATTERI</span>
        <span>AVOIMET PORTIT</span>
        <span>HELSINKI / SUOMI</span>
      </footer>
    </main>
  );
}
