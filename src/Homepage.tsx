
import { useMemo, useState } from "react";
import {
  Zap, Plus, Trash2, Languages, House,
  Lightbulb, Fan, Tv, Refrigerator, WashingMachine,
  AirVent, Plug, RotateCcw,
} from "lucide-react";
import "./index.css";

type Appliance = {
  id: number;
  name: string;
  icon: string;
  watts: number;
  quantity: number;
  hours: number;
  days: number;
};

const presets = [
  { name: "Ceiling Fan", icon: "fan", watts: 75 },
  { name: "LED Bulb", icon: "light", watts: 9 },
  { name: "Television", icon: "tv", watts: 100 },
  { name: "Refrigerator", icon: "fridge", watts: 180 },
  { name: "Air Conditioner", icon: "ac", watts: 1500 },
  { name: "Washing Machine", icon: "washer", watts: 500 },
  { name: "Laptop", icon: "plug", watts: 65 },
  { name: "Water Pump", icon: "plug", watts: 750 },
];

const translations = {
  en: {
    title: "Watt Spring",
    subtitle: "Understand your home's electricity usage.",
    add: "Add appliance",
    appliances: "Your appliances",
    quantity: "Quantity",
    watts: "Watts (W)",
    hours: "Hours/day",
    days: "Days/month",
    daily: "Daily usage",
    monthly: "Monthly estimate",
    twoMonth: "Two-month estimate",
    units: "units",
    actual: "Actual EB units (optional)",
    compare: "Difference from estimate",
    empty: "Add an appliance to get started.",
    remove: "Remove",
    reset: "Reset",
    note: "Estimates only. Actual consumption depends on real appliance power and usage.",
    billNote: "The rupee bill estimator will be enabled after current Tamil Nadu domestic tariff and subsidy rules are verified.",
    custom: "Custom appliance",
    name: "Appliance name",
    addCustom: "Add custom",
    language: "தமிழ்",
    chart: "Appliance breakdown",
    noActual: "Enter your EB bill units to compare.",
  },
  ta: {
    title: "Watt Spring",
    subtitle: "உங்கள் வீட்டின் மின்சாரப் பயன்பாட்டை அறியுங்கள்.",
    add: "சாதனத்தைச் சேர்க்க",
    appliances: "உங்கள் மின்சாதனங்கள்",
    quantity: "எண்ணிக்கை",
    watts: "வாட்ஸ் (W)",
    hours: "மணி/நாள்",
    days: "நாட்கள்/மாதம்",
    daily: "தினசரி பயன்பாடு",
    monthly: "மாதாந்திர மதிப்பீடு",
    twoMonth: "இரண்டு மாத மதிப்பீடு",
    units: "யூனிட்கள்",
    actual: "உண்மையான EB யூனிட்கள் (விருப்பம்)",
    compare: "மதிப்பீட்டிலிருந்து வேறுபாடு",
    empty: "தொடங்க ஒரு மின்சாதனத்தைச் சேர்க்கவும்.",
    remove: "நீக்கு",
    reset: "மீட்டமை",
    note: "இது ஒரு மதிப்பீடு மட்டுமே. உண்மையான பயன்பாடு சாதனத்தின் சக்தி மற்றும் பயன்பாட்டு நேரத்தைப் பொறுத்தது.",
    billNote: "தற்போதைய தமிழ்நாடு வீட்டு மின் கட்டண விதிகள் மற்றும் மானியங்களைச் சரிபார்த்த பிறகு ரூபாய் கட்டண மதிப்பீடு சேர்க்கப்படும்.",
    custom: "தனிப்பயன் சாதனம்",
    name: "சாதனத்தின் பெயர்",
    addCustom: "சேர்க்க",
    language: "English",
    chart: "சாதன வாரியான பயன்பாடு",
    noActual: "ஒப்பிட EB பில் யூனிட்களை உள்ளிடவும்.",
  },
};

function ApplianceIcon({ name }: { name: string }) {
  const props = { size: 20, strokeWidth: 1.8 };
  switch (name) {
    case "fan": return <Fan {...props} />;
    case "light": return <Lightbulb {...props} />;
    case "tv": return <Tv {...props} />;
    case "fridge": return <Refrigerator {...props} />;
    case "washer": return <WashingMachine {...props} />;
    case "ac": return <AirVent {...props} />;
    default: return <Plug {...props} />;
  }
}

