"use client";
import Link from "next/link";
import { useState } from "react";
import { useAuth } from "@/lib/auth";
import LoginModal from "./LoginModal";
import ProfileModal from "./ProfileModal";

export default function Header() {
  const { email, profile, isAdmin, signOut, ready } = useAuth();
  const [dlg, setDlg] = useState<"login" | "profile" | null>(null);
  return (
    <>
      <header className="top"><div className="wrap">
        <Link className="logo" href="/">MIRO<span> STORE</span></Link>
        <nav className="main" aria-label="Menu">
          <a href="/site#wacyigelin">Linen waa maxay?</a><a href="/site#xiriir">Xiriir</a>
        </nav>
        <div className="acct">
          {email && isAdmin && <Link className="btn sm gold" href="/admin">Dashboard</Link>}
          {email && <button className="btn sm alt" onClick={() => setDlg("profile")}>{profile?.name || email.split("@")[0]}</button>}
          {email && <button className="btn sm alt" onClick={() => signOut()}>Ka bax</button>}
        </div>
      </div></header>
      {dlg === "login" && <LoginModal onClose={() => setDlg(null)} />}
      {dlg === "profile" && <ProfileModal onClose={() => setDlg(null)} />}
    </>
  );
}
