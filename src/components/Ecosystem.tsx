const ECOSYSTEM = [
  "Starknet",
  "Cairo",
  "STRK",
  "Argent",
  "Braavos",
  "Ekubo",
  "Nostra",
  "JediSwap",
];

export function Ecosystem() {
  return (
    <section className="py-12 border-y border-hairline bg-surface">
      <div className="container-page">
        <p className="text-center text-xs uppercase tracking-[0.18em] text-ink-muted font-semibold">
          Built for the Starknet ecosystem
        </p>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-x-10 gap-y-3">
          {ECOSYSTEM.map((name) => (
            <span
              key={name}
              className="text-base sm:text-lg font-semibold text-ink-muted"
            >
              {name}
            </span>
          ))}
        </div>
        <p className="mt-4 text-center text-xs text-ink-muted">
          Names shown for ecosystem context. Not endorsements or partnerships.
        </p>
      </div>
    </section>
  );
}
