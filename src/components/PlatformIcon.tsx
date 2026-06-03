import type { DetectedOS } from "@/lib/detectOS";

type Props = {
  os: Exclude<DetectedOS, "unknown">;
  className?: string;
};

/**
 * Per-icon optical scale. The wrapper has a fixed size; each icon scales
 * inside it so all three read as the same visual weight even though their
 * silhouettes differ (Windows = airy, Apple = dense, Tux = tall/round).
 */
const ICON_SCALE: Record<Exclude<DetectedOS, "unknown">, string> = {
  windows: "92%",
  macos: "84%",
  linux: "92%",
};

function MacIcon() {
  return (
    <svg viewBox="0 0 64 64" aria-hidden="true" style={{ width: "100%", height: "100%" }}>
      <path
        fill="#f5f5f7"
        d="M42.6 33.7c-.1-7.4 6-10.9 6.3-11.1-3.4-5-8.8-5.7-10.7-5.8-4.5-.5-8.9 2.7-11.2 2.7-2.3 0-5.9-2.6-9.7-2.6-5 .1-9.6 2.9-12.2 7.4-5.2 9-1.3 22.3 3.7 29.6 2.5 3.6 5.4 7.6 9.3 7.4 3.7-.1 5.2-2.4 9.7-2.4 4.5 0 5.8 2.4 9.8 2.3 4-.1 6.6-3.6 9.1-7.3 2.9-4.2 4-8.2 4.1-8.4-.1-.1-7.8-3-7.9-11.8zM35.3 12.1c2-2.4 3.4-5.8 3-9.2-2.9.1-6.5 1.9-8.6 4.3-1.9 2.1-3.5 5.5-3.1 8.8 3.3.3 6.6-1.6 8.7-3.9z"
      />
    </svg>
  );
}

function WindowsIcon() {
  return (
    <svg viewBox="0 0 64 64" aria-hidden="true" style={{ width: "100%", height: "100%" }}>
      <path
        fill="#00A4EF"
        d="M4 10.4 28.1 7v22.6H4V10.4zM30.6 6.6 60 2.5v27.1H30.6V6.6zM4 32.4h24.1V55L4 51.6V32.4zM30.6 32.4H60v27.1l-29.4-4.1V32.4z"
      />
    </svg>
  );
}

/**
 * Tux (Linux mascot) in its original recognizable colors:
 * black body, white belly/eyes, yellow beak and feet.
 */
function LinuxIcon() {
  return (
    <svg
      viewBox="0 0 64 64"
      aria-hidden="true"
      style={{ width: "100%", height: "100%" }}
    >
      {/* Feet (behind body) */}
      <path
        fill="#f6c453"
        d="M18 53c-1.2 1.5-1.4 3.4-.2 4.5 1.4 1.4 4.3 1.4 7 .4 2.4-.9 4.1-2.4 3.7-3.7-.4-1.3-2.6-2-5.2-1.8-2.4.2-4.5.6-5.3.6z"
      />
      <path
        fill="#f6c453"
        d="M46 53c1.2 1.5 1.4 3.4.2 4.5-1.4 1.4-4.3 1.4-7 .4-2.4-.9-4.1-2.4-3.7-3.7.4-1.3 2.6-2 5.2-1.8 2.4.2 4.5.6 5.3.6z"
      />
      {/* Body */}
      <path
        fill="#111111"
        d="M32 4c-6.1 0-10.2 4.9-10.2 12.4 0 2.7.5 4.9 1.6 7.2-2.6 2.5-4.7 5.5-6.3 8.8-1.9 4-3 8-3 11.1 0 3 .9 5.3 2.6 6.9 1.6 1.6 3.9 2.5 6.6 2.9 1.4.2 2.4 1.1 3.5 2.1 1.4 1.4 3.3 2.9 6.1 2.9s4.7-1.5 6.1-2.9c1.1-1 2.1-1.9 3.5-2.1 2.7-.4 5-1.3 6.6-2.9 1.7-1.6 2.6-3.9 2.6-6.9 0-3.1-1.1-7.1-3-11.1-1.6-3.3-3.7-6.3-6.3-8.8 1.1-2.3 1.6-4.5 1.6-7.2C42.2 8.9 38.1 4 32 4z"
      />
      {/* Belly */}
      <ellipse cx="32" cy="42" rx="10" ry="13" fill="#ffffff" />
      {/* Eye whites */}
      <ellipse cx="27.6" cy="18" rx="3" ry="3.8" fill="#ffffff" />
      <ellipse cx="36.4" cy="18" rx="3" ry="3.8" fill="#ffffff" />
      {/* Pupils */}
      <ellipse cx="28.4" cy="18.7" rx="1.2" ry="1.7" fill="#111111" />
      <ellipse cx="35.6" cy="18.7" rx="1.2" ry="1.7" fill="#111111" />
      {/* Beak */}
      <path
        fill="#f6c453"
        d="M28 22.6c0-1.4 1.8-2.4 4-2.4s4 1 4 2.4-1.8 2.6-4 2.6-4-1.2-4-2.6z"
      />
      <path fill="#d99a2b" d="M29.3 23.6h5.4l-2.7 1.7z" />
    </svg>
  );
}

export function PlatformIcon({ os, className }: Props) {
  return (
    <div
      className={`platform-icon-mark inline-flex items-center justify-center text-ink ${className || ""}`}
      aria-hidden="true"
    >
      <div
        style={{
          width: ICON_SCALE[os],
          height: ICON_SCALE[os],
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {os === "macos" && <MacIcon />}
        {os === "windows" && <WindowsIcon />}
        {os === "linux" && <LinuxIcon />}
      </div>
    </div>
  );
}
