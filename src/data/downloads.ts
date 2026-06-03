import type { DetectedOS } from "@/lib/detectOS";

export type DownloadItem = {
  key: Exclude<DetectedOS, "unknown">;
  os: string;
  fileType: string;
  requirements: string;
  version: string;
  fileSize: string;
  available: boolean;
  downloadUrl: string;
  checksumUrl?: string;
  signatureUrl?: string;
  releaseNotesUrl?: string;
};

export const APP_VERSION = "v2.4.3";

export const GITHUB_REPO_URL = "https://github.com/starknet-io";
export const GITHUB_RELEASES_URL = "https://github.com/starknet-io";

/**
 * Central placeholder download URL constants. Replace these with real signed
 * release artifact URLs when published. They intentionally point to the
 * official Starknet GitHub org (a real, working page) rather than href="#".
 */
export const MACOS_DOWNLOAD_URL = "https://github.com/starknet-io";
export const WINDOWS_DOWNLOAD_URL = "https://github.com/starknet-io";
export const LINUX_DOWNLOAD_URL = "https://github.com/starknet-io";

export const downloads: Record<Exclude<DetectedOS, "unknown">, DownloadItem> = {
  macos: {
    key: "macos",
    os: "macOS",
    fileType: ".dmg Universal",
    requirements: "macOS 12 Monterey or later · Apple Silicon and Intel",
    version: APP_VERSION,
    fileSize: "112 MB",
    available: true,
    downloadUrl: MACOS_DOWNLOAD_URL,
  },
  windows: {
    key: "windows",
    os: "Windows",
    fileType: ".exe installer",
    requirements: "Windows 10 or later · x64",
    version: APP_VERSION,
    fileSize: "98 MB",
    available: true,
    downloadUrl: WINDOWS_DOWNLOAD_URL,
  },
  linux: {
    key: "linux",
    os: "Linux",
    fileType: ".AppImage / .deb",
    requirements: "Ubuntu 22.04+ / Fedora 38+ / equivalent",
    version: APP_VERSION,
    fileSize: "104 MB",
    available: true,
    downloadUrl: LINUX_DOWNLOAD_URL,
  },
};

export const defaultDownloadOrder: DownloadItem[] = [
  downloads.macos,
  downloads.windows,
  downloads.linux,
];

export function getRecommendedDownload(os: DetectedOS): DownloadItem | null {
  if (os === "unknown") return null;
  return downloads[os];
}

export function getOrderedDownloads(os: DetectedOS): DownloadItem[] {
  const recommended = getRecommendedDownload(os);
  if (!recommended) return defaultDownloadOrder;
  return [
    recommended,
    ...defaultDownloadOrder.filter((item) => item.key !== recommended.key),
  ];
}

export const anyReleaseAvailable = defaultDownloadOrder.some((d) => d.available);
