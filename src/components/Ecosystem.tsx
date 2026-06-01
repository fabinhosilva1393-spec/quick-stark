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
    <section id="ecosystem" className="py-12 border-y border-hairline bg-surface">
      <div className="container-page">
        <p className="text-center text-xs uppercase tracking-[0.18em] text-ink-muted font-semibold">
          Built for the Starknet ecosystem
        </p>

        <div
          className="ecosystem-marquee mt-6"
          role="list"
          aria-label="Starknet ecosystem"
        >
          <div className="ecosystem-marquee__track">
            {[0, 1].map((dup) => (
              <ul
                key={dup}
                className="ecosystem-marquee__row"
                aria-hidden={dup === 1}
              >
                {ECOSYSTEM.map((name) => (
                  <li
                    key={`${dup}-${name}`}
                    className="text-base sm:text-lg font-semibold text-ink-muted whitespace-nowrap"
                    role={dup === 0 ? "listitem" : undefined}
                  >
                    {name}
                  </li>
                ))}
              </ul>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
