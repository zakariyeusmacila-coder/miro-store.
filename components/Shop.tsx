"use client";
import { useEffect, useState } from "react";
import { supabase, SIZES, COLORS, CATS, FALLBACK_IMG, mediaUrl, money } from "@/lib/supabase";
import { useAuth } from "@/lib/auth";
import Modal from "./Modal";
import LoginModal from "./LoginModal";
import ProfileModal from "./ProfileModal";

type Product = { id: string; name: string; type: string; category: string; price: number; colors: string[]; photo_path: string | null };

export function productStyle(p: Product) {
  const url = mediaUrl(p.photo_path);
  if (url) return { backgroundImage: `url(${url})`, backgroundPosition: "center" };
  const f = FALLBACK_IMG[p.category] ?? FALLBACK_IMG.pure;
  return { backgroundImage: `url(/img/${f.img}.jpg)`, backgroundPosition: f.pos };
}

export default function Shop() {
  const { email, profile } = useAuth();
  const [products, setProducts] = useState<Product[] | null>(null);
  const [filter, setFilter] = useState("All");
  const [pick, setPick] = useState<Record<string, { color: string; size: string }>>({});
  const [step, setStep] = useState<null | { kind: "login" | "profile" | "checkout"; id: string }>(null);
  const [done, setDone] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState("");

  useEffect(() => {
    supabase.from("products").select("*").eq("active", true).order("created_at").then(({ data }) => setProducts((data as Product[]) ?? []));
  }, []);
  useEffect(() => {
    const h = (e: Event) => setFilter((e as CustomEvent).detail);
    window.addEventListener("miro-filter", h);
    return () => window.removeEventListener("miro-filter", h);
  }, []);

  const get = (p: Product) => pick[p.id] ?? { color: p.colors[0], size: "M" };
  const set = (p: Product, v: Partial<{ color: string; size: string }>) => setPick({ ...pick, [p.id]: { ...get(p), ...v } });

  function buy(p: Product) {
    if (!email) return setStep({ kind: "login", id: p.id });
    if (!profile?.name || !profile?.phone) return setStep({ kind: "profile", id: p.id });
    setErr(""); setStep({ kind: "checkout", id: p.id });
  }
  async function confirm(p: Product) {
    if (!profile) return;
    setBusy(true); setErr("");
    const c = get(p);
    const { data, error } = await supabase.from("orders").insert({
      product_id: p.id, product_name: p.name, color: c.color, size: c.size, total: p.price, phone: profile.phone,
    }).select("id").single();
    setBusy(false);
    if (error) { setErr(error.message); return; }
    setStep(null); setDone((data as any).id.slice(0, 8).toUpperCase());
  }

  const list = (products ?? []).filter((p) => filter === "All" || filter === p.type || filter === "cat:" + p.category);
  const cur = step ? (products ?? []).find((p) => p.id === step.id) : null;
  const chips: [string, string][] = [["All", "Dhammaan"], ["Formal", "Formal"], ["Casual", "Casual"], ...CATS.map((c) => ["cat:" + c.id, c.name] as [string, string])];

  return (
    <>
      <div className="chips" role="group" aria-label="Nooca">
        {chips.map(([v, l]) => <button key={v} className="chip" aria-pressed={filter === v} onClick={() => setFilter(v)}>{l}</button>)}
      </div>
      {products === null && <p className="hint" style={{ marginTop: "1rem" }}>Waa la soo rarayaa...</p>}
      {products && !list.length && <div className="empty" style={{ marginTop: "1rem" }}>Shaar halkan ku jira ma jiro.</div>}
      <div className="grid">
        {list.map((p) => {
          const c = get(p);
          return (
            <article className="prod" key={p.id}>
              <div className="im" style={productStyle(p)}><span className="tag">{p.type}</span></div>
                            <div className="bd">
                <h3>{p.name}</h3>
                <div className="sw" role="group" aria-label="Midab">
                  {p.colors.map((col) => <button key={col} title={col} aria-label={col} aria-pressed={c.color === col} style={{ background: COLORS[col] ?? "#ccc" }} onClick={() => set(p, { color: col })} />)}
                </div>
                <div className="sizes" role="group" aria-label="Cabbir">
                  {SIZES.map((s) => <button key={s} aria-pressed={c.size === s} onClick={() => set(p, { size: s })}>{s}</button>)}
                </div>
                <button className="btn gold" onClick={() => buy(p)}>Dalbo · {c.color} · {c.size}</button>
              </div>
            </article>
          );
        })}
      </div>
      <p className="note" style={{ marginTop: "1rem" }}>Dalabka waxaa lagu bixiyaa EVC. Lacagta waxaa laga jarayaa lambarka EVC ee aad adigu gelisid.</p>

      {step?.kind === "login" && <LoginModal onClose={() => setStep(null)} />}
      {step?.kind === "profile" && cur && <ProfileModal onClose={() => setStep(null)} onSaved={() => setStep({ kind: "checkout", id: cur.id })} />}
      {step?.kind === "checkout" && cur && profile && (
        <Modal onClose={() => setStep(null)}>
          <h3>Xaqiiji dalabka</h3>
          <div className="sum">
            <div><b>{cur.name}</b> ({cur.type})</div>
            <div>Midab: {get(cur).color} · Cabbir: {get(cur).size}</div>
            <div>EVC: <b>{profile.phone}</b></div>
          </div>
          <p className="hint">Marka aad xaqiijiso, dalabkaaga waa la diiwaangelinayaa. Miro Store ayaa lambarkan kuu soo xiriiri doona si lacagta EVC loo xaqiijiyo.</p>
          {err && <p className="err">{err}</p>}
          <div className="row">
            <button className="btn gold" disabled={busy} onClick={() => confirm(cur)}>{busy ? "Waa la diiwaangelinayaa..." : "Xaqiiji dalabka"}</button>
            <button className="btn alt" onClick={() => setStep(null)}>Jooji</button>
          </div>
        </Modal>
      )}
      {done && (
        <Modal onClose={() => setDone(null)}>
          <h3>Waad ku mahadsantahay!</h3>
          <p>Dalabkaaga waa la helay. Lambarka dalabka: <b>{done}</b>.</p>
          <button className="btn alt" onClick={() => setDone(null)}>Haye</button>
        </Modal>
      )}
    </>
  );
}
