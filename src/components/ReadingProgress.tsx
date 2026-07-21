import { useEffect, useState } from "react";

/**
 * Thin apricot reading progress bar fixed to the top of the viewport.
 * Reflects vertical scroll through the page.
 */
export function ReadingProgress() {
  const [pct, setPct] = useState(0);

  useEffect(() => {
    function update() {
      const doc = document.documentElement;
      const scrollTop = window.scrollY || doc.scrollTop;
      const max = doc.scrollHeight - doc.clientHeight;
      setPct(max > 0 ? Math.min(100, (scrollTop / max) * 100) : 0);
    }
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-x-0 top-0 z-[60] h-[2px]"
      style={{ background: "transparent" }}
    >
      <div
        className="h-full transition-[width] duration-150 ease-out"
        style={{
          width: `${pct}%`,
          background:
            "linear-gradient(90deg, #EC7B69 0%, #F18D7A 60%, rgba(236,123,105,0.2) 100%)",
          boxShadow: "0 0 12px rgba(236,123,105,0.55)",
        }}
      />
    </div>
  );
}
