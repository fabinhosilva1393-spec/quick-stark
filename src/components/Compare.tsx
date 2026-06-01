import { Link } from "@tanstack/react-router";
import { Check } from "lucide-react";

const HIGHLIGHTS = [
  "Native desktop app",
  "Cairo calldata preview",
  "Smart-account permission review",
  "Signed releases",
];

export function Compare() {
  return (
    <section id="compare" className="py-24">
      <div className="container-page">
        <div className="max-w-2xl">
          <span className="eyebrow">Why desktop</span>
          <h2 className="section-title mt-4">A different class of wallet.</h2>
          <p className="section-sub">
            Browser extensions are convenient. A native desktop wallet gives
            more room to review what you are signing on Starknet.
          </p>
        </div>

        <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {HIGHLIGHTS.map((h) => (
            <div
              key={h}
              className="flex items-center gap-3 rounded-xl border border-hairline bg-surface px-5 py-4"
            >
              <Check size={18} className="text-brand shrink-0" />
              <span className="text-sm font-medium text-ink">{h}</span>
            </div>
          ))}
        </div>

        <div className="mt-8">
          <Link
            to="/compare"
            className="inline-flex items-center gap-1.5 rounded-full border border-hairline px-5 py-2.5 text-sm font-semibold text-ink transition-colors hover:border-brand hover:text-brand"
          >
            Open full comparison <span aria-hidden="true">→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
