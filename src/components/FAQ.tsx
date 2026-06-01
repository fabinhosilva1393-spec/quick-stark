import { useState } from "react";
import { ChevronDown } from "lucide-react";

const QA = [
  {
    q: "Is StarknetWallet free?",
    a: "Yes. StarknetWallet is free and open source. There are no subscriptions, no premium tiers, and no in-app upsells.",
  },
  {
    q: "Does StarknetWallet collect my data?",
    a: "No telemetry is sent by default. Private keys never leave your device. You can route RPC calls through your own node for full privacy.",
  },
  {
    q: "Which Starknet accounts are supported?",
    a: "All major account abstraction implementations including Argent and Braavos, plus standard OpenZeppelin accounts.",
  },
  {
    q: "Can I use a hardware wallet?",
    a: "Yes. Ledger is supported over USB on all three platforms. Keep your keys offline while signing on Starknet.",
  },
  {
    q: "How do I verify a release?",
    a: "Every build ships with a SHA256 checksum and a PGP signature. The /download page includes the verification command and our signing key fingerprint.",
  },
];

export function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="py-24 relative">
      <div className="container-page">
        <div className="max-w-2xl">
          <span className="eyebrow">FAQ</span>
          <h2 className="section-title mt-4">Questions, answered.</h2>
        </div>

        <div className="mt-10 max-w-3xl divide-y divide-white/10 border-y border-white/10">
          {QA.map((item, i) => {
            const isOpen = open === i;
            return (
              <div key={item.q}>
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  className="w-full flex items-center justify-between gap-4 py-5 text-left"
                >
                  <span className="text-base sm:text-lg font-semibold text-white">
                    {item.q}
                  </span>
                  <ChevronDown
                    size={18}
                    className={`text-white/60 shrink-0 transition-transform ${
                      isOpen ? "rotate-180" : ""
                    }`}
                    aria-hidden="true"
                  />
                </button>
                {isOpen && (
                  <p className="pb-5 -mt-1 text-sm text-white/70 leading-relaxed max-w-2xl">
                    {item.a}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
