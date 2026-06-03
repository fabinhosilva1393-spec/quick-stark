import type { DetectedOS } from "@/lib/detectOS";
import tuxAsset from "@/assets/tux-linux.png.asset.json";


type Props = {
  os: Exclude<DetectedOS, "unknown">;
  className?: string;
};

const SIZE = 112;

function MacIcon() {
  return (
    <svg viewBox="0 0 64 64" width={SIZE} height={SIZE} aria-hidden="true">
      <path
        fill="currentColor"
        d="M42.6 33.7c-.1-7.4 6-10.9 6.3-11.1-3.4-5-8.8-5.7-10.7-5.8-4.5-.5-8.9 2.7-11.2 2.7-2.3 0-5.9-2.6-9.7-2.6-5 .1-9.6 2.9-12.2 7.4-5.2 9-1.3 22.3 3.7 29.6 2.5 3.6 5.4 7.6 9.3 7.4 3.7-.1 5.2-2.4 9.7-2.4 4.5 0 5.8 2.4 9.8 2.3 4-.1 6.6-3.6 9.1-7.3 2.9-4.2 4-8.2 4.1-8.4-.1-.1-7.8-3-7.9-11.8zM35.3 12.1c2-2.4 3.4-5.8 3-9.2-2.9.1-6.5 1.9-8.6 4.3-1.9 2.1-3.5 5.5-3.1 8.8 3.3.3 6.6-1.6 8.7-3.9z"
      />
    </svg>
  );
}

function WindowsIcon() {
  return (
    <svg viewBox="0 0 64 64" width={SIZE} height={SIZE} aria-hidden="true">
      <path
        fill="currentColor"
        d="M4 10.4 28.1 7v22.6H4V10.4zM30.6 6.6 60 2.5v27.1H30.6V6.6zM4 32.4h24.1V55L4 51.6V32.4zM30.6 32.4H60v27.1l-29.4-4.1V32.4z"
      />
    </svg>
  );
}

function LinuxIcon() {
  return (
    <img
      src={tuxAsset.url}
      alt=""
      aria-hidden="true"
      width={SIZE}
      height={SIZE}
      loading="lazy"
      style={{ width: SIZE, height: SIZE, objectFit: "contain", display: "block" }}
    />
  );
}

export function PlatformIcon({ os, className }: Props) {
  return (
    <div
      className={`platform-icon-mark inline-flex items-center justify-center text-ink ${className || ""}`}
      aria-hidden="true"
    >
      {os === "macos" && <MacIcon />}
      {os === "windows" && <WindowsIcon />}
      {os === "linux" && <LinuxIcon />}
    </div>
  );
}
