import { supabase } from "./supabase";

function shrink(file: File, max: number): Promise<Blob> {
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(file);
    const im = new Image();
    im.onload = () => {
      const k = Math.min(1, max / Math.max(im.width, im.height));
      const c = document.createElement("canvas");
      c.width = Math.round(im.width * k); c.height = Math.round(im.height * k);
      c.getContext("2d")!.drawImage(im, 0, 0, c.width, c.height);
      URL.revokeObjectURL(url);
      c.toBlob((b) => (b ? resolve(b) : reject(new Error("Sawirka lama habayn"))), "image/jpeg", 0.82);
    };
    im.onerror = () => reject(new Error("Sawirkan lama furi karo"));
    im.src = url;
  });
}

export async function uploadImage(folder: string, file: File): Promise<string> {
  const blob = await shrink(file, 1400);
  const path = `${folder}/${Date.now()}-${Math.random().toString(36).slice(2, 8)}.jpg`;
  const { error } = await supabase.storage.from("media").upload(path, blob, { contentType: "image/jpeg" });
  if (error) throw error;
  return path;
}
