import { useDetectedOS } from "@/hooks/useDetectedOS";
import {
  getOrderedDownloads,
  getRecommendedDownload,
  anyReleaseAvailable,
} from "@/data/downloads";
import { PlatformDownloadCard } from "./PlatformDownloadCard";
import { ShieldCheck, Download as DownloadIcon, FileCheck2, Lock } from "lucide-react";

type Props = {
  id?: string;
  compact?: boolean;
};

export function DownloadSection({ id = "download", compact = false }: Props) {
  const detectedOS = useDetectedOS();
  const ordered = getOrderedDownloads(detectedOS);
  const recommended = getRecommendedDownload(detectedOS);

  const recoMessage = recommended
    ? anyReleaseAvailable
      ? `Recommended for your system: StarknetWallet for ${recommended.os} — current maintained build`
      : `We detected ${recommended.os}. The signed build for your platform is being prepared — pick a platform below to track its status.`
    : "Choose another platform below";

  return (
    <section
      id={id}
      className="relative py-24 bg-surface-2 border-y border-hairline"
      aria-labelledby="download-heading"
    >
      <div className="container-page relative">
        {!compact && (
          <div className="max-w-2xl">
            <span className="eyebrow">Download</span>
            <h2 id="download-heading" className="font-display section-title mt-4 font-semibold">
              Download safely.
            </h2>
            <p className="section-sub">
              Choose your operating system, verify the release details, and
              install only from trusted links. The site recommends the right
              build for your operating system — you can choose another
              platform at any time.
            </p>

          </div>
        )}

        <div className="mt-10 rounded-xl border border-hairline bg-surface px-5 py-4">
          <p
            className="text-sm font-semibold text-ink"
            aria-live="polite"
            data-testid="recommendation-message"
          >
            {recoMessage}
          </p>
          <p className="mt-1 text-xs text-ink-muted">
            We detect your operating system locally in your browser. Nothing
            about your device is sent to a server.
          </p>
        </div>

        <h3 className="sr-only">Recommended for your system</h3>
        <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {ordered.map((item) => (
            <PlatformDownloadCard
              key={item.key}
              item={item}
              recommended={recommended?.key === item.key}
            />
          ))}
        </div>

        {/* Verify before installing */}
        <div
          id="verify"
          className="mt-12 surface-card"
          aria-labelledby="verify-heading"
        >
          <div className="flex items-center gap-2">
            <ShieldCheck size={18} className="text-brand" aria-hidden="true" />
            <h3 id="verify-heading" className="text-lg font-bold text-ink">
              Verify before installing
            </h3>
          </div>
          <p className="mt-2 text-sm text-ink-muted max-w-2xl">
            Every release ships with a SHA256 checksum and a PGP signature.
            Confirm the file you downloaded matches what was published before
            you run it.
          </p>

          <ol className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4 list-none p-0">
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
    </section>
  );
}
