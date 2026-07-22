import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";

export function AnnouncementBar() {
  return (
    <div className="announcement-bar" role="region" aria-label="Current maintained build">
      <div className="container-page flex items-center justify-center gap-3 py-2 text-[13px]">
        <span className="announcement-dot" aria-hidden="true" />
        <span className="text-ink/90 font-medium">
          Starknet Wallet v2.4.3 — Current maintained desktop build
        </span>
        <Link
          to="/releases"
          className="inline-flex items-center gap-1 font-semibold text-ink hover:text-brand transition-colors"
        >
          View release
          <ArrowRight size={13} aria-hidden="true" />
        </Link>
      </div>
    </div>
  );
}
