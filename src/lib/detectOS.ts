export type DetectedOS = "macos" | "windows" | "linux" | "unknown";

export function detectOS(): DetectedOS {
  if (typeof window === "undefined" || typeof navigator === "undefined") {
    return "unknown";
  }

  const nav = navigator as Navigator & {
    userAgentData?: { platform?: string };
  };

  const uaDataPlatform = nav.userAgentData?.platform || "";
  const platform = navigator.platform || "";
  const userAgent = navigator.userAgent || "";

  const combined = `${uaDataPlatform} ${platform} ${userAgent}`.toLowerCase();

  const isIPadOS =
    platform === "MacIntel" &&
    typeof navigator.maxTouchPoints === "number" &&
    navigator.maxTouchPoints > 1;

  const isAndroid = /android/.test(combined);
  const isIOS = /iphone|ipad|ipod/.test(combined);
  const isChromeOS = /cros\b/.test(combined);

  if (isIPadOS || isAndroid || isIOS || isChromeOS) {
    return "unknown";
  }

  if (/mac|macintosh|macintel|macppc|macos|darwin/.test(combined)) {
    return "macos";
  }

  if (/win32|win64|windows|win/.test(combined)) {
    return "windows";
  }

  if (/linux|x11|ubuntu|fedora|debian/.test(combined)) {
    return "linux";
  }

  return "unknown";
}
