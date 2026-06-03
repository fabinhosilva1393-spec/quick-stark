import { useEffect, useMemo, useState } from "react";
import { Link } from "@tanstack/react-router";
import {
  Copy,
  Check,
  ShieldCheck,
  KeyRound,
  Sparkles,
  Wrench,
  ArrowRight,
} from "lucide-react";
import { useDetectedOS } from "@/hooks/useDetectedOS";
import { APP_VERSION } from "@/data/downloads";

const PGP_FINGERPRINT =
  "9F4C 27A1 D83B 6E50 1A72  B4C9 7E08 5D31 AC62 F8B4";

const CHECKSUMS: { label: string; file: string; value: string }[] = [
  {
    label: "sha256",
    file: "StarknetWallet-macOS.dmg",
    value: "Pending verified build hash — published with verified build material",
  },
  {
    label: "sha256",
    file: "StarknetWallet-Windows.exe",
    value: "Pending verified build hash — published with verified build material",
  },
  {
    label: "sha256",
    file: "StarknetWallet-Linux.AppImage",
    value: "Pending verified build hash — published with verified build material",
  },
  {
    label: "sha256",
    file: "StarknetWallet-Linux.deb",
    value: "Available after build signing",
  },
];

const WHATS_NEW = [
  { tag: "signing", text: "Clearer Starknet signing review" },
  { tag: "cairo", text: "Improved Cairo calldata visibility" },
  { tag: "compatibility", text: "Faster Mainnet / Sepolia switching" },
  { tag: "security", text: "Refined smart-account permission context" },
];

const PRODUCT_UPDATES = [
  { tag: "security", text: "Hardware-wallet workflow improvements" },
  { tag: "signing", text: "Build verification surface refinements" },
  { tag: "compatibility", text: "Compatibility coverage for desktop environments" },
  { tag: "cairo", text: "Developer workflow polish for Cairo builders" },
];

function osLabel(os: ReturnType<typeof useDetectedOS>) {
  switch (os) {
    case "macos":
      return "macOS";
    case "windows":
      return "Windows";
    case "linux":
      return "Linux";
    default:
      return "Unknown";
  }
}

