import { Download, ShieldCheck, FileText, KeyRound } from "lucide-react";
import type { DownloadItem } from "@/data/downloads";
import { PlatformIcon } from "./PlatformIcon";

type Props = {
  item: DownloadItem;
  recommended: boolean;
};

export function PlatformDownloadCard({ item, recommended }: Props) {
  return (
    <article
      className={`platform-download-card ${
        recommended ? "recommended-platform-card" : ""
      }`}
      aria-label={`${item.os} download${recommended ? " (recommended for your device)" : ""}`}
    >
      <header className="flex items-start justify-between gap-4">
        <PlatformIcon os={item.key} />
        <span className={recommended ? "recommended-badge" : "latest-badge"}>
          {recommended ? "Recommended for your device" : "Latest release"}
        </span>
      </header>

      <div className="mt-2">
        <h3 className="text-2xl font-bold text-white tracking-tight">
          StarknetWallet for {item.os}
        </h3>
        <p className="mt-1 text-sm text-white/60">{item.fileType}</p>
      </div>

      <dl className="mt-5 grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
        <dt className="text-white/50">Version</dt>
        <dd className="text-white/90 font-medium text-right">{item.version}</dd>
        <dt className="text-white/50">File size</dt>
        <dd className="text-white/90 font-medium text-right">{item.fileSize}</dd>
      </dl>
      <p className="mt-3 text-xs text-white/55 leading-relaxed">
        {item.requirements}
      </p>

      <div className="mt-auto pt-6 flex flex-col gap-3">
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
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs">
          <a
            href={item.checksumUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-link inline-flex items-center gap-1.5"
          >
            <ShieldCheck size={12} aria-hidden="true" /> Verify checksum
          </a>
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
          <a
            href={item.releaseNotesUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-link inline-flex items-center gap-1.5"
          >
            <FileText size={12} aria-hidden="true" /> Release notes
          </a>
        </div>
      </div>
    </article>
  );
}
