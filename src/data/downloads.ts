import type { DetectedOS } from "@/lib/detectOS";

export type DownloadItem = {
  key: Exclude<DetectedOS, "unknown">;
  os: string;
  fileType: string;
  requirements: string;
  version: string;
  fileSize: string;
  /** When false, the artifact is not published yet. UI must show a disabled state. */
  available: boolean;
  /** Only present when available === true. */
  downloadUrl?: string;
  checksumUrl?: string;
  signatureUrl?: string;
  releaseNotesUrl?: string;
};

export const APP_VERSION = "v1.0.0";

/**
 * Real, working external links. Anything that does NOT have a confirmed real
 * URL is intentionally omitted — the UI renders a disabled "Release pending"
 * state instead of a fake link.
 */
export const GITHUB_REPO_URL = "https://github.com/starknet-io";

/**
 * Release URLs are intentionally undefined until a real release is published.
 * Do NOT add fake github.com/.../releases/... URLs here — they will 404.
 */
export const GITHUB_RELEASES_URL: string | undefined = undefined;

export const downloads: Record<Exclude<DetectedOS, "unknown">, DownloadItem> = {
  macos: {
    key: "macos",
    os: "macOS",
    fileType: ".dmg Universal",
    requirements: "macOS 12 Monterey or later · Apple Silicon and Intel",
    version: APP_VERSION,
    fileSize: "—",
    available: false,
  },
  windows: {
    key: "windows",
    os: "Windows",
    fileType: ".exe installer",
    requirements: "Windows 10 or later · x64",
    version: APP_VERSION,
    fileSize: "—",
    available: false,
  },
  linux: {
    key: "linux",
    os: "Linux",
    fileType: ".AppImage / .deb",
    requirements: "Ubuntu 22.04+ / Fedora 38+ / equivalent",
    version: APP_VERSION,
    fileSize: "—",
    available: false,
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
