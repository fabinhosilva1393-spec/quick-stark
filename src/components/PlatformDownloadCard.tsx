import { Download, ShieldCheck, FileText, KeyRound, Clock } from "lucide-react";
import type { DownloadItem } from "@/data/downloads";
import { PlatformIcon } from "./PlatformIcon";

type Props = {
  item: DownloadItem;
  recommended: boolean;
};

export function PlatformDownloadCard({ item, recommended }: Props) {
  const isAvailable = item.available;

  return (
    <article
      className={`platform-download-card ${
        recommended ? "recommended-platform-card" : ""
      }`}
      aria-label={`${item.os} download${recommended ? " (recommended for your device)" : ""}${isAvailable ? "" : " — build pending"}`}
    >
      <header className="flex items-start justify-end gap-4 min-h-[24px]">
        {recommended ? (
          <span className="recommended-badge">Recommended for your device</span>
        ) : isAvailable ? (
          <span className="latest-badge">Current maintained build</span>
        ) : (
          <span className="pending-badge">
            <Clock size={11} aria-hidden="true" /> Build pending
          </span>
        )}
      </header>

      <div className="mt-2 flex justify-center">
        <PlatformIcon os={item.key} />
      </div>

      <div className="mt-5 text-left">
        <h3 className="text-lg font-bold text-ink tracking-tight leading-tight">
          {item.os}
        </h3>
        <p className="mt-0.5 text-xs text-ink-muted leading-tight">
          {item.fileType}
        </p>
      </div>

      <p className="mt-3 text-xs font-semibold text-ink text-left leading-tight">
        Current maintained version · {item.version}
      </p>

      <dl className="mt-1 flex items-baseline justify-between gap-4 text-xs text-left leading-tight">
        <dt className="text-ink-muted">File size</dt>
        <dd className="text-ink font-medium">{item.fileSize}</dd>
      </dl>

      <p className="mt-2 text-[11px] text-ink-muted leading-snug text-left">
        {item.requirements}
      </p>

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
            Download
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
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs">
            {item.checksumUrl && (
              <a
                href={item.checksumUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-link inline-flex items-center gap-1.5"
              >
                <ShieldCheck size={12} aria-hidden="true" /> Verify checksum
              </a>
            )}
            {item.signatureUrl && (
              <a
                href={item.signatureUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-link inline-flex items-center gap-1.5"
              >
                <KeyRound size={12} aria-hidden="true" /> Signature
              </a>
            )}
            {item.releaseNotesUrl && (
              <a
                href={item.releaseNotesUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-link inline-flex items-center gap-1.5"
              >
                <FileText size={12} aria-hidden="true" /> Version notes
              </a>
            )}
          </div>
        ) : (
          <p
            id={`pending-help-${item.key}`}
            className="text-xs text-ink-muted leading-relaxed"
          >
            The signed {item.os} build is being prepared. Checksum,
            signature, and version notes will appear here once it is
            published on the project's source page.
          </p>
        )}
      </div>
    </article>
  );
}
