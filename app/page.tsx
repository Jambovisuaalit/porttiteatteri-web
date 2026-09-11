import { EntryStage } from "@/components/entry-stage";

export default function Home() {
  return (
    <main>
      <EntryStage />

      <section id="ohjelmisto" className="content-section section-dark">
        <div className="section-index">01 / OHJELMISTO</div>
        <div className="section-grid">
          <h2>IHMISET.<br />TARINAT.<br />TILA.</h2>
          <div className="section-copy">
            <p className="eyebrow">AJANKOHTAINEN</p>
            <p className="lead">Näyttämö ei kysy, mistä tulet. Se kysyy, mitä haluat sanoa nyt.</p>
            <a className="signal-link" href="#toiminta">Tutustu toimintaan</a>
          </div>
        </div>
      </section>

      <section id="toiminta" className="content-section section-light">
        <div className="section-index">02 / TOIMINTA</div>
        <div className="section-grid">
          <h2>AVOIMET<br />PORTIT.</h2>
          <div className="section-copy">
            <p className="lead">
              Porttiteatteri on vapautumisvaiheessa olevien ja vapautuneiden rikostaustaisten sekä
              ammattitaiteilijoiden yhteisöteatteri. Esiintyjät eivät ole brändin pintaa — he ovat tekijöitä.
            </p>
            <p>
              Työ rakentuu kohtaamisesta, taiteellisesta kunnianhimosta ja oikeudesta tulla nähdyksi
              kokonaisena ihmisenä.
            </p>
          </div>
        </div>
      </section>

      <section id="mukaan" className="content-section section-signal">
        <div className="section-index">03 / TULE MUKAAN</div>
        <div className="section-grid">
          <h2>TEATTERI<br />KUULUU<br />KAIKILLE.</h2>
          <div className="section-copy">
            <p className="lead">Portti ei ole kuva. Se on siirtymä.</p>
            <a className="black-link" href="mailto:info@porttiteatteri.fi">Ota yhteyttä</a>
          </div>
        </div>
      </section>

      <footer className="site-footer">
        <span>PORTTITEATTERI</span>
        <span>AVOIMET PORTIT</span>
        <span>HELSINKI / SUOMI</span>
      </footer>
    </main>
  );
}
