import type { DetectedOS } from "@/lib/detectOS";

export type DownloadItem = {
  key: Exclude<DetectedOS, "unknown">;
  os: string;
  fileType: string;
  requirements: string;
  version: string;
  fileSize: string;
  downloadUrl: string;
  checksumUrl: string;
  signatureUrl?: string;
  releaseNotesUrl: string;
};

export const APP_VERSION = "v1.0.0";
export const GITHUB_REPO_URL = "https://github.com/starknet-io";
export const GITHUB_RELEASES_URL =
  "https://github.com/starknet-io/starknet-wallet/releases";

const RELEASE_BASE = `${GITHUB_RELEASES_URL}/download/${APP_VERSION}`;
const RELEASE_NOTES_URL = `${GITHUB_RELEASES_URL}/tag/${APP_VERSION}`;

export const downloads: Record<Exclude<DetectedOS, "unknown">, DownloadItem> = {
  macos: {
    key: "macos",
    os: "macOS",
    fileType: ".dmg Universal",
    requirements: "macOS 12 Monterey or later · Apple Silicon and Intel",
    version: APP_VERSION,
    fileSize: "112 MB",
    downloadUrl: `${RELEASE_BASE}/StarknetWallet-${APP_VERSION}-universal.dmg`,
    checksumUrl: `${RELEASE_BASE}/StarknetWallet-${APP_VERSION}-universal.dmg.sha256`,
    signatureUrl: `${RELEASE_BASE}/StarknetWallet-${APP_VERSION}-universal.dmg.sig`,
    releaseNotesUrl: RELEASE_NOTES_URL,
  },
  windows: {
    key: "windows",
    os: "Windows",
    fileType: ".exe installer",
    requirements: "Windows 10 or later · x64",
    version: APP_VERSION,
    fileSize: "98 MB",
    downloadUrl: `${RELEASE_BASE}/StarknetWallet-Setup-${APP_VERSION}-x64.exe`,
    checksumUrl: `${RELEASE_BASE}/StarknetWallet-Setup-${APP_VERSION}-x64.exe.sha256`,
    signatureUrl: `${RELEASE_BASE}/StarknetWallet-Setup-${APP_VERSION}-x64.exe.sig`,
    releaseNotesUrl: RELEASE_NOTES_URL,
  },
  linux: {
    key: "linux",
    os: "Linux",
    fileType: ".AppImage / .deb",
    requirements: "Ubuntu 22.04+ / Fedora 38+ / equivalent",
    version: APP_VERSION,
    fileSize: "104 MB",
    downloadUrl: `${RELEASE_BASE}/StarknetWallet-${APP_VERSION}-x86_64.AppImage`,
    checksumUrl: `${RELEASE_BASE}/StarknetWallet-${APP_VERSION}-x86_64.AppImage.sha256`,
    signatureUrl: `${RELEASE_BASE}/StarknetWallet-${APP_VERSION}-x86_64.AppImage.sig`,
    releaseNotesUrl: RELEASE_NOTES_URL,
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
