"use client";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import Header from "@/components/Header";
import { useAuth } from "@/lib/auth";
import { supabase, money, mediaUrl } from "@/lib/supabase";
import { uploadImage } from "@/lib/upload";

type Order = { id: string; user_id: string; product_name: string; color: string; size: string; total: number; phone: string; status: string; created_at: string };
type Cust = { id: string; email: string; name: string; phone: string };
type Prod = { id: string; name: string; type: string; price: number; photo_path: string | null; active: boolean };
type Ev = { id: string; title: string; event_date: string; description: string; event_photos: { id: string; path: string }[] };

const cls = (s: string) => (s === "Paid" || s === "Delivered" ? "ok" : s === "Pending" ? "warn" : "bad");

export default function Admin() {
  const { ready, email, isAdmin } = useAuth();
  const [tab, setTab] = useState("orders");
  const [orders, setOrders] = useState<Order[]>([]);
  const [custs, setCusts] = useState<Cust[]>([]);
  const [prods, setProds] = useState<Prod[]>([]);
  const [evs, setEvs] = useState<Ev[]>([]);
  const [msg, setMsg] = useState("");
  const [form, setForm] = useState({ title: "", date: "", text: "" });

  const load = useCallback(async () => {
    const [o, c, p, e] = await Promise.all([
      supabase.from("orders").select("*").order("created_at", { ascending: false }),
      supabase.from("profiles").select("id,email,name,phone").order("created_at", { ascending: false }),
      supabase.from("products").select("id,name,type,price,photo_path,active").order("created_at"),
      supabase.from("events").select("id,title,event_date,description,event_photos(id,path)").order("event_date", { ascending: false }),
    ]);
    setOrders((o.data as Order[]) ?? []); setCusts((c.data as Cust[]) ?? []); setProds((p.data as Prod[]) ?? []); setEvs((e.data as Ev[]) ?? []);
  }, []);
  useEffect(() => { if (isAdmin) load(); }, [isAdmin, load]);

  const flash = (m: string) => { setMsg(m); setTimeout(() => setMsg(""), 2800); };
  async function run(fn: () => PromiseLike<{ error: { message: string } | null }>, ok: string) {
    const { error } = await fn();
    if (error) flash("Khalad: " + error.message); else { flash(ok); await load(); }
  }
  const mail = (id: string) => custs.find((c) => c.id === id)?.email ?? "";

  if (!ready) return <><Header /><div className="wrap" style={{ paddingBlock: "3rem" }}><p className="hint">Waa la soo rarayaa...</p></div></>;
  if (!email || !isAdmin) return (
    <><Header /><div className="wrap" style={{ paddingBlock: "3rem" }}>
      <div className="empty">Dashboard-ka waxaa arki kara admin-ka oo kaliya. Ku gal email-ka admin-ka.</div>
      <p style={{ marginTop: "1rem" }}><Link className="btn alt" href="/">Ku laabo</Link></p>
    </div></>
  );

  const paid = orders.filter((o) => o.status === "Paid" || o.status === "Delivered");
  const rev = paid.reduce((a, o) => a + Number(o.total), 0);
  const tabs: [string, string][] = [["orders", "Dalabyada"], ["customers", "Macaamiisha"], ["products", "Shaararka"], ["events", "Events"]];

  return (
    <>
      <Header />
      <div className="wrap adm" style={{ paddingBlock: "2rem" }}>
        <span className="eyebrow">Admin</span><h2>Dashboard</h2>
        <div className="kpis" style={{ marginTop: "1rem" }}>
          <div className="kpi"><span className="note">Dalabyada</span><b>{orders.length}</b></div>
          <div className="kpi"><span className="note">La bixiyay</span><b>{paid.length}</b></div>
          <div className="kpi"><span className="note">Dakhliga</span><b>{money(rev)}</b></div>
          <div className="kpi"><span className="note">Macaamiisha</span><b>{custs.length}</b></div>
        </div>
        <div className="tabs">{tabs.map(([k, l]) => <button key={k} className="chip" aria-pressed={tab === k} onClick={() => setTab(k)}>{l}</button>)}</div>
        {msg && <p className="note" role="status" style={{ marginBottom: ".75rem" }}>{msg}</p>}

        {tab === "orders" && (orders.length ? (
          <div className="tw"><table><thead><tr><th>Taariikh</th><th>Macmiil</th><th>EVC</th><th>Shaar</th><th>Midab</th><th>Cabbir</th><th>Wadar</th><th>Xaalad</th><th></th></tr></thead><tbody>
            {orders.map((o) => (
              <tr key={o.id}>
                <td>{new Date(o.created_at).toLocaleString("so-SO")}</td><td>{mail(o.user_id)}</td><td>{o.phone}</td><td>{o.product_name}</td><td>{o.color}</td><td>{o.size}</td><td>{money(o.total)}</td>
                <td><span className={"pill " + cls(o.status)}>{o.status}</span></td>
                <td style={{ display: "flex", gap: ".4rem" }}>
                  {o.status === "Pending" && <button className="btn sm gold" onClick={() => run(() => supabase.from("orders").update({ status: "Paid" }).eq("id", o.id), "Waa la calaamadeeyay La bixiyay")}>La bixiyay</button>}
                  {o.status === "Pending" && <button className="btn sm alt" onClick={() => run(() => supabase.from("orders").update({ status: "Failed" }).eq("id", o.id), "Waa la baabi'iyay")}>Fashilmay</button>}
                  {o.status === "Paid" && <button className="btn sm alt" onClick={() => run(() => supabase.from("orders").update({ status: "Delivered" }).eq("id", o.id), "Waa la gudbiyay")}>U gudbiyay</button>}
                </td>
              </tr>
            ))}
          </tbody></table></div>
        ) : <div className="empty">Weli dalab ma jiro. Marka macmiil dalbado, halkan ayuu ka muuqanayaa.</div>)}

        {tab === "customers" && (custs.length ? (
          <div className="tw"><table><thead><tr><th>Email</th><th>Magac</th><th>EVC</th><th>Dalabyo</th></tr></thead><tbody>
            {custs.map((u) => <tr key={u.id}><td>{u.email}</td><td>{u.name}</td><td>{u.phone}</td><td>{orders.filter((o) => o.user_id === u.id).length}</td></tr>)}
          </tbody></table></div>
        ) : <div className="empty">Weli macmiil ma diiwaangelin.</div>)}

        {tab === "products" && (
          <>
            <p className="note" style={{ marginBottom: ".75rem" }}>Beddel qiimaha, soo geli sawirka shaarka, ama qari.</p>
            <div className="tw"><table><thead><tr><th>Sawir</th><th>Magac</th><th>Nooca</th><th>Qiimo ($)</th><th>Beddel sawir</th><th>Muuqda</th></tr></thead><tbody>
              {prods.map((p) => (
                <tr key={p.id}>
                  <td>{p.photo_path ? <img src={mediaUrl(p.photo_path) ?? ""} alt="" width={44} height={44} style={{ objectFit: "cover" }} /> : <span className="note">-</span>}</td>
                  <td>{p.name}</td><td>{p.type}</td>
                  <td><input type="number" min="1" step="0.5" defaultValue={p.price} style={{ width: 90 }} onBlur={(e) => { const v = parseFloat(e.target.value); if (v > 0 && v !== Number(p.price)) run(() => supabase.from("products").update({ price: v }).eq("id", p.id), "Qiimaha waa la beddelay"); }} /></td>
                  <td><input type="file" accept="image/*" style={{ width: 220 }} onChange={async (e) => { const f = e.target.files?.[0]; if (!f) return; try { const path = await uploadImage("products", f); await run(() => supabase.from("products").update({ photo_path: path }).eq("id", p.id), "Sawirka waa la geliyay"); } catch (er: any) { flash("Khalad: " + er.message); } }} /></td>
                  <td><button className="btn sm alt" onClick={() => run(() => supabase.from("products").update({ active: !p.active }).eq("id", p.id), "Waa la cusboonaysiiyay")}>{p.active ? "Qari" : "Muuji"}</button></td>
                </tr>
              ))}
            </tbody></table></div>
          </>
        )}

        {tab === "events" && (
          <>
            <form className="form2" onSubmit={(e) => { e.preventDefault(); run(() => supabase.from("events").insert({ title: form.title.trim(), event_date: form.date, description: form.text.trim() }), "Dhacdada waa lagu daray").then(() => setForm({ title: "", date: "", text: "" })); }}>
              <label>Cinwaanka<input required value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} /></label>
              <label>Taariikhda<input type="date" required value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} /></label>
              <label style={{ gridColumn: "1/-1" }}>Faahfaahin<textarea rows={2} value={form.text} onChange={(e) => setForm({ ...form, text: e.target.value })} /></label>
              <button className="btn gold" type="submit">Ku dar dhacdo</button>
            </form>
            <div className="evs">
              {evs.map((e) => (
                <article className="ev" key={e.id}>
                  <div className="dt"><b>{new Date(e.event_date + "T12:00:00").getDate()}</b><span>{e.event_date}</span></div>
                  <div>
                    <h3>{e.title}</h3><p className="note">{e.description}</p>
                    <div className="gal">{e.event_photos.map((p) => (
                      <span key={p.id} style={{ position: "relative" }}>
                        <img src={mediaUrl(p.path) ?? ""} alt="" />
                        <button className="btn sm alt" style={{ position: "absolute", right: 2, top: 2, padding: "0 .4rem" }} aria-label="Tir sawirka" onClick={() => run(() => supabase.from("event_photos").delete().eq("id", p.id), "Sawirka waa la tirtiray")}>x</button>
                      </span>
                    ))}</div>
                    <div className="row" style={{ marginTop: ".7rem", alignItems: "center" }}>
                      <label style={{ fontWeight: 400 }}>Soo geli sawirada
                        <input type="file" accept="image/*" multiple onChange={async (ev) => {
                          const files = Array.from(ev.target.files ?? []); if (!files.length) return;
                          try { for (const f of files) { const path = await uploadImage("events", f); const { error } = await supabase.from("event_photos").insert({ event_id: e.id, path }); if (error) throw error; } flash(files.length + " sawir ayaa la geliyay"); await load(); } catch (er: any) { flash("Khalad: " + er.message); }
                        }} />
                      </label>
                      <button className="btn sm alt" onClick={() => run(() => supabase.from("events").delete().eq("id", e.id), "Dhacdada waa la tirtiray")}>Tir dhacdada</button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </>
        )}
      </div>
    </>
  );
}
