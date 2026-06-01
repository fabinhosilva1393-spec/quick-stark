import { Check, X } from "lucide-react";

const ROWS = [
  { feature: "Native desktop app", us: true, ext: false },
  { feature: "Cairo calldata preview", us: true, ext: false },
  { feature: "Smart-account permission review", us: true, ext: "Partial" },
  { feature: "Local-first, no telemetry by default", us: true, ext: false },
  { feature: "Hardware wallet (Ledger)", us: true, ext: true },
  { feature: "Open source, signed releases", us: true, ext: "Partial" },
];

export function Compare() {
  return (
    <section className="py-24 relative">
      <div className="container-page">
        <div className="max-w-2xl">
          <span className="eyebrow">Why desktop</span>
          <h2 className="section-title mt-4">
            A different class of wallet.
          </h2>
          <p className="section-sub">
            Browser extensions are convenient. A native desktop wallet is
            faster, more transparent, and built for users who actually sign.
          </p>
        </div>

        <div className="mt-10 overflow-hidden rounded-2xl border border-white/10">
          <div className="grid grid-cols-[1.4fr_1fr_1fr] text-sm">
            <div className="px-5 py-4 bg-white/[0.04] font-semibold text-white/70">Capability</div>
            <div className="px-5 py-4 bg-white/[0.06] font-bold text-white text-center">StarknetWallet</div>
            <div className="px-5 py-4 bg-white/[0.04] font-semibold text-white/70 text-center">Browser extensions</div>

            {ROWS.map((row, i) => (
              <div key={row.feature} className="contents">
                <div className={`px-5 py-4 ${i % 2 ? "bg-white/[0.015]" : ""} text-white/85`}>
                  {row.feature}
                </div>
                <div className={`px-5 py-4 ${i % 2 ? "bg-white/[0.02]" : ""} text-center`}>
                  {row.us === true ? (
                    <Check size={18} className="text-emerald-400 inline" aria-label="Yes" />
                  ) : (
                    <span className="text-white/70 text-sm">{row.us}</span>
                  )}
                </div>
                <div className={`px-5 py-4 ${i % 2 ? "bg-white/[0.015]" : ""} text-center`}>
                  {row.ext === true ? (
                    <Check size={18} className="text-white/50 inline" aria-label="Yes" />
                  ) : row.ext === false ? (
                    <X size={18} className="text-white/30 inline" aria-label="No" />
                  ) : (
                    <span className="text-white/55 text-sm">{row.ext}</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
