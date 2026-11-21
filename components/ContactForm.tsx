"use client";
import { useState } from "react";

const WA = "252770714732";

export default function ContactForm() {
  const [name, setName] = useState("");
  const [topic, setTopic] = useState("Dalab shaar");
  const [msg, setMsg] = useState("");
  const text = "Salaan Miro Store." + (name.trim() ? " Waxaan ahay " + name.trim() + "." : "") + " Mowduuc: " + topic + "." + (msg.trim() ? " " + msg.trim() : "");
  return (
    <form className="quick" onSubmit={(e) => e.preventDefault()}>
      <h3>Fariin degdeg ah</h3>
      <label htmlFor="qn">Magacaaga<input id="qn" autoComplete="name" value={name} onChange={(e) => setName(e.target.value)} /></label>
      <label htmlFor="qt">Mowduuca
        <select id="qt" value={topic} onChange={(e) => setTopic(e.target.value)}>
          <option>Dalab shaar</option><option>Cabbir iyo midab</option><option>Su&apos;aal kale</option>
        </select>
      </label>
      <label htmlFor="qm">Fariinta<textarea id="qm" rows={4} placeholder="Qor fariintaada halkan" value={msg} onChange={(e) => setMsg(e.target.value)} /></label>
      <a className="btn gold" href={`https://wa.me/${WA}?text=${encodeURIComponent(text)}`} target="_blank" rel="noopener noreferrer">U dir WhatsApp</a>
      <p className="hint">Waxay furaysaa WhatsApp oo fariintu horay u qoran tahay.</p>
    </form>
  );
}
