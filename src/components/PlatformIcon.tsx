import type { DetectedOS } from "@/lib/detectOS";

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
    <svg viewBox="0 0 64 64" width={SIZE} height={SIZE} aria-hidden="true">
      <path
        fill="currentColor"
        d="M32 4c-6.3 0-10.4 5.1-10.4 13 0 4.6 1.2 7.5 2.7 10.4-2.8 3.5-7.6 9-9.7 13.6-2.4 5.2-3.4 9.4-2.6 11.6.8 2.1 3.1 2.3 5.3 1.4 1.7-.7 3.5-1.7 5-1.7 1.4 0 2.2.8 2.9 1.9.9 1.4 2.7 4.3 6.8 4.3s5.9-2.9 6.8-4.3c.7-1.1 1.5-1.9 2.9-1.9 1.5 0 3.3 1 5 1.7 2.2.9 4.5.7 5.3-1.4.8-2.2-.2-6.4-2.6-11.6-2.1-4.6-6.9-10.1-9.7-13.6 1.5-2.9 2.7-5.8 2.7-10.4 0-7.9-4.1-13-10.4-13zm-3.6 12.6c1.1 0 2 1.3 2 2.9s-.9 2.9-2 2.9-2-1.3-2-2.9.9-2.9 2-2.9zm7.2 0c1.1 0 2 1.3 2 2.9s-.9 2.9-2 2.9-2-1.3-2-2.9.9-2.9 2-2.9z"
      />
    </svg>
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