export default function Homepage() {
  const [lang, setLang] = useState<"en" | "ta">("en");
  const [period, setPeriod] = useState<30 | 60>(60);
  const [actual, setActual] = useState("");
  const [customName, setCustomName] = useState("");
  const [customWatts, setCustomWatts] = useState(100);
  const [appliances, setAppliances] = useState<Appliance[]>([]);
  const t = translations[lang];

  const totals = useMemo(() => {
    const daily = appliances.reduce(
      (sum, a) => sum + a.quantity * a.watts * a.hours / 1000,
      0
    );
    const monthly = appliances.reduce(
      (sum, a) => sum + a.quantity * a.watts * a.hours * a.days / 1000,
      0
    );
    const days = appliances.length
      ? appliances.reduce((sum, a) => sum + a.days, 0) / appliances.length
      : 30;
    return {
      daily,
      monthly,
      twoMonth: monthly * 2,
      selected: period === 30 ? monthly : monthly * 2,
      periodDays: period === 30 ? days : days * 2,
    };
  }, [appliances, period]);

  function addAppliance(p: typeof presets[number]) {
    setAppliances((old) => [
      ...old,
      {
        ...p,
        id: Date.now() + Math.random(),
        quantity: 1,
        hours: 4,
        days: 30,
      },
    ]);
  }

  function update(id: number, field: keyof Appliance, value: string) {
    setAppliances((old) => old.map((a) => {
      if (a.id !== id) return a;
      if (field === "name" || field === "icon") return { ...a, [field]: value };
      return {
        ...a,
        [field]: Math.max(
          0,
          Number.isFinite(Number(value)) ? Number(value) : 0
        ),
      };
    }));
  }

  function addCustom() {
    if (!customName.trim() || customWatts <= 0) return;
    addAppliance({
      name: customName.trim(),
      icon: "plug",
      watts: customWatts,
    });
    setCustomName("");
    setCustomWatts(100);
  }

  const difference = actual.trim() !== "" && Number(actual) >= 0
    ? Number(actual) - totals.selected
    : null;

  const money = (value: number) =>
    new Intl.NumberFormat(lang === "ta" ? "ta-IN" : "en-IN", {
      maximumFractionDigits: 1,
    }).format(value);

  return (
    <main className="app-shell">
      <header className="topbar">
        <a className="brand" href="#" aria-label="CurrentCheck home">
          <span className="brand-icon"><Zap size={24} fill="currentColor" /></span>
          <span>{t.title}<small>HOME ENERGY ESTIMATOR</small></span>
        </a>
        <button className="language-button" onClick={() =>
          setLang(lang === "en" ? "ta" : "en")
        }>
          <Languages size={17} /> {t.language}
        </button>
      </header>

      <section className="hero">
        <div className="hero-copy">
          <span className="eyebrow"><House size={14} /> TAMIL NADU · DOMESTIC</span>
          <h1>{t.subtitle}</h1>
          <p>Estimate your units from the appliances you use every day.</p>
        </div>
        <div className="hero-art"><Zap size={62} /></div>
      </section>

      <section className="summary-grid">
        <article className="summary-card">
          <span>{t.daily}</span>
          <strong>{money(totals.daily)} <small>{t.units}/day</small></strong>
        </article>
        <article className="summary-card featured">
          <span>{t.monthly}</span>
          <strong>{money(totals.monthly)} <small>{t.units}</small></strong>
        </article>
        <article className="summary-card">
          <span>{t.twoMonth}</span>
          <strong>{money(totals.twoMonth)} <small>{t.units}</small></strong>
        </article>
      </section>

      <div className="workspace">
        <section className="panel library-panel">
          <div className="section-heading">
            <div><span className="step">01</span><h2>{t.add}</h2></div>
          </div>
          <div className="preset-grid">
            {presets.map((p) => (
              <button className="preset" key={p.name} onClick={() => addAppliance(p)}>
                <span className="preset-icon"><ApplianceIcon name={p.icon} /></span>
                <span>{p.name}<small>{p.watts} W default</small></span>
                <Plus className="preset-plus" size={17} />
              </button>
            ))}
          </div>

          <div className="custom-form">
            <h3>{t.custom}</h3>
            <div className="custom-fields">
              <input
                value={customName}
                onChange={(e) => setCustomName(e.target.value)}
                placeholder={t.name}
                aria-label={t.name}
              />
              <input
                type="number" min="1"
                value={customWatts}
                onChange={(e) => setCustomWatts(Number(e.target.value))}
                aria-label={t.watts}
              />
              <button className="primary-button" onClick={addCustom}>
                <Plus size={16} /> {t.addCustom}
              </button>
            </div>
          </div>
        </section>

        <section className="panel appliance-panel">
          <div className="section-heading">
            <div><span className="step">02</span><h2>{t.appliances}</h2></div>
            <button className="text-button" onClick={() => setAppliances([])}>
              <RotateCcw size={15} /> {t.reset}
            </button>
          </div>

          {appliances.length === 0 ? (
            <div className="empty-state">
              <span><Plug size={28} /></span><p>{t.empty}</p>
            </div>
          ) : appliances.map((a) => (
            <article className="appliance-row" key={a.id}>
              <div className="appliance-title">
                <span className="preset-icon"><ApplianceIcon name={a.icon} /></span>
                <div><strong>{a.name}</strong><small>{a.watts} W × {a.quantity}</small></div>
                <button className="delete-button" title={t.remove}
                  aria-label={t.remove} onClick={() =>
                    setAppliances((old) => old.filter((x) => x.id !== a.id))
                  }>
                  <Trash2 size={16} />
                </button>
              </div>
              <div className="input-grid">
                {([
                  ["quantity", t.quantity, a.quantity],
                  ["watts", t.watts, a.watts],
                  ["hours", t.hours, a.hours],
                  ["days", t.days, a.days],
                ] as const).map(([field, label, value]) => (
                  <label key={field}>
                    <span>{label}</span>
                    <input type="number" min="0"
                      max={field === "days" ? 31 : field === "hours" ? 24 : undefined}
                      step={field === "hours" ? 0.5 : 1}
                      value={value}
                      onChange={(e) => update(a.id, field, e.target.value)}
                    />
                  </label>
                ))}
              </div>
              <div className="appliance-total">
                <span>{money(a.quantity * a.watts * a.hours * a.days / 1000)} {t.units}/month</span>
                <span>{t.daily}: {money(a.quantity * a.watts * a.hours / 1000)} {t.units}</span>
              </div>
            </article>
          ))}
        </section>
      </div>

      <section className="panel comparison-panel">
        <div className="section-heading">
          <div><span className="step">03</span><h2>{t.compare}</h2></div>
        </div>
        <div className="compare-controls">
          <div className="period-switch">
            <button className={period === 30 ? "active" : ""} onClick={() => setPeriod(30)}>
              Monthly
            </button>
            <button className={period === 60 ? "active" : ""} onClick={() => setPeriod(60)}>
              Two months
            </button>
          </div>
          <label className="actual-input">
            <span>{t.actual}</span>
            <input type="number" min="0" value={actual}
              onChange={(e) => setActual(e.target.value)} placeholder="e.g. 320" />
          </label>
        </div>
        <div className="comparison-result">
          <div><span>Estimated units</span><strong>{money(totals.selected)} <small>{t.units}</small></strong></div>
          <div><span>{t.compare}</span><strong className={
            difference === null ? "" : difference > 0 ? "warning-text" : "good-text"
          }>{difference === null ? "—" : `${difference > 0 ? "+" : ""}${money(difference)} ${t.units}`}</strong></div>
        </div>
        {difference !== null && (
          <p className="comparison-hint">
            {difference > 0
              ? "Your EB bill shows more units than this appliance estimate. Check other loads and the billing dates."
              : difference < 0
                ? "Your EB bill shows fewer units than this estimate. Review appliance wattage and usage hours."
                : "Your estimated and actual units match."}
          </p>
        )}
      </section>

      <section className="notice">
        <Zap size={18} />
        <div><strong>Consumption estimate, not a meter reading</strong>
          <p>{t.note} {t.billNote}</p>
        </div>
      </section>

      <footer>Watt Spring · An independent household electricity estimation tool.</footer>
    </main>
  );
}
