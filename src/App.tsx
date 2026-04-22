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

      <section className="hero-grid">
        <article className="hero-card hero-copy">
          <div>
            <p className="eyebrow">{copy.heroEyebrow}</p>
            <h1>{copy.heroTitle}</h1>
            <p className="hero-text">{copy.heroDescription}</p>
          </div>

          <div className="metric-row">
            {copy.p0Goals.map((goal) => (
              <div className="metric-pill metric-copy" key={goal}>
                <strong>{goal}</strong>
              </div>
            ))}
          </div>
        </article>

        <article className="hero-card signal-panel">
          <p className="panel-label">{copy.whyP0Exists}</p>
          {copy.signalCards.map((item) => (
            <div className="signal-card" key={item.label}>
              <span>{item.label}</span>
              <strong>{item.value}</strong>
            </div>
          ))}
        </article>
      </section>

      <MetronomePanel copy={copy.metronome} />

      <section className="panel-grid compact-grid">
        {copy.nextSystems.map((item) => (
          <article className="panel-card phase-card" key={item.title}>
            <p className="card-kicker">{copy.nextLabel}</p>
            <h2>{item.title}</h2>
            <p>{item.description}</p>
          </article>
        ))}
      </section>
    </main>
  );
}
