import { useEffect, useMemo, useRef, useState } from "react";
import { Search } from "lucide-react";
import { useNavigate } from "@tanstack/react-router";
import { OPEN_COOKIE_SETTINGS_EVENT } from "@/lib/cookieConsent";

type Target =
  | { kind: "hash"; hash: string }
  | { kind: "route"; to: string }
  | { kind: "cookies" };

type Item = {
  title: string;
  category: string;
  target: Target;
};

const ITEMS: Item[] = [
  { title: "Demo", category: "Section", target: { kind: "hash", hash: "demo" } },
  { title: "Features", category: "Section", target: { kind: "hash", hash: "features" } },
  { title: "Download", category: "Section", target: { kind: "hash", hash: "download" } },
  { title: "Downloads", category: "Section", target: { kind: "hash", hash: "download" } },
  { title: "Ecosystem", category: "Page", target: { kind: "route", to: "/ecosystem" } },
  { title: "FAQ", category: "Section", target: { kind: "hash", hash: "faq" } },
  { title: "Security", category: "Page", target: { kind: "route", to: "/security" } },
  { title: "Compare", category: "Page", target: { kind: "route", to: "/compare" } },
  { title: "Documentation", category: "Page", target: { kind: "route", to: "/documentation" } },
  { title: "Versions", category: "Page", target: { kind: "route", to: "/releases" } },
  { title: "Roadmap", category: "Page", target: { kind: "route", to: "/roadmap" } },
  { title: "Audits", category: "Page", target: { kind: "route", to: "/audits" } },
  { title: "Changelog", category: "Page", target: { kind: "route", to: "/changelog" } },
  { title: "Brand guidelines", category: "Page", target: { kind: "route", to: "/brand-guidelines" } },
  { title: "About", category: "Page", target: { kind: "route", to: "/about" } },
  { title: "Contact", category: "Page", target: { kind: "route", to: "/contact" } },
  { title: "Privacy", category: "Legal", target: { kind: "route", to: "/privacy" } },
  { title: "Terms", category: "Legal", target: { kind: "route", to: "/terms" } },
  { title: "Cookies", category: "Settings", target: { kind: "cookies" } },
  { title: "Cairo preview", category: "Topic", target: { kind: "route", to: "/documentation" } },
  { title: "Smart-account permissions", category: "Topic", target: { kind: "route", to: "/documentation" } },
  { title: "STRK", category: "Topic", target: { kind: "route", to: "/documentation" } },
  { title: "Starknet Mainnet", category: "Topic", target: { kind: "route", to: "/documentation" } },
  { title: "Sepolia", category: "Topic", target: { kind: "route", to: "/documentation" } },
  { title: "Verify builds", category: "Topic", target: { kind: "route", to: "/releases" } },
];

export function SiteSearch({ variant = "desktop" }: { variant?: "desktop" | "mobile" }) {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    return ITEMS.filter(
      (i) =>
        i.title.toLowerCase().includes(q) ||
        i.category.toLowerCase().includes(q),
    ).slice(0, 8);
  }, [query]);

  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (!wrapperRef.current) return;
      if (!wrapperRef.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  function go(item: Item) {
    setOpen(false);
    setQuery("");
    if (item.target.kind === "cookies") {
      window.dispatchEvent(new Event(OPEN_COOKIE_SETTINGS_EVENT));
      return;
    }
    if (item.target.kind === "route") {
      navigate({ to: item.target.to });
      return;
    }
    navigate({ to: "/", hash: item.target.hash });
  }

  function onKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      e.preventDefault();
      if (results[0]) go(results[0]);
    } else if (e.key === "Escape") {
      setOpen(false);
      (e.target as HTMLInputElement).blur();
    }
  }

  const widthClass = variant === "desktop" ? "w-[200px]" : "w-full";

  return (
    <div ref={wrapperRef} className={`relative ${widthClass}`}>
      <div className="relative">
        <Search
          size={14}
          aria-hidden="true"
          className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-ink-muted"
        />
        <input
          type="search"
          aria-label="Search site"
          placeholder="Search"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setOpen(true);
          }}
          onFocus={() => query && setOpen(true)}
          onKeyDown={onKeyDown}
          className="h-9 w-full rounded-full border border-hairline bg-background/60 pl-8 pr-3 text-sm text-ink placeholder:text-ink-muted outline-none transition focus:border-brand/60 focus:ring-2 focus:ring-brand/30"
        />
      </div>
      {open && results.length > 0 && (
        <div
          role="listbox"
          className="absolute left-0 right-0 top-full mt-2 z-50 overflow-hidden rounded-xl border border-hairline bg-background/95 backdrop-blur-xl shadow-lg"
        >
          {results.map((item, idx) => (
            <button
              key={`${item.title}-${idx}`}
              type="button"
              onClick={() => go(item)}
              className="flex w-full items-center justify-between gap-3 px-3 py-2 text-left text-sm text-ink hover:bg-muted focus:bg-muted focus:outline-none"
            >
              <span className="font-medium">{item.title}</span>
              <span className="text-xs text-ink-muted">{item.category}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
