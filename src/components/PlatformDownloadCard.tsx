import { Download, FileText, KeyRound, Clock, Star, ShieldCheck } from "lucide-react";
import type { DownloadItem } from "@/data/downloads";

type Props = {
  item: DownloadItem;
  recommended: boolean;
};

const VISUALS: Record<
  DownloadItem["key"],
  { base: string; icon: string; iconClass: string }
> = {
  windows: {
    base: "/assets/download/windows-animated-base.svg",
    icon: "/assets/download/windows-icon-user.png",
    iconClass: "platform-icon platform-icon--windows",
  },
  macos: {
    base: "/assets/download/macos-animated-base.svg",
    icon: "/assets/download/macos-icon-user.png",
    iconClass: "platform-icon platform-icon--macos",
  },
  linux: {
    base: "/assets/download/linux-animated-base.svg",
    icon: "/assets/download/linux-icon-clean.svg",
    iconClass: "platform-icon platform-icon--linux",
  },
};

function specRows(item: DownloadItem) {
  // Best-effort split of fileType into package + architecture
  const ft = item.fileType;
  let pkg = ft;
  let arch = "—";
  if (item.key === "macos") {
    pkg = ".dmg";
    arch = "Universal (Apple Silicon + Intel)";
  } else if (item.key === "windows") {
    pkg = ".exe installer";
    arch = "x64";
  } else if (item.key === "linux") {
    pkg = ".AppImage / .deb";
    arch = "x86_64";
  }
  return [
    { label: "Version", value: item.version },
    { label: "Architecture", value: arch },
    { label: "Package", value: pkg },
    { label: "Requires", value: item.requirements },
    { label: "File size", value: item.fileSize },
  ];
}

export function PlatformDownloadCard({ item, recommended }: Props) {
  const isAvailable = item.available;
  const visual = VISUALS[item.key];
  const label =
    item.key === "windows" ? "Windows" : item.key === "macos" ? "macOS" : "Linux";

  return (
    <article
      className={`platform-download-card ${
        recommended ? "recommended-platform-card" : ""
      }`}
      aria-label={`${item.os} download${
        recommended ? " (recommended for this device)" : ""
      }${isAvailable ? "" : " — build pending"}`}
    >
      <header className="platform-card-header">
        {recommended ? (
          <span className="recommended-badge">
            <Star size={11} aria-hidden="true" strokeWidth={2.4} />
            Recommended for this device
          </span>
        ) : isAvailable ? (
          <span className="latest-badge">Current build</span>
        ) : (
          <span className="pending-badge">
            <Clock size={11} aria-hidden="true" /> Build pending
          </span>
        )}
      </header>

      <div className="platform-visual" aria-hidden="true">
        <img
          className="platform-base"
          src={visual.base}
          alt=""
          loading="lazy"
          decoding="async"
          draggable={false}
        />
        <img
          className={visual.iconClass}
          src={visual.icon}
          alt=""
          loading="lazy"
          decoding="async"
          draggable={false}
        />
      </div>

      <div className="mt-4 text-left">
        <h3 className="text-lg font-bold text-ink tracking-tight leading-tight">
          {item.os}
        </h3>
        <p className="mt-1 text-xs text-ink-muted leading-tight">
          {item.fileType}
        </p>
      </div>

      <dl className="platform-spec-list">
        {specRows(item).map((row) => (
          <div key={row.label} className="platform-spec-row">
            <dt>{row.label}</dt>
            <dd>{row.value}</dd>
          </div>
        ))}
      </dl>

      <div className="mt-auto pt-6 flex flex-col gap-3">
        {isAvailable && item.downloadUrl ? (
          <a
            href={item.downloadUrl}
            className="btn-primary w-full"
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Download ${item.os} version`}
          >
            <Download size={16} aria-hidden="true" />
            Download for {label}
          </a>
        ) : (
          <button
            type="button"
            className="btn-primary w-full"
            disabled
            aria-disabled="true"
            aria-describedby={`pending-help-${item.key}`}
          >
            <Clock size={16} aria-hidden="true" />
            Build pending
          </button>
        )}

        {isAvailable ? (
          <div className="platform-verify-links">
            <a
              href={item.checksumUrl || item.downloadUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-link"
            >
              <ShieldCheck size={12} aria-hidden="true" /> SHA256
            </a>
            <a
              href={item.signatureUrl || item.downloadUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-link"
            >
              <KeyRound size={12} aria-hidden="true" /> PGP signature
            </a>
            <a
              href={item.releaseNotesUrl || item.downloadUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-link"
            >
              <FileText size={12} aria-hidden="true" /> Release notes
            </a>
          </div>
        ) : (
          <p
            id={`pending-help-${item.key}`}
            className="text-xs text-ink-muted leading-relaxed"
          >
            The signed {item.os} build is being prepared. Checksum,
            signature, and release notes will appear here once it is
            published.
          </p>
        )}
      </div>
    </article>
  );
}
