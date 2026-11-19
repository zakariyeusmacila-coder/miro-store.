"use client";
import { createContext, useContext, useEffect, useState, useCallback } from "react";
import { supabase } from "./supabase";

type Profile = { id: string; email: string; name: string; phone: string } | null;
type Ctx = { ready: boolean; email: string | null; profile: Profile; isAdmin: boolean; refresh: () => Promise<void>; signOut: () => Promise<void> };
const AuthCtx = createContext<Ctx>({ ready: false, email: null, profile: null, isAdmin: false, refresh: async () => {}, signOut: async () => {} });

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [ready, setReady] = useState(false);
  const [email, setEmail] = useState<string | null>(null);
  const [profile, setProfile] = useState<Profile>(null);
  const [isAdmin, setIsAdmin] = useState(false);

  const load = useCallback(async () => {
    const { data } = await supabase.auth.getSession();
    const user = data.session?.user;
    if (!user) { setEmail(null); setProfile(null); setIsAdmin(false); setReady(true); return; }
    setEmail(user.email ?? null);
    const [p, a] = await Promise.all([
      supabase.from("profiles").select("id,email,name,phone").eq("id", user.id).maybeSingle(),
      supabase.rpc("is_admin"),
    ]);
    setProfile((p.data as Profile) ?? null);
    setIsAdmin(a.data === true);
    setReady(true);
  }, []);

  useEffect(() => {
    load();
    const { data } = supabase.auth.onAuthStateChange(() => { load(); });
    return () => data.subscription.unsubscribe();
  }, [load]);

  const signOut = async () => { await supabase.auth.signOut(); };
  return <AuthCtx.Provider value={{ ready, email, profile, isAdmin, refresh: load, signOut }}>{children}</AuthCtx.Provider>;
}
export const useAuth = () => useContext(AuthCtx);
