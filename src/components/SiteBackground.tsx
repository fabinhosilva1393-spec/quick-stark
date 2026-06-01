/**
 * Site-wide decorative background. Subtle dot grid + slow blurred gradient orbs
 * + cosmic starfield layer (tiny twinkling stars, larger sparkle stars,
 * soft blue/violet nebula haze). Pointer-events: none; sits behind content;
 * respects prefers-reduced-motion via CSS.
 */
export function SiteBackground() {
  return (
    <div className="site-bg" aria-hidden="true">
      <div className="site-bg-grid" />
      <span className="site-bg-orb site-bg-orb-1" />
      <span className="site-bg-orb site-bg-orb-2" />
      <span className="site-bg-orb site-bg-orb-3" />

      {/* Cosmic orbit + drifting glow layer (matches ecosystem section vibe) */}
      <div className="site-cosmic" aria-hidden="true">
        <span className="ecosystem-bg__glow ecosystem-bg__glow--a site-cosmic__glow-a" />
        <span className="ecosystem-bg__glow ecosystem-bg__glow--b site-cosmic__glow-b" />
        <span className="ecosystem-bg__orbit ecosystem-bg__orbit--1 site-cosmic__orbit-a" />
        <span className="ecosystem-bg__orbit ecosystem-bg__orbit--2 site-cosmic__orbit-b" />
      </div>


      <div className="starfield-layer">
        <span className="starfield-nebula starfield-nebula-1" />
        <span className="starfield-nebula starfield-nebula-2" />
        <div className="starfield-stars starfield-stars-a" />
        <div className="starfield-stars starfield-stars-b" />
        <div className="starfield-stars starfield-stars-c" />

        <svg
          className="starfield-sparkles"
          viewBox="0 0 1000 700"
          preserveAspectRatio="xMidYMid slice"
          aria-hidden="true"
        >
          <defs>
            <g id="sf-spark">
              <path d="M0,-10 L1.4,-1.4 L10,0 L1.4,1.4 L0,10 L-1.4,1.4 L-10,0 L-1.4,-1.4 Z" />
            </g>
          </defs>
          <g fill="#E6ECFF">
            <use href="#sf-spark" transform="translate(120 90) scale(0.9)" className="sf-twinkle sf-twinkle-1" />
            <use href="#sf-spark" transform="translate(820 140) scale(1.2)" className="sf-twinkle sf-twinkle-2" />
            <use href="#sf-spark" transform="translate(420 60) scale(0.7)" className="sf-twinkle sf-twinkle-3" />
            <use href="#sf-spark" transform="translate(680 380) scale(1.0)" className="sf-twinkle sf-twinkle-1" />
            <use href="#sf-spark" transform="translate(220 480) scale(0.85)" className="sf-twinkle sf-twinkle-2" />
            <use href="#sf-spark" transform="translate(910 560) scale(0.75)" className="sf-twinkle sf-twinkle-3" />
            <use href="#sf-spark" transform="translate(60 320) scale(0.65)" className="sf-twinkle sf-twinkle-2" />
            <use href="#sf-spark" transform="translate(540 620) scale(0.95)" className="sf-twinkle sf-twinkle-1" />
          </g>
        </svg>
      </div>
    </div>
  );
}
