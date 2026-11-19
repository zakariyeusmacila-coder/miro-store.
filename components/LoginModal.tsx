"use client";
import { useState } from "react";
import { supabase } from "@/lib/supabase";
import Modal from "./Modal";

export default function LoginModal({ onClose }: { onClose: () => void }) {
  const [email, setEmail] = useState("");
  const [state, setState] = useState<"idle" | "sending" | "sent">("idle");
  const [err, setErr] = useState("");
  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setState("sending"); setErr("");
    const { error } = await supabase.auth.signInWithOtp({
      email: email.trim().toLowerCase(),
      options: { emailRedirectTo: window.location.origin },
    });
    if (error) { setErr(error.message); setState("idle"); return; }
    setState("sent");
  }
  return (
    <Modal onClose={onClose}>
      <h3>Gal ama is diiwaangeli</h3>
      {state === "sent" ? (
        <>
          <p>Email ayaan u dirnay <b>{email}</b>. Fur email-ka oo riix xiriiriyaha (link) si aad u gasho.</p>
          <p className="hint">Haddii aanad arkin, hubi galka spam-ka.</p>
          <button className="btn alt" onClick={onClose}>Haye</button>
        </>
      ) : (
        <form onSubmit={submit} style={{ display: "grid", gap: ".8rem" }}>
          <p className="hint">Geli email-kaaga. Waxaan kuu diraynaa xiriiriye sugan oo aad ku gasho, password looma baahna.</p>
          <label>Email<input type="email" required autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="magac@email.com" /></label>
          {err && <p className="err">{err}</p>}
          <div className="row">
            <button className="btn gold" type="submit" disabled={state === "sending"}>{state === "sending" ? "Waa la dirayaa..." : "Soo dir xiriiriyaha"}</button>
            <button className="btn alt" type="button" onClick={onClose}>Jooji</button>
          </div>
        </form>
      )}
    </Modal>
  );
}
