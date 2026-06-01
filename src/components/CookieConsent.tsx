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

  // Initial mount: decide whether to auto-show the banner
  useEffect(() => {
    setMounted(true);
    const existing = readConsent();
    if (!existing) {
      // No saved consent → show the small box automatically
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
      } else {
        // No consent yet → also surface the banner so a choice can be made
        setBannerOpen(true);
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
          style={{
            position: "fixed",
            left: 0,
            right: 0,
            bottom: 16,
            marginLeft: "auto",
            marginRight: "auto",
            width: "calc(100% - 24px)",
            maxWidth: 720,
            zIndex: 9999,
          }}
        >
          <div className="rounded-lg border border-hairline bg-surface/95 backdrop-blur-md px-3.5 py-3 shadow-[0_6px_24px_-10px_rgba(80,90,255,0.45)] ring-1 ring-brand/10">
            <div className="flex flex-col gap-2.5 sm:flex-row sm:items-center sm:justify-between sm:gap-3">
              <div className="min-w-0">
                <p className="text-xs font-semibold text-ink leading-tight">Cookie preferences</p>
                <p className="mt-0.5 text-xs text-ink-muted leading-snug">
                  We use essential cookies. Optional cookies help improve the site.
                </p>
              </div>
              <div className="flex flex-wrap gap-1.5 sm:flex-nowrap sm:shrink-0">
                <button
                  type="button"
                  onClick={rejectOptional}
                  className="rounded-md border border-hairline px-2.5 py-1 text-xs text-ink-muted hover:text-ink hover:border-ink/30 transition-colors"
                >
                  Reject
                </button>
                <button
                  type="button"
                  onClick={openCustomize}
                  className="rounded-md border border-hairline px-2.5 py-1 text-xs text-ink-muted hover:text-ink hover:border-ink/30 transition-colors"
                >
                  Settings
                </button>
                <button
                  ref={acceptAllRef}
                  type="button"
                  onClick={acceptAll}
                  className="rounded-md bg-brand px-2.5 py-1 text-xs font-medium text-white hover:bg-brand/90 transition-colors shadow-[0_0_18px_-6px_rgba(80,90,255,0.6)]"
                >
                  Accept
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
