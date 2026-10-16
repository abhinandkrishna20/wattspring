
import {
  Zap,
  ArrowUpRight,

 Camera ,
Link ,
 
  
  Mail,
  Play,
} from "lucide-react";


const exploreLinks = [
  { label: "Home", href: "/" },
  { label: "About WattSpring", href: "/about" },
  { label: "Energy Blog", href: "/blog" },
  { label: "Contact Us", href: "/contact" },
];

const legalLinks = [
  { label: "Terms & Conditions", href: "/terms" },
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Disclaimer", href: "/disclaimer" },
];

const socialLinks = [
  {
    label: "Instagram",
    href: "https://www.instagram.com/",
    Icon: Camera,
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/",
    Icon: Link,
  },
  {
    label: "YouTube",
    href: "https://www.youtube.com/",
    Icon: Play ,
  },
];

export default function Footer() {
  return (
    <footer className="mt-16 bg-watt-navy text-white">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand and description */}
          <div className="lg:col-span-2">
            <a
              href="/"
              aria-label="WattSpring home"
              className="inline-flex items-center gap-3"
            >
              <span className="grid size-11 place-items-center rounded-xl bg-white/10 text-watt-saffron">
                <Zap size={25} fill="currentColor" />
              </span>

              <span className="text-2xl font-bold tracking-tight">
                Watt<span className="text-emerald-400">Spring</span>
              </span>
            </a>

            <p className="mt-5 max-w-md text-sm leading-7 text-slate-300">
              Making electricity usage easier to understand
              through practical tools, useful information and
              energy awareness.
            </p>

            <a
              href="mailto:hello@wattspring.in"
              className="mt-5 inline-flex items-center gap-2 text-sm text-slate-200 transition hover:text-watt-saffron"
            >
              <Mail size={16} />
              Contact WattSpring
              <ArrowUpRight size={14} />
            </a>
          </div>

          {/* Explore */}
          <div>
            <h2 className="text-sm font-bold uppercase tracking-wider text-white">
              Explore
            </h2>

            <ul className="mt-5 space-y-3">
              {exploreLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-sm text-slate-300 transition hover:text-emerald-300"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h2 className="text-sm font-bold uppercase tracking-wider text-white">
              Legal
            </h2>

            <ul className="mt-5 space-y-3">
              {legalLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-sm text-slate-300 transition hover:text-emerald-300"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-5 border-t border-white/15 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs leading-6 text-slate-400">
            © {new Date().getFullYear()} <Link to="/">WattSpring</Link>.
            All rights reserved.
          </p>

          <div className="flex items-center gap-3">
            <span className="mr-1 text-xs text-slate-400">
              Follow us
            </span>

            {socialLinks.map(({ label, href, Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noreferrer"
                aria-label={label}
                title={label}
                className="grid size-10 place-items-center rounded-lg border border-white/15 text-slate-200 transition hover:border-emerald-400 hover:bg-white/10 hover:text-emerald-300"
              >
                <Icon size={18} />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
