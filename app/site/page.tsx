import Header from "@/components/Header";
import ContactForm from "@/components/ContactForm";
import { ICONS } from "@/lib/icons";

export default function Home() {
  return (
    <>
      <Header />
      <main><div className="wrap">
        <section className="hero" id="hore">
          <div className="copy">
            <span className="eyebrow">MIRO STORE.so</span>
            <h1>Quality <em>You Can Feel.</em></h1>
            <p className="lead">Shaarar linen ah oo ragga loogu tolay gacanta, oo ay ku jiraan Formal iyo Casual.</p>
            
          </div>
          <div className="ph" role="img" aria-label="Maro linen ah oo midabbo kala duwan leh" />
          <div className="hero-foot"><span>TikTok @miro.store.somalia / Instagram @miro.store.so</span><a href="#wacyigelin">Hoos u fiiri</a></div>
        </section>

        <section className="blk learn-sec" id="wacyigelin"><div className="learn"><div className="media"><div className="main" role="img" aria-label="Maro linen ah oo la laalay"></div><div className="inset" role="img" aria-label="Maro linen ah oo jilicsan"></div><span className="cap">Linen dabiici ah</span></div><div className="tx"><span className="eyebrow">Wacyigelin</span><h2>Linen waa maxay?</h2><p className="sub">Maxaa ka dhigaya maro gaar ah?</p><p className="lead2">Linen waa maro dabiici ah oo laga sameeyo geedka Flax, waana mid lagu yaqaan quruxdeeda, neefsashada hawada iyo raaxada ay bixiso.</p><div className="props"><div><b>Dabiici</b><span>Laga sameeyo geedka Flax</span></div><div><b>Neefsasho</b><span>Neefsashada hawada</span></div><div><b>Raaxo</b><span>Raaxada qofka xiranaya</span></div></div><p className="body">Waxaan MIRO STORE u doorannay Linen sababtoo ah waxaan aaminsanahay in labiska wanaagsan uusan ku koobnayn muuqaalka oo keliya, balse uu sidoo kale ku jiro tayada marada iyo raaxada qofka xiranaya.</p><p className="body">Hadafkayagu waa inaan bulshada Soomaaliyeed barno quruxda iyo qiimaha shaarka Linen-ka, annagoo soo bandhigayna Formal iyo Casual shirts oo tayo leh.</p><div className="sign"><b>MIRO STORE.so</b><span>Quality You Can Feel.</span></div></div></div></section>

        <section className="blk" id="xiriir">
          <div className="contact2">
            <div className="intro">
              <span className="eyebrow">Xiriir</span><h2>Nala soo xiriir</h2>
              <p>Noo qor wixii su&apos;aal ah ama dalab gaar ah oo ku saabsan shaarka linen-ka. WhatsApp ayaa ugu dhaqsaha badan.</p>
              <ul className="chan">
                {[
                  { k: "whatsapp", l: "WhatsApp", v: "+252 77 071 4732", h: "https://wa.me/252770714732" },
                  { k: "instagram", l: "Instagram", v: "@miro.store.so", h: "https://www.instagram.com/miro.store.so" },
                  { k: "tiktok", l: "TikTok", v: "@miro.store.somalia", h: "https://www.tiktok.com/@miro.store.somalia" },
                ].map((c) => (
                  <li key={c.k}>
                    <a href={c.h} target="_blank" rel="noopener noreferrer">
                      <svg viewBox="0 0 24 24" aria-hidden="true"><path d={ICONS[c.k]} /></svg>
                      <span className="tx2"><small>{c.l}</small><b>{c.v}</b></span>
                      <span className="go" aria-hidden="true">&rarr;</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <ContactForm />
          </div>
        </section>

        <footer>
          <div><b>MIRO STORE.so</b><br />Quality You Can Feel.</div>
          <div><b>Telefoon</b><br /><span className="sel">252 770714732</span></div>
        </footer>
      </div></main>
    </>
  );
}
