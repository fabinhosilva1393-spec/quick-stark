import { Download, ShieldCheck, Github } from "lucide-react";
import { useDetectedOS } from "@/hooks/useDetectedOS";
import { getRecommendedDownload, GITHUB_REPO_URL } from "@/data/downloads";

export function Hero() {
  const detectedOS = useDetectedOS();
  const recommended = getRecommendedDownload(detectedOS);

  const primaryLabel = recommended
    ? `Download for ${recommended.os}`
    : "Choose your operating system";
  const primaryHref = recommended ? recommended.downloadUrl : "#download";
  const isExternal = !!recommended;

  return (
    <section className="relative overflow-hidden pt-20 pb-28">
      <div className="bg-aurora" />
      <div className="absolute inset-0 bg-grid opacity-40" />

      <div className="container-page relative">
        <div className="max-w-3xl">
          <span className="eyebrow">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
            Desktop wallet · Available now
          </span>

          <h1 className="mt-6 text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-[1.02]">
            The desktop wallet
            <br />
            built for{" "}
            <span
              style={{
                background:
                  "linear-gradient(90deg, #EC796B, #C99ABF, #A9A7FF)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Starknet
            </span>
            .
          </h1>

          <p className="mt-6 text-lg sm:text-xl text-white/70 leading-relaxed max-w-2xl">
            Manage STRK, preview Cairo calls, and review smart-account
            permissions with a wallet engineered for serious users. Native on
            macOS, Windows, and Linux.
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-3">
            <a
              href={primaryHref}
              className="btn-primary"
              target={isExternal ? "_blank" : undefined}
              rel={isExternal ? "noopener noreferrer" : undefined}
              aria-label={
                recommended
                  ? `Download StarknetWallet for ${recommended.os}`
                  : "Choose your operating system"
              }
            >
              {primaryLabel}
              <Download size={16} aria-hidden="true" />
            </a>

            <a href="#verify" className="btn-ghost">
              <ShieldCheck size={16} aria-hidden="true" />
              Verify release
            </a>

            <a
              href={GITHUB_REPO_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-medium text-white/70 hover:text-white inline-flex items-center gap-1.5 px-3 py-2"
            >
              <Github size={14} aria-hidden="true" />
              View on GitHub
            </a>
          </div>

          {recommended && (
            <p className="mt-4 text-xs text-white/45">
              Detected {recommended.os} · {recommended.version} ·{" "}
              {recommended.fileSize}
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
