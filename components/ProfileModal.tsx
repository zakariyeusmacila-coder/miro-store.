"use client";
import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/lib/auth";
import Modal from "./Modal";

export default function ProfileModal({ onClose, onSaved }: { onClose: () => void; onSaved?: () => void }) {
  const { profile, refresh } = useAuth();
  const [name, setName] = useState(profile?.name ?? "");
  const [phone, setPhone] = useState(profile?.phone ?? "");
  const [err, setErr] = useState("");
  const [busy, setBusy] = useState(false);
  async function save(e: React.FormEvent) {
    e.preventDefault();
    if (!profile) return;
    setBusy(true); setErr("");
    const { error } = await supabase.from("profiles").update({ name: name.trim(), phone: phone.replace(/[^\d+]/g, "") }).eq("id", profile.id);
    setBusy(false);
    if (error) { setErr(error.message); return; }
    await refresh(); onSaved?.(); onClose();
  }
  return (
    <Modal onClose={onClose}>
      <h3>Xogtaada</h3>
      <form onSubmit={save} style={{ display: "grid", gap: ".8rem" }}>
        <label>Magaca<input required value={name} onChange={(e) => setName(e.target.value)} /></label>
        <label>Lambarka EVC (kaaga)<input required inputMode="tel" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="25261XXXXXXX" /></label>
        <p className="hint">Lacagta waxaa laga jarayaa lambarkan oo kaliya.</p>
        {err && <p className="err">{err}</p>}
        <div className="row">
          <button className="btn gold" type="submit" disabled={busy}>Kaydi</button>
          <button className="btn alt" type="button" onClick={onClose}>Jooji</button>
        </div>
      </form>
    </Modal>
  );
}