export function BuildVerificationPanel() {
  const detectedOS = useDetectedOS();
  const [copied, setCopied] = useState(false);
  const [view, setView] = useState<"pgp" | "sha256">("sha256");

  const allText = useMemo(() => {
    const lines = [
      `StarknetWallet ${APP_VERSION} — Current maintained build`,
      "",
      "PGP fingerprint:",
      PGP_FINGERPRINT,
      "",
      "SHA256 checksums:",
      ...CHECKSUMS.map((c) => `${c.label}  ${c.file}  ${c.value}`),
    ];
    return lines.join("\n");
  }, []);

  useEffect(() => {
    if (!copied) return;
    const t = window.setTimeout(() => setCopied(false), 1800);
    return () => window.clearTimeout(t);
  }, [copied]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(allText);
      setCopied(true);
    } catch {
      setCopied(false);
    }
  };

  return (
    <section
      aria-labelledby="build-verification-heading"
      className="bvp-card relative mt-12 overflow-hidden rounded-3xl border border-hairline bg-surface-2"
    >
      <div className="bvp-glow" aria-hidden="true" />

      {/* Header */}
      <header className="relative flex flex-col gap-4 border-b border-hairline px-6 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-8">
        <div className="flex flex-col gap-1">
          <span className="eyebrow">Current maintained build</span>
          <div className="flex flex-wrap items-baseline gap-3">
            <h3
              id="build-verification-heading"
              className="font-display text-xl font-semibold text-ink"
            >
              StarknetWallet{" "}
              <span className="font-mono text-brand">{APP_VERSION}</span>
            </h3>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-hairline bg-surface px-2.5 py-1 text-[11px] font-medium text-ink-muted">
              <span className="h-1.5 w-1.5 rounded-full bg-brand" aria-hidden="true" />
              Detected: {osLabel(detectedOS)}
            </span>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {(["macOS", "Windows", "Linux"] as const).map((p) => (
            <span
              key={p}
              className="rounded-full border border-hairline bg-surface px-2.5 py-1 text-[11px] font-medium text-ink-muted"
            >
              {p}
            </span>
          ))}
        </div>
      </header>

      {/* Body: two columns */}
      <div className="relative grid gap-6 px-6 py-6 sm:px-8 sm:py-8 md:grid-cols-2">
        <ChangeColumn
          icon={<Sparkles size={14} className="text-brand" aria-hidden="true" />}
          title="What’s new"
          items={WHATS_NEW}
        />
        <ChangeColumn
          icon={<Wrench size={14} className="text-brand" aria-hidden="true" />}
          title="Product updates"
          items={PRODUCT_UPDATES}
        />
      </div>

      {/* Verification block */}
      <div className="relative border-t border-hairline px-6 py-6 sm:px-8 sm:py-7">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div
            role="tablist"
            aria-label="Verification view"
            className="inline-flex rounded-full border border-hairline bg-surface p-1"
          >
            {(
              [
                { k: "pgp", label: "PGP" },
                { k: "sha256", label: "SHA256" },
              ] as const
            ).map((opt) => {
              const active = view === opt.k;
              return (
                <button
                  key={opt.k}
                  role="tab"
                  type="button"
                  aria-selected={active}
                  onClick={() => setView(opt.k)}
                  className={[
                    "px-3 py-1.5 text-xs font-semibold rounded-full transition-colors cursor-pointer",
                    active
                      ? "bg-brand text-brand-foreground"
                      : "text-ink-muted hover:text-ink",
                  ].join(" ")}
                >
                  {opt.label}
                </button>
              );
            })}
          </div>

          <button
            type="button"
            onClick={handleCopy}
            aria-label="Copy fingerprint and checksums"
            className="inline-flex items-center gap-1.5 rounded-full border border-hairline bg-surface px-3 py-1.5 text-xs font-semibold text-ink hover:border-brand hover:text-brand transition-colors cursor-pointer"
          >
            {copied ? (
              <>
                <Check size={13} aria-hidden="true" /> Copied
              </>
            ) : (
              <>
                <Copy size={13} aria-hidden="true" /> Copy all
              </>
            )}
          </button>
        </div>

        <div className="mt-5 grid gap-5 lg:grid-cols-2">
          {/* PGP block */}
          <div
            className={[
              "rounded-2xl border border-dashed border-hairline bg-surface p-5",
              view === "pgp" ? "ring-1 ring-brand/40" : "",
            ].join(" ")}
          >
            <div className="flex items-center gap-2">
              <KeyRound size={14} className="text-brand" aria-hidden="true" />
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-ink-subtle">
                PGP fingerprint
              </p>
            </div>
            <p className="mt-3 font-mono text-[13px] leading-relaxed text-ink break-all">
              {PGP_FINGERPRINT}
            </p>
            <p className="mt-3 text-[11px] text-ink-subtle">
              Use this fingerprint to confirm the signing key before trusting a build.
            </p>
          </div>

          {/* Checksums block */}
          <div
            className={[
              "rounded-2xl border border-dashed border-hairline bg-surface p-5",
              view === "sha256" ? "ring-1 ring-brand/40" : "",
            ].join(" ")}
          >
            <div className="flex items-center gap-2">
              <ShieldCheck size={14} className="text-brand" aria-hidden="true" />
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-ink-subtle">
                Checksums
              </p>
            </div>
            <ul className="mt-3 space-y-2 list-none p-0 max-h-64 overflow-auto">
              {CHECKSUMS.map((c) => (
                <li
                  key={c.file}
                  className="rounded-lg border border-hairline bg-surface-2 p-3"
                >
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <span className="font-mono text-[11px] uppercase tracking-wider text-brand">
                      {c.label}
                    </span>
                    <span className="font-mono text-[11px] text-ink-muted">
                      {c.file}
                    </span>
                  </div>
                  <p className="mt-1.5 font-mono text-[12px] text-ink break-all">
                    {c.value}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-6 flex flex-wrap items-center gap-4 text-xs">
          <Link
            to="/security"
            className="inline-flex items-center gap-1.5 text-brand font-semibold hover:underline"
          >
            Verify build <ArrowRight size={12} aria-hidden="true" />
          </Link>
          <Link
            to="/changelog"
            className="inline-flex items-center gap-1.5 text-ink-muted hover:text-ink"
          >
            Version history
          </Link>
          <Link
            to="/docs"
            className="inline-flex items-center gap-1.5 text-ink-muted hover:text-ink"
          >
            Read docs
          </Link>
        </div>
      </div>
    </section>
  );
}

function ChangeColumn({
  icon,
  title,
  items,
}: {
  icon: React.ReactNode;
  title: string;
  items: { tag: string; text: string }[];
}) {
  return (
    <div className="rounded-2xl border border-hairline bg-surface p-5">
      <div className="flex items-center gap-2">
        {icon}
        <h4 className="text-sm font-semibold text-ink">{title}</h4>
      </div>
      <ul className="mt-4 space-y-3 list-none p-0">
        {items.map((it) => (
          <li key={it.text} className="flex items-start gap-3">
            <span className="mt-0.5 inline-flex shrink-0 items-center rounded-full border border-hairline bg-surface-2 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-brand">
              {it.tag}
            </span>
            <span className="text-sm text-ink-muted leading-snug">{it.text}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
