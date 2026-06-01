export const CONSENT_STORAGE_KEY = "starknetwallet_cookie_consent";
export const CONSENT_VERSION = "1.0";
export const OPEN_COOKIE_SETTINGS_EVENT = "starknetwallet:open-cookie-settings";

export type OptionalCategory = "analytics" | "marketing" | "preferences";

export type CookieConsent = {
  essential: true;
  analytics: boolean;
  marketing: boolean;
  preferences: boolean;
  timestamp: string;
  version: string;
};

export const DEFAULT_OPTIONAL: Record<OptionalCategory, boolean> = {
  analytics: false,
  marketing: false,
  preferences: false,
};

export function readConsent(): CookieConsent | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(CONSENT_STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as CookieConsent;
    if (!parsed || typeof parsed !== "object") return null;
    return parsed;
  } catch {
    return null;
  }
}

export function writeConsent(optional: Record<OptionalCategory, boolean>): CookieConsent {
  const value: CookieConsent = {
    essential: true,
    analytics: !!optional.analytics,
    marketing: !!optional.marketing,
    preferences: !!optional.preferences,
    timestamp: new Date().toISOString(),
    version: CONSENT_VERSION,
  };
  try {
    window.localStorage.setItem(CONSENT_STORAGE_KEY, JSON.stringify(value));
  } catch {
    /* ignore */
  }
  return value;
}

export function openCookieSettings() {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent(OPEN_COOKIE_SETTINGS_EVENT));
}
