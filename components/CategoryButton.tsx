"use client";
export default function CategoryButton({ id }: { id: string }) {
  return (
    <button className="btn alt sm" onClick={() => {
      window.dispatchEvent(new CustomEvent("miro-filter", { detail: "cat:" + id }));
      document.getElementById("dukaan")?.scrollIntoView();
    }}>Eeg shaararka qeebtan</button>
  );
}
