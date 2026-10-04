import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

export const THEME_KEY = "les-theme";

/** Inline, render-blocking script: applies the saved/system theme before paint (no flash). */
export const themeInitScript = `(function(){try{var t=localStorage.getItem("${THEME_KEY}");if(!t){t=window.matchMedia&&window.matchMedia("(prefers-color-scheme: light)").matches?"light":"dark";}var r=document.documentElement;if(t==="light"){r.classList.remove("dark");}else{r.classList.add("dark");}}catch(e){}})();`;

export function ThemeToggle({ className = "" }: { className?: string }) {
  const [dark, setDark] = useState(true);

  useEffect(() => {
    setDark(document.documentElement.classList.contains("dark"));
  }, []);

  const toggle = () => {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle("dark", next);
    try {
      localStorage.setItem(THEME_KEY, next ? "dark" : "light"); // functional preference
    } catch {
      /* ignore */
    }
  };

  return (
    <Button
      type="button"
      variant="outlineDark"
      size="icon"
      role="switch"
      aria-checked={dark}
      aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
      onClick={toggle}
      className={`theme-toggle ${className}`}
    >
      <span className="tt-van" aria-hidden>
        <svg viewBox="0 0 30 18" width="30" height="18">
          <rect x="1" y="2.5" width="18" height="10.5" rx="1.5" fill="var(--tt-body)" stroke="var(--tt-line)" strokeWidth="1" />
          <path d="M19 5.5h4.6l4 4.3V13H19z" fill="var(--tt-body)" stroke="var(--tt-line)" strokeWidth="1" strokeLinejoin="round" />
          <path d="M20.4 6.9h2.6l2.4 2.7h-5z" fill="var(--tt-window)" />
          <circle className="tt-headlight" cx="27.2" cy="11" r="0.9" />
          <g>
            <circle cx="6" cy="13.8" r="2.4" fill="var(--tt-window)" stroke="var(--tt-line)" strokeWidth="0.9" />
          </g>
          <g>
            <circle cx="23" cy="13.8" r="2.4" fill="var(--tt-window)" stroke="var(--tt-line)" strokeWidth="0.9" />
          </g>
        </svg>
      </span>
    </Button>
  );
}
