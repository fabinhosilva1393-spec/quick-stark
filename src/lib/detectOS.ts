export type DetectedOS = "macos" | "windows" | "linux" | "unknown";

export type DesktopPlatform =
  | "windows"
  | "macos"
  | "linux"
  | "mobile"
  | "chromeos"
  | "unknown";

/**
 * Privacy-respecting, client-side OS family detection. Returns "unknown" on
 * the server and when the runtime cannot be identified confidently. The
 * result is guidance — not a guaranteed device identification.
 */
export function detectDesktopPlatform(): DesktopPlatform {
  if (typeof window === "undefined" || typeof navigator === "undefined") {
    return "unknown";
  }

  const nav = navigator as Navigator & {
    userAgentData?: { platform?: string };
  };

  const userAgent = (navigator.userAgent || "").toLowerCase();
  const platform = (
    nav.userAgentData?.platform ||
    navigator.platform ||
    ""
  ).toLowerCase();

  const isIPadOS =
    platform.includes("mac") &&
    typeof navigator.maxTouchPoints === "number" &&
    navigator.maxTouchPoints > 1;

  if (
    userAgent.includes("android") ||
    userAgent.includes("iphone") ||
    userAgent.includes("ipad") ||
    userAgent.includes("ipod") ||
    isIPadOS
  ) {
    return "mobile";
  }

  if (userAgent.includes("cros")) {
    return "chromeos";
  }

  if (platform.includes("win") || userAgent.includes("windows")) {
    return "windows";
  }

  if (
    platform.includes("mac") ||
    userAgent.includes("macintosh") ||
    userAgent.includes("mac os x")
  ) {
    return "macos";
  }

  if (platform.includes("linux") || userAgent.includes("linux")) {
    return "linux";
  }

  return "unknown";
}

/**
 * Legacy narrowed detector kept for existing consumers that only understand
 * the three desktop targets. New code should prefer `detectDesktopPlatform`.
 */
export function detectOS(): DetectedOS {
  const p = detectDesktopPlatform();
  if (p === "windows" || p === "macos" || p === "linux") return p;
  return "unknown";
}
