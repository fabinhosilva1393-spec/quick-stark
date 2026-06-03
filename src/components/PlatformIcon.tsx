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
      <g fill="currentColor">
        {/* Head */}
        <path d="M32 4c-6 0-10 4.8-10 11.4 0 3 .7 5.6 1.9 7.8-3.2 2.8-5.6 6.6-7.1 10.6-1.6 4.2-2.3 8.4-2.3 11.8 0 5.4 2.2 9.6 6 12.2 3.4 2.3 7.8 3.2 11.5 3.2s8.1-.9 11.5-3.2c3.8-2.6 6-6.8 6-12.2 0-3.4-.7-7.6-2.3-11.8-1.5-4-3.9-7.8-7.1-10.6 1.2-2.2 1.9-4.8 1.9-7.8C42 8.8 38 4 32 4z" />
      </g>
      {/* Belly */}
      <ellipse cx="32" cy="42" rx="9" ry="13" fill="#ffffff" opacity="0.92" />
      {/* Eyes */}
      <ellipse cx="28.4" cy="17" rx="2.6" ry="3.2" fill="#ffffff" />
      <ellipse cx="35.6" cy="17" rx="2.6" ry="3.2" fill="#ffffff" />
      <ellipse cx="28.9" cy="17.6" rx="1.1" ry="1.6" fill="#0b0b18" />
      <ellipse cx="35.1" cy="17.6" rx="1.1" ry="1.6" fill="#0b0b18" />
      {/* Beak */}
      <path d="M29 21.4c0-1.4 1.3-2.4 3-2.4s3 1 3 2.4-1.3 2.4-3 2.4-3-1-3-2.4z" fill="#f6c453" />
      <path d="M30 22.1h4l-2 1.6z" fill="#d99a2b" />
      {/* Feet */}
      <path d="M20 55c-.6 1.2-.2 2.6 1.2 3.2 1.6.7 4.2.5 6.4-.4 1.8-.7 2.8-1.8 2.4-2.8-.4-1-2-1.6-4.2-1.4-2 .2-4.6.4-5.8 1.4z" fill="#f6c453" />
      <path d="M44 55c.6 1.2.2 2.6-1.2 3.2-1.6.7-4.2.5-6.4-.4-1.8-.7-2.8-1.8-2.4-2.8.4-1 2-1.6 4.2-1.4 2 .2 4.6.4 5.8 1.4z" fill="#f6c453" />
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
