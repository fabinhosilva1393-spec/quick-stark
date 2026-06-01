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
      aria-label={`${item.os} download${recommended ? " (recommended for your device)" : ""}${isAvailable ? "" : " — release pending"}`}
    >
      <header className="flex items-start justify-between gap-4">
        <PlatformIcon os={item.key} />
        {recommended ? (
          <span className="recommended-badge">Recommended for your device</span>
        ) : isAvailable ? (
          <span className="latest-badge">Latest release</span>
        ) : (
          <span className="pending-badge">
            <Clock size={11} aria-hidden="true" /> Release pending
          </span>
        )}
      </header>

      <div className="mt-4">
        <h3 className="text-xl font-bold text-ink tracking-tight">
          StarknetWallet for {item.os}
        </h3>
        <p className="mt-1 text-sm text-ink-muted">{item.fileType}</p>
      </div>

      <dl className="mt-5 grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
        <dt className="text-ink-muted">Version</dt>
        <dd className="text-ink font-medium text-right">{item.version}</dd>
        <dt className="text-ink-muted">File size</dt>
        <dd className="text-ink font-medium text-right">{item.fileSize}</dd>
      </dl>
      <p className="mt-3 text-xs text-ink-muted leading-relaxed">
        {item.requirements}
      </p>

      <div className="mt-auto pt-6 flex flex-col gap-3">
        {isAvailable && item.downloadUrl ? (
          <a
            href={item.downloadUrl}
            className="btn-primary w-full"
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Download StarknetWallet for ${item.os}`}
          >
            Download
            <Download size={16} aria-hidden="true" />
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
            Release pending
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
                <FileText size={12} aria-hidden="true" /> Release notes
              </a>
            )}
          </div>
        ) : (
          <p
            id={`pending-help-${item.key}`}
            className="text-xs text-ink-muted leading-relaxed"
          >
            The signed {item.os} build is not yet published. Checksum,
            signature, and release notes will appear here when the artifact is
            uploaded to the official GitHub release.
          </p>
        )}
      </div>
    </article>
  );
}
