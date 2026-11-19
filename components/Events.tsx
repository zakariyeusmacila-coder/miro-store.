"use client";
import { useEffect, useState } from "react";
import { supabase, mediaUrl } from "@/lib/supabase";

type Ev = { id: string; title: string; event_date: string; description: string; event_photos: { id: string; path: string }[] };

export default function Events() {
  const [evs, setEvs] = useState<Ev[] | null>(null);
  useEffect(() => {
    supabase.from("events").select("id,title,event_date,description,event_photos(id,path)").order("event_date", { ascending: false })
      .then(({ data }) => setEvs((data as Ev[]) ?? []));
  }, []);
  return (
    <div className="evs">
      {evs === null && <p className="hint">Waa la soo rarayaa...</p>}
      {evs && !evs.length && <div className="empty">Weli dhacdo lama soo dhigin.</div>}
      {evs?.map((e) => {
        const d = new Date(e.event_date + "T12:00:00");
        return (
          <article className="ev" key={e.id}>
            <div className="dt"><b>{d.getDate()}</b><span>{d.toLocaleDateString("so-SO", { month: "short" })} {d.getFullYear()}</span></div>
            <div>
              <h3>{e.title}</h3>
              <p className="note" style={{ marginTop: ".4rem" }}>{e.description}</p>
              {e.event_photos.length ? (
                <div className="gal">{e.event_photos.map((p) => <img key={p.id} src={mediaUrl(p.path) ?? ""} alt={"Sawir " + e.title} />)}</div>
              ) : <p className="note" style={{ marginTop: ".6rem" }}>Sawirada waa la soo gelin doonaa marka dhacdada la dhammeeyo.</p>}
            </div>
          </article>
        );
      })}
    </div>
  );
}
