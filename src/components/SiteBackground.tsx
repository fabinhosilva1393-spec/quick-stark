/**
 * Site-wide decorative background. Subtle dot grid + slow blurred gradient orbs.
 * Pointer-events: none; sits behind content; respects prefers-reduced-motion via CSS.
 */
export function SiteBackground() {
  return (
    <div className="site-bg" aria-hidden="true">
      <div className="site-bg-grid" />
      <span className="site-bg-orb site-bg-orb-1" />
      <span className="site-bg-orb site-bg-orb-2" />
      <span className="site-bg-orb site-bg-orb-3" />
    </div>
  );
}
