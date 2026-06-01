import { useDetectedOS } from "@/hooks/useDetectedOS";
import {
  getOrderedDownloads,
  getRecommendedDownload,
} from "@/data/downloads";
import { PlatformDownloadCard } from "./PlatformDownloadCard";

type Props = {
  id?: string;
  compact?: boolean;
};

export function DownloadSection({ id = "download", compact = false }: Props) {
  const detectedOS = useDetectedOS();
  const ordered = getOrderedDownloads(detectedOS);
  const recommended = getRecommendedDownload(detectedOS);

  const recoMessage = recommended
    ? `Recommended download: StarknetWallet for ${recommended.os}`
    : "Choose your operating system";

  return (
    <section
      id={id}
      className="relative py-24"
      aria-labelledby="download-heading"
    >
      <div className="container-page relative">
        {!compact && (
          <div className="max-w-2xl">
            <span className="eyebrow">Download</span>
            <h2 id="download-heading" className="section-title mt-4">
              Download StarknetWallet
            </h2>
            <p className="section-sub">
              The site recommends the right build for your operating system.
              You can choose another version anytime.
            </p>
          </div>
        )}

        <div className="mt-10 flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-white/10 bg-white/[0.03] px-5 py-4">
          <p
            className="text-sm font-semibold text-white"
            aria-live="polite"
            data-testid="recommendation-message"
          >
            {recoMessage}
          </p>
          <p className="text-xs text-white/55 max-w-md">
            We detect your operating system locally in your browser to recommend
            the right download. You can choose another version below.
          </p>
        </div>

        <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {ordered.map((item) => (
            <PlatformDownloadCard
              key={item.key}
              item={item}
              recommended={recommended?.key === item.key}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
