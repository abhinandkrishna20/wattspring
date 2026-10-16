
import { useState } from "react";
import {
  Zap,
  Menu,
  X,
  Languages,
  ChevronRight,
} from "lucide-react";
import { Link } from "react-router-dom";

export type Language = "en" | "ta";

type HeaderProps = {
  lang: Language;
  onLanguageChange: () => void;
};

const navigation = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

export default function Header({
  lang,
  onLanguageChange,
}: HeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur">
      <div className="mx-auto flex min-h-[76px] max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        {/* Brand */}
        <a
          href="/"
          onClick={closeMenu}
          aria-label="WattSpring home"
          className="flex shrink-0 items-center gap-3"
        >
          <span className="grid size-11 place-items-center rounded-xl bg-watt-navy text-watt-saffron shadow-sm">
            <Zap size={25} strokeWidth={2.5} fill="currentColor" />
          </span>

          <span className="leading-tight">
            <span className="block text-xl font-bold tracking-tight text-watt-navy sm:text-2xl">
              Watt<span className="text-watt-green">Spring</span>
            </span>
            <span className="mt-1 block text-[9px] font-semibold tracking-[0.16em] text-slate-500 sm:text-[10px]">
              ENERGY MADE SIMPLE
            </span>
          </span>
        </a>

        {/* Desktop navigation */}
        <nav
          aria-label="Main navigation"
          className="hidden items-center gap-1 lg:flex"
        >
          {navigation.map((item) => (
            <Link
              key={item.href}
              to={item.href}
              onClick={closeMenu}
              className="rounded-lg px-4 py-2.5 text-sm font-medium text-slate-600 transition hover:bg-watt-light hover:text-watt-green"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Actions */}
        <div className="flex shrink-0 items-center gap-2">
          <button
            type="button"
            onClick={onLanguageChange}
            aria-label={
              lang === "en"
                ? "Switch language to Tamil"
                : "Switch language to English"
            }
            className="inline-flex items-center gap-2 rounded-lg border border-slate-200 px-3 py-2.5 text-sm font-semibold text-watt-navy transition hover:border-watt-green hover:bg-watt-light"
          >
            <Languages size={17} />
            <span>{lang === "en" ? "தமிழ்" : "English"}</span>
          </button>

          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            aria-controls="mobile-navigation"
            className="grid size-11 place-items-center rounded-lg border border-slate-200 text-watt-navy transition hover:bg-watt-light lg:hidden"
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile navigation */}
      {menuOpen && (
        <nav
          id="mobile-navigation"
          aria-label="Mobile navigation"
          className="border-t border-slate-100 bg-white px-4 py-3 shadow-lg lg:hidden"
        >
          {navigation.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={closeMenu}
              className="flex items-center justify-between rounded-lg px-4 py-3 text-sm font-medium text-watt-navy transition hover:bg-watt-light hover:text-watt-green"
            >
              {item.label}
              <ChevronRight size={17} className="text-slate-400" />
            </a>
          ))}
        </nav>
      )}
    </header>
  );
}
