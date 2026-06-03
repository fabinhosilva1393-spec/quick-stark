import { useEffect, useState } from "react";
import { useDetectedOS } from "@/hooks/useDetectedOS";
import {
  downloads,
  defaultDownloadOrder,
  type DownloadItem,
} from "@/data/downloads";
import { PlatformDownloadCard } from "./PlatformDownloadCard";
import { PlatformIcon } from "./PlatformIcon";
import type { DetectedOS } from "@/lib/detectOS";
import {
  ShieldCheck,
  Download as DownloadIcon,
  FileCheck2,
  Lock,
  KeyRound,
  Cpu,
  Boxes,
  Sparkles,
} from "lucide-react";

type Props = {
  id?: string;
  compact?: boolean;
};

type OSKey = Exclude<DetectedOS, "unknown">;

const OS_TABS: { key: OSKey; label: string; sub: string }[] = [
  { key: "windows", label: "Windows", sub: "x64" },
  { key: "macos", label: "macOS", sub: "Universal" },
  { key: "linux", label: "Linux", sub: "AppImage" },
];

const TRUST_BADGES: { icon: typeof ShieldCheck; label: string }[] = [
  { icon: KeyRound, label: "PGP + SHA256 verification-ready" },
  { icon: Lock, label: "Local-first keys" },
  { icon: FileCheck2, label: "Verification-first install" },
  { icon: Cpu, label: "Hardware-wallet workflows" },
  { icon: Boxes, label: "Starknet smart accounts" },
];

export function DownloadSection({ id = "download", compact = false }: Props) {
  const detectedOS = useDetectedOS();
  const [selected, setSelected] = useState<OSKey>("macos");

  useEffect(() => {
    if (detectedOS !== "unknown") setSelected(detectedOS);
  }, [detectedOS]);

  const selectedItem: DownloadItem = downloads[selected];
  const isRecommended = detectedOS === selected;

  return (
    <section
      id={id}
      className="relative py-24 bg-surface-2 border-y border-hairline"
      aria-labelledby="download-heading"
    >
      <div className="container-page relative">
        {!compact && (
          <div className="max-w-2xl">
            <span className="eyebrow">Desktop app</span>
            <h2
              id="download-heading"
              className="font-display section-title mt-4 font-semibold"
            >
              Anchor your Starknet signing.
            </h2>
            <p className="section-sub">
              Native builds for macOS, Windows, and Linux. Local-first keys,
              clear Cairo call review, smart-account permission visibility,
              and a verification-first installation flow.
            </p>
          </div>
        )}

        {/* OS Selector */}
        <div className="mt-10">
          <div
            role="tablist"
            aria-label="Choose your operating system"
            className="inline-flex flex-wrap gap-2 rounded-2xl border border-hairline bg-surface p-2"
          >
            {OS_TABS.map((tab) => {
              const active = selected === tab.key;
              const recommended = detectedOS === tab.key;
              return (
                <button
                  key={tab.key}
                  role="tab"
                  type="button"
                  aria-selected={active}
                  onClick={() => setSelected(tab.key)}
                  className={[
                    "group relative inline-flex items-center gap-3 rounded-xl px-4 py-2.5 text-sm font-semibold transition-colors cursor-pointer",
                    active
                      ? "bg-brand text-brand-foreground shadow"
                      : "text-ink-muted hover:text-ink hover:bg-surface-2",
                  ].join(" ")}
                >
                  <span className="h-6 w-6 inline-flex items-center justify-center">
                    <PlatformIcon os={tab.key} />
                  </span>
                  <span className="flex flex-col leading-tight text-left">
                    <span>{tab.label}</span>
                    <span
                      className={[
                        "text-[10px] font-medium uppercase tracking-wider",
                        active ? "text-brand-foreground/80" : "text-ink-subtle",
                      ].join(" ")}
                    >
                      {tab.sub}
                    </span>
                  </span>
                  {recommended && (
                    <span
                      className={[
                        "ml-1 hidden sm:inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider",
                        active
                          ? "bg-brand-foreground/15 text-brand-foreground"
                          : "bg-brand/15 text-brand",
                      ].join(" ")}
                    >
                      <Sparkles size={10} aria-hidden="true" /> For you
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {detectedOS !== "unknown" && (
            <p className="mt-3 text-xs text-ink-subtle">
              Detected locally in your browser — nothing about your device is
              sent to a server.
            </p>
          )}
        </div>

        {/* Trust badges */}
        <ul className="mt-6 flex flex-wrap gap-2 list-none p-0">
          {TRUST_BADGES.map(({ icon: Icon, label }) => (
            <li
              key={label}
              className="inline-flex items-center gap-2 rounded-full border border-hairline bg-surface px-3 py-1.5 text-xs font-medium text-ink-muted"
            >
              <Icon size={13} className="text-brand" aria-hidden="true" />
              {label}
            </li>
          ))}
        </ul>

        {/* Selected platform details */}
        <div className="mt-10 grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] items-stretch">
          <PlatformDownloadCard item={selectedItem} recommended={isRecommended} />

          <div className="surface-card flex flex-col">
            <div className="flex items-center gap-2">
              <ShieldCheck size={18} className="text-brand" aria-hidden="true" />
              <h3 className="text-lg font-bold text-ink">
                Verify before installing
              </h3>
            </div>
            <p className="mt-2 text-sm text-ink-muted max-w-2xl">
              Every maintained build is published with a SHA256 checksum and a
              PGP signature. Confirm the file you downloaded matches what was
              published before you run it.
            </p>

            <ol className="mt-5 grid gap-3 sm:grid-cols-2 list-none p-0">
              {[
                { icon: DownloadIcon, t: "Download the installer" },
                { icon: FileCheck2, t: "Download the SHA256 checksum" },
                { icon: Lock, t: "Download the signature" },
                { icon: ShieldCheck, t: "Verify before opening" },
              ].map(({ icon: Icon, t }, i) => (
                <li
                  key={t}
                  className="rounded-lg border border-hairline bg-surface-2 p-4"
                >
                  <Icon size={16} className="text-brand" aria-hidden="true" />
                  <p className="mt-2 text-sm font-semibold text-ink">
                    {i + 1}. {t}
                  </p>
                </li>
              ))}
            </ol>
          </div>
        </div>

        {/* Other platforms — compact row */}
        <div className="mt-8">
          <p className="text-xs uppercase tracking-wider text-ink-subtle font-semibold">
            Other platforms
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            {defaultDownloadOrder
              .filter((p) => p.key !== selected)
              .map((p) => (
                <button
                  key={p.key}
                  type="button"
                  onClick={() => setSelected(p.key)}
                  className="inline-flex items-center gap-2 rounded-full border border-hairline bg-surface px-3 py-1.5 text-xs font-medium text-ink-muted hover:text-ink hover:bg-surface-2 transition-colors cursor-pointer"
                >
                  <span className="h-4 w-4 inline-flex items-center justify-center">
                    <PlatformIcon os={p.key} />
                  </span>
                  {p.os} · {p.fileType}
                </button>
              ))}
          </div>
        </div>
      </div>
    </section>
  );
}
