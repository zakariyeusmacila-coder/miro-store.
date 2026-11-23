"use client";
import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { ICONS } from "@/lib/icons";

const LINKS = [
  { k: "whatsapp", l: "WhatsApp", h: "https://wa.me/252770714732" },
  { k: "instagram", l: "Instagram", h: "https://www.instagram.com/miro.store.so" },
  { k: "tiktok", l: "TikTok", h: "https://www.tiktok.com/@miro.store.so" },
];

export default function OpeningSoon() {
  const [email, setEmail] = useState("");
  const [state, setState] = useState<"idle" | "sending" | "done">("idle");
  const [err, setErr] = useState("");

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    const v = email.trim().toLowerCase();
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(v)) { setErr("Fadlan geli email sax ah."); return; }
    setState("sending"); setErr("");
    const { error } = await supabase.from("subscribers").insert({ email: v });
    if (error && error.code !== "23505") { setErr("Waa la waayay in la diiwaangeliyo. Isku day mar kale."); setState("idle"); return; }
    setState("done");
  }

  return (
    <main className="soon">
      <img className="logo" src="/img/logo.png" alt="Miro Store" width={86} />
      <div className="mark">MIRO<span> STORE</span></div>
      <h1>Dhawaan <em>furmaya</em></h1>
      <p className="sub">Is diiwaangeli email-kaaga si aad u noqoto qofka ugu horreeya ee ogaada marka Miro Store furmo.</p>
      {state === "done" ? (
        <p className="ok" role="status"><svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true"><path d="M5 12.5l4.5 4.5L19 7.5" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" /></svg>Mahadsanid! Waa lagu diiwaangeliyay.</p>
      ) : (
        <form onSubmit={submit} noValidate>
          <label className="sr" htmlFor="se">Email</label>
          <input id="se" type="email" autoComplete="email" placeholder="Email-kaaga" value={email} onChange={(e) => setEmail(e.target.value)} />
          <button className="btn gold" type="submit" disabled={state === "sending"}>{state === "sending" ? "Waa la diraya..." : "Is diiwaangeli"}</button>
        </form>
      )}
      {err && <p className="err" role="alert">{err}</p>}
      <p className="foot">Shaarar Linen ah oo gacanta lagu tolo, loogu talagalay quruxda iyo raaxada. Quality You Can Feel.</p>
      <div className="links">
        {LINKS.map((c) => (
          <a key={c.k} href={c.h} target="_blank" rel="noopener noreferrer" aria-label={c.l}><svg viewBox="0 0 24 24" aria-hidden="true"><path d={ICONS[c.k]} /></svg></a>
        ))}
      </div>
    </main>
  );
}
