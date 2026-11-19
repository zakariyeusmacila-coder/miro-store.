import Header from "@/components/Header";
import Shop from "@/components/Shop";
import Events from "@/components/Events";
import CategoryButton from "@/components/CategoryButton";
import { CATS } from "@/lib/supabase";

export default function Home() {
  return (
    <>
      <Header />
      <main><div className="wrap">
        <section className="hero" id="hore">
          <div className="copy">
            <span className="eyebrow">MIRO STORE.so</span>
            <h1>Quality <em>You Can Feel.</em></h1>
            <p className="lead">Shaarar linen ah oo ragga loogu tolay gacanta, oo ay ku jiraan Formal iyo Casual. Dooro qeebta marada, cabbirkaaga iyo midabkaaga, kadibna ku bixi EVC.</p>
            <div className="row"><a className="btn" href="#dukaan">Dalbo shaar</a><a className="btn alt" href="#qeebaha">Eeg qeebaha linen</a></div>
          </div>
          <div className="ph" role="img" aria-label="Maro linen ah oo midabbo kala duwan leh" />
        </section>

        <section className="blk" id="qeebaha">
          <div className="head"><span className="eyebrow">Qeebaha marada</span><h2>Qeebaha Linen-ka</h2><p>Qeeb kasta waxaa ku qoran waxa uu ka kooban yahay, sida uu dareemayo iyo sida loo daryeelo.</p></div>
          <div className="cats">
            {CATS.map((c) => (
              <article className="cat" key={c.id}>
                <div className="im" role="img" aria-label={c.name} style={{ backgroundImage: `url(/img/${c.img}.jpg)`, backgroundPosition: c.pos }} />
                <div className="bd">
                  <span className="eyebrow">{c.en}</span><h3>{c.name}</h3><p className="note">{c.info}</p>
                  <dl className="facts">{c.facts.map(([k, v]) => <div key={k} style={{ display: "contents" }}><dt>{k}</dt><dd>{v}</dd></div>)}</dl>
                  <CategoryButton id={c.id} />
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="blk" id="dukaan">
          <div className="head"><span className="eyebrow">Shaararka</span><h2>Dooro shaarkaaga</h2><p>Dooro nooca, midabka iyo cabbirka (S ilaa XXL). Cabbirka lama qoro, waa la doortaa.</p></div>
          <Shop />
        </section>

        <section className="blk" id="events">
          <div className="head"><span className="eyebrow">Miro Store Events</span><h2>Dhacdooyinka</h2><p>Dhacdo kasta oo Miro Store qabsato halkan ayaa lagu soo bandhigaa. Marka ay dhacdo dhammaato, sawirada ayaa la soo gelinayaa.</p></div>
          <Events />
        </section>

        <section className="blk" id="wacyigelin">
          <div className="learn">
            <div className="im" role="img" aria-label="Maro linen ah oo la laalay" />
            <div className="tx">
              <span className="eyebrow">Wacyigelin</span>
              <h2>Linen waa maxay? Maxaa ka dhigaya maro gaar ah?</h2>
              <h3>Waa maxay Linen?</h3>
              <p>Linen waa maro dabiici ah oo laga sameeyo geedka Flax, waana mid lagu yaqaan quruxdeeda, neefsashada hawada iyo raaxada ay bixiso.</p>
              <p>Waxaan MIRO STORE u doorannay Linen sababtoo ah waxaan aaminsanahay in labiska wanaagsan uusan ku koobnayn muuqaalka oo keliya, balse uu sidoo kale ku jiro tayada marada iyo raaxada qofka xiranaya.</p>
              <p>Hadafkayagu waa inaan bulshada Soomaaliyeed barno quruxda iyo qiimaha shaarka Linen-ka, annagoo soo bandhigayna Formal iyo Casual shirts oo tayo leh.</p>
              <p className="quote">MIRO STORE.so<br />Quality You Can Feel.</p>
            </div>
          </div>
        </section>

        <footer id="xiriir">
          <div><b>MIRO STORE.so</b><br />Quality You Can Feel.</div>
          <div><b>Xiriir</b><br />Telefoon: <span className="sel">252 770714732</span><br />TikTok: <span className="sel">@miro.store.so</span><br />Instagram: <span className="sel">@miro.store.so</span></div>
        </footer>
      </div></main>
    </>
  );
}
