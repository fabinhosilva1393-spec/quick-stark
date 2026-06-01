const ECOSYSTEM = [
  "Starknet", "Cairo", "STRK", "Argent", "Braavos", "Ekubo", "Nostra", "JediSwap",
];

export function Ecosystem() {
  return (
    <section className="py-12 border-y border-white/5 bg-white/[0.015]">
      <div className="container-page">
        <p className="text-center text-xs uppercase tracking-[0.18em] text-white/45 font-semibold">
          Built for the Starknet ecosystem
        </p>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-x-10 gap-y-3">
          {ECOSYSTEM.map((name) => (
            <span
              key={name}
              className="text-base sm:text-lg font-semibold text-white/55 hover:text-white/85 transition-colors"
            >
              {name}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
