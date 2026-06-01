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
    <section
      id="ecosystem"
      className="relative overflow-hidden py-12 border-y border-hairline bg-surface"
    >
      <div className="ecosystem-bg" aria-hidden="true">
        <span className="ecosystem-bg__glow ecosystem-bg__glow--a" />
        <span className="ecosystem-bg__glow ecosystem-bg__glow--b" />
        <span className="ecosystem-bg__orbit ecosystem-bg__orbit--1" />
        <span className="ecosystem-bg__orbit ecosystem-bg__orbit--2" />
        <span className="ecosystem-bg__particles">
          <i style={{ left: "8%", top: "30%", animationDelay: "0s" }} />
          <i style={{ left: "22%", top: "65%", animationDelay: "2.5s" }} />
          <i style={{ left: "38%", top: "20%", animationDelay: "5s" }} />
          <i style={{ left: "55%", top: "75%", animationDelay: "1.2s" }} />
          <i style={{ left: "68%", top: "40%", animationDelay: "3.8s" }} />
          <i style={{ left: "82%", top: "25%", animationDelay: "6.1s" }} />
          <i style={{ left: "92%", top: "70%", animationDelay: "4.4s" }} />
        </span>
      </div>

      <div className="container-page relative z-10">
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
