import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";

export type Consent = { functional: true; preferences: boolean; statistics: boolean; marketing: boolean };
const KEY = "les-cookie-consent";

export function getConsent(): Consent | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as Consent) : null;
  } catch {
    return null;
  }
}

/** Load analytics / marketing scripts here ONLY after consent. None are configured yet. */
function applyConsent(_c: Consent) {
  // TODO: inject analytics when c.statistics, marketing pixels when c.marketing.
}

export function CookieBanner() {
  const [show, setShow] = useState(false);
  const [manage, setManage] = useState(false);
  const [prefs, setPrefs] = useState({ preferences: false, statistics: false, marketing: false });

  useEffect(() => {
    const c = getConsent();
    if (c) applyConsent(c);
    else setShow(true);
  }, []);

  const save = (c: Omit<Consent, "functional">) => {
    const full: Consent = { functional: true, ...c };
    localStorage.setItem(KEY, JSON.stringify(full));
    applyConsent(full);
    setShow(false);
  };

  if (!show) return null;
  return (
    <div role="dialog" aria-label="Cookie consent" className="on-dark fixed inset-x-0 bottom-0 z-[60] border-t border-border-dark">
      <div className="container-les py-6">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
          <p className="max-w-2xl text-sm text-on-dark-muted">
            We use functional cookies to run this site (including address lookup on our quote form). With your consent we may also use preference, statistics and marketing cookies.{" "}
            <Link to="/cookie-policy" className="text-brand-white underline underline-offset-4">Cookie Policy</Link>
          </p>
          <div className="flex flex-wrap gap-2">
            <Button variant="outlineDark" size="sm" onClick={() => setManage((m) => !m)}>Manage preferences</Button>
            <Button variant="outlineDark" size="sm" onClick={() => save({ preferences: false, statistics: false, marketing: false })}>Deny</Button>
            <Button size="sm" onClick={() => save({ preferences: true, statistics: true, marketing: true })}>Accept</Button>
          </div>
        </div>
        {manage && (
          <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            <label className="card-dark flex items-center justify-between p-4 text-sm">
              Functional <span className="text-xs text-on-dark-muted">Always on</span>
            </label>
            {(["preferences", "statistics", "marketing"] as const).map((k) => (
              <label key={k} className="card-dark flex items-center justify-between p-4 text-sm capitalize">
                {k}
                <Switch checked={prefs[k]} onCheckedChange={(v) => setPrefs((p) => ({ ...p, [k]: v }))} />
              </label>
            ))}
            <Button size="sm" className="sm:col-span-2 lg:col-span-4 lg:justify-self-end" onClick={() => save(prefs)}>
              Save preferences
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
