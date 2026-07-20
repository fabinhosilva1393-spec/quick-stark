import { useEffect, useState } from "react";
import {
  detectDesktopPlatform,
  type DesktopPlatform,
} from "@/lib/detectOS";

/**
 * Client-side desktop platform detection. Runs only after mount to avoid
 * hydration mismatches. Returns "unknown" during SSR and before detection
 * completes.
 */
export function useDetectedPlatform(): DesktopPlatform {
  const [platform, setPlatform] = useState<DesktopPlatform>("unknown");

  useEffect(() => {
    setPlatform(detectDesktopPlatform());
  }, []);

  return platform;
}

export const DESKTOP_PLATFORMS = new Set<DesktopPlatform>([
  "windows",
  "macos",
  "linux",
]);
