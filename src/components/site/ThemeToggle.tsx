import { useEffect, useState } from "react";

export const THEME_KEY = "les-theme";

/** Inline, render-blocking script: applies the saved/system theme before paint (no flash). */
export const themeInitScript = `(function(){try{var t=localStorage.getItem("${THEME_KEY}");if(!t){t=window.matchMedia&&window.matchMedia("(prefers-color-scheme: light)").matches?"light":"dark";}var r=document.documentElement;if(t==="light"){r.classList.remove("dark");}else{r.classList.add("dark");}}catch(e){}})();`;

export function ThemeToggle({ className = "" }: { className?: string }) {
  const [dark, setDark] = useState(true);
  const [driving, setDriving] = useState(false);

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
    setDriving(true);
    window.setTimeout(() => setDriving(false), 520);
  };

  return (
    <button
      type="button"
      role="switch"
      aria-checked={dark}
      aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
      onClick={toggle}
      className={`theme-toggle ${driving ? "is-driving" : ""} ${className}`}
    >
      <svg className="tt-stars" viewBox="0 0 64 32" aria-hidden>
        <circle cx="10" cy="8" r="0.9" fill="white" />
        <circle cx="22" cy="5" r="0.6" fill="white" />
        <circle cx="34" cy="9" r="0.7" fill="white" />
      </svg>
      <span className="tt-ground" aria-hidden />
      <span className="tt-van" aria-hidden>
        <svg viewBox="0 0 30 18" width="30" height="18">
          {/* cargo box */}
          <rect x="1" y="2.5" width="18" height="10.5" rx="1.5" fill="var(--tt-body)" stroke="var(--tt-line)" strokeWidth="1" />
          {/* cab */}
          <path d="M19 5.5h4.6l4 4.3V13H19z" fill="var(--tt-body)" stroke="var(--tt-line)" strokeWidth="1" strokeLinejoin="round" />
          <path d="M20.4 6.9h2.6l2.4 2.7h-5z" fill="var(--tt-window)" />
          <circle className="tt-headlight" cx="27.2" cy="11" r="0.9" />
          {/* wheels */}
          <g className="tt-wheel">
            <circle cx="6" cy="13.8" r="2.4" fill="var(--tt-window)" stroke="var(--tt-line)" strokeWidth="0.9" />
            <path d="M6 12.2v3.2" stroke="var(--tt-line)" strokeWidth="0.7" />
          </g>
          <g className="tt-wheel">
            <circle cx="23" cy="13.8" r="2.4" fill="var(--tt-window)" stroke="var(--tt-line)" strokeWidth="0.9" />
            <path d="M23 12.2v3.2" stroke="var(--tt-line)" strokeWidth="0.7" />
          </g>
        </svg>
      </span>
    </button>
  );
}
