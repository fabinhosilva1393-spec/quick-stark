import { useEffect, useRef, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Switch } from "@/components/ui/switch";
import {
  DEFAULT_OPTIONAL,
  OPEN_COOKIE_SETTINGS_EVENT,
  readConsent,
  writeConsent,
  type OptionalCategory,
} from "@/lib/cookieConsent";

type OptionalState = Record<OptionalCategory, boolean>;

const CATEGORIES: Array<{
  key: OptionalCategory;
  label: string;
  description: string;
}> = [
  {
    key: "analytics",
    label: "Analytics",
    description:
      "Help us understand how the site is used so we can improve it. Loaded only if analytics tooling is present.",
  },
  {
    key: "marketing",
    label: "Marketing",
    description:
      "Used for marketing or attribution if such tooling is present. Off by default.",
  },
  {
    key: "preferences",
    label: "Preferences",
    description:
      "Remember non-essential display or UI preferences. Off by default.",
  },
];

export function CookieConsent() {
  const [mounted, setMounted] = useState(false);
  const [bannerOpen, setBannerOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [optional, setOptional] = useState<OptionalState>(DEFAULT_OPTIONAL);
  const acceptAllRef = useRef<HTMLButtonElement | null>(null);

  // Initial mount: read existing consent
  useEffect(() => {
    setMounted(true);
    const existing = readConsent();
    if (!existing) {
      setBannerOpen(true);
    } else {
      setOptional({
        analytics: existing.analytics,
        marketing: existing.marketing,
        preferences: existing.preferences,
      });
    }
  }, []);

  // Listen for open-settings event (from footer / cookies page)
  useEffect(() => {
    function handler() {
      const existing = readConsent();
      if (existing) {
        setOptional({
          analytics: existing.analytics,
          marketing: existing.marketing,
          preferences: existing.preferences,
        });
      }
      setModalOpen(true);
    }
    window.addEventListener(OPEN_COOKIE_SETTINGS_EVENT, handler);
    return () => window.removeEventListener(OPEN_COOKIE_SETTINGS_EVENT, handler);
  }, []);

  function acceptAll() {
    writeConsent({ analytics: true, marketing: true, preferences: true });
    setOptional({ analytics: true, marketing: true, preferences: true });
    setBannerOpen(false);
    setModalOpen(false);
  }

  function rejectOptional() {
    writeConsent(DEFAULT_OPTIONAL);
    setOptional(DEFAULT_OPTIONAL);
    setBannerOpen(false);
    setModalOpen(false);
  }

  function savePreferences() {
    writeConsent(optional);
    setBannerOpen(false);
    setModalOpen(false);
  }

  function openCustomize() {
    setModalOpen(true);
  }

  if (!mounted) return null;

  return (
    <>
      {bannerOpen && (
        <div
          role="region"
          aria-label="Cookie preferences"
          className="fixed inset-x-0 bottom-0 z-[60] pb-4 px-4 sm:px-6"
        >
          <div
            className="mx-auto max-w-4xl rounded-xl border border-hairline bg-surface/95 backdrop-blur-md p-5 sm:p-6 shadow-[0_8px_40px_-12px_rgba(80,90,255,0.35)] ring-1 ring-brand/10"
          >
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <div className="max-w-2xl">
                <h2 className="text-base font-bold text-ink">Cookie preferences</h2>
                <p className="mt-1.5 text-sm text-ink-muted leading-relaxed">
                  We use essential cookies to keep this site working. Optional
                  cookies help us understand usage and improve the experience.
                  You can accept, reject, or customize your choices.
                </p>
              </div>
              <div className="flex flex-wrap gap-2 sm:flex-nowrap sm:shrink-0">
                <button
                  type="button"
                  onClick={rejectOptional}
                  className="rounded-md border border-hairline px-3.5 py-2 text-sm text-ink-muted hover:text-ink hover:border-ink/30 transition-colors"
                >
                  Reject optional
                </button>
                <button
                  type="button"
                  onClick={openCustomize}
                  className="rounded-md border border-hairline px-3.5 py-2 text-sm text-ink-muted hover:text-ink hover:border-ink/30 transition-colors"
                >
                  Customize
                </button>
                <button
                  ref={acceptAllRef}
                  type="button"
                  onClick={acceptAll}
                  className="rounded-md bg-brand px-3.5 py-2 text-sm font-medium text-white hover:bg-brand/90 transition-colors shadow-[0_0_24px_-6px_rgba(80,90,255,0.6)]"
                >
                  Accept all
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <Dialog open={modalOpen} onOpenChange={setModalOpen}>
        <DialogContent className="max-w-lg border-hairline bg-surface text-ink">
          <DialogHeader>
            <DialogTitle className="text-ink">Cookie settings</DialogTitle>
            <DialogDescription className="text-ink-muted">
              Choose which optional cookies you allow. Essential cookies are
              always active because the site needs them to work and to remember
              your choice.
            </DialogDescription>
          </DialogHeader>

          <div className="mt-2 space-y-4">
            <div className="rounded-lg border border-hairline p-4">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-sm font-semibold text-ink">Essential</p>
                  <p className="mt-1 text-xs text-ink-muted leading-relaxed">
                    Required for basic site operation and saving your cookie
                    preferences.
                  </p>
                </div>
                <span className="text-xs font-medium text-brand whitespace-nowrap pt-1">
                  Always active
                </span>
              </div>
            </div>

            {CATEGORIES.map((cat) => (
              <div key={cat.key} className="rounded-lg border border-hairline p-4">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <label
                      htmlFor={`cookie-${cat.key}`}
                      className="text-sm font-semibold text-ink cursor-pointer"
                    >
                      {cat.label}
                    </label>
                    <p className="mt-1 text-xs text-ink-muted leading-relaxed">
                      {cat.description}
                    </p>
                  </div>
                  <Switch
                    id={`cookie-${cat.key}`}
                    checked={optional[cat.key]}
                    onCheckedChange={(v) =>
                      setOptional((s) => ({ ...s, [cat.key]: !!v }))
                    }
                    aria-label={`Toggle ${cat.label} cookies`}
                  />
                </div>
              </div>
            ))}
          </div>

          <DialogFooter className="mt-4 gap-2 sm:gap-2">
            <button
              type="button"
              onClick={rejectOptional}
              className="rounded-md border border-hairline px-3.5 py-2 text-sm text-ink-muted hover:text-ink hover:border-ink/30 transition-colors"
            >
              Reject optional
            </button>
            <button
              type="button"
              onClick={savePreferences}
              className="rounded-md border border-hairline px-3.5 py-2 text-sm text-ink hover:border-ink/30 transition-colors"
            >
              Save preferences
            </button>
            <button
              type="button"
              onClick={acceptAll}
              className="rounded-md bg-brand px-3.5 py-2 text-sm font-medium text-white hover:bg-brand/90 transition-colors"
            >
              Accept all
            </button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
