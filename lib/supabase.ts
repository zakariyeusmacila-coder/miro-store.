import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL as string,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string
);

export const SIZES = ["S", "M", "L", "XL", "XXL"];
export const COLORS: Record<string, string> = {
  Cream: "#e9e1cf", Sand: "#c9b896", Sage: "#8a9a85", Charcoal: "#3c3b38", Stone: "#a39b8c", White: "#f5f3ee",
};
export const CATS = [
  { id: "pure", name: "Linen Saafi ah", en: "Pure Linen", img: "weave", pos: "center",
    facts: [["Ka kooban", "100% Flax (linen)"], ["Dareenka", "Qallafsan yar, marka la maydho way jilicsan tahay"], ["Ku habboon", "Formal & Casual, maalmaha kulul"], ["Daryeel", "Ku maydh biyo qabow/qaboow, hawo ku engeji"]],
    info: "Linen saafi ah waa kan ugu neefsashada fiican. Wuxuu dhididka ka qaadaa jirka oo si degdeg ah u engegaa. Calaamadaha jilbaha (kurkurka) waa dabiici, waana qayb ka mid ah quruxdiisa." },
  { id: "soft", name: "Linen Jilicsan", en: "Soft-Washed Linen", img: "soft", pos: "center",
    facts: [["Habka", "Hore ayaa loo dhaqay si uu u jilicsanaado"], ["Dareenka", "Jilicsan, cufan oo raaxo leh"], ["Ku habboon", "Casual, maalin kasta"], ["Daryeel", "Ku maydh gacan ama mashiin tartiib ah"]],
    info: "Marka linen la dhaqo hore, fiilooyinkiisa way jilicsanaadaan. Waxaad dareemaysaa raaxo isla marka aad xirato, kurkurkuna wuu yaryahay." },
  { id: "color", name: "Midabada Linen", en: "Colour Range", img: "stack", pos: "center 30%",
    facts: [["Midabada", "Cream, Sand, Sage, Charcoal, Stone"], ["Muuqaalka", "Dabiici ah, aan dhalaalin"], ["Ku habboon", "Formal waxaa ugu fiican Cream & Charcoal"], ["Daryeel", "Midabada gaarka ah si gooni ah u maydh marka hore"]],
    info: "Midabada dabiiciga ah waxay ku habboon yihiin maqaarka Soomaalida iyo cimilada diirran. Cream iyo Charcoal waa kuwa rasmiga ah; Sand, Sage iyo Stone waa kuwa maalinlaha ah." },
];
export const FALLBACK_IMG: Record<string, { img: string; pos: string }> = {
  pure: { img: "weave", pos: "30% 40%" }, soft: { img: "soft", pos: "60% 30%" }, color: { img: "stack", pos: "center 50%" },
};

export function mediaUrl(path: string | null) {
  if (!path) return null;
  return supabase.storage.from("media").getPublicUrl(path).data.publicUrl;
}
export const money = (n: number) => "$" + Number(n).toFixed(2);
