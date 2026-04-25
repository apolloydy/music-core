import { useEffect, useState } from "react";
import MetronomePanel from "./MetronomePanel";
import { localeLabels, localization, type Locale } from "./localization";

const localeStorageKey = "music-core.locale";

export default function App() {
  const [locale, setLocale] = useState<Locale>("zh-CN");
  const copy = localization[locale];

  useEffect(() => {
    const savedLocale = window.localStorage.getItem(localeStorageKey);

    if (savedLocale && savedLocale in localization) {
      setLocale(savedLocale as Locale);
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem(localeStorageKey, locale);
  }, [locale]);

  return (
    <main className="page-shell">
      <section className="locale-bar">
        <span className="locale-label">{copy.languageLabel}</span>
        <div className="locale-switcher">
          {(Object.keys(localeLabels) as Locale[]).map((item) => (
            <button
              className={`locale-button ${item === locale ? "active" : ""}`}
              key={item}
              onClick={() => setLocale(item)}
              type="button"
            >
              {localeLabels[item]}
            </button>
          ))}
        </div>
      </section>

      <MetronomePanel copy={copy.metronome} />
    </main>
  );
}
