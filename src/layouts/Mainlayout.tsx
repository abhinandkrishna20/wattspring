
import type { ReactNode } from "react";
import Header, { type Language } from "../components/Header";
import Footer from "../components/Footer";

type MainLayoutProps = {
  children: ReactNode;
  lang: Language;
  onLanguageChange: () => void;
};

export default function MainLayout({
  children,
  lang,
  onLanguageChange,
}: MainLayoutProps) {
  return (
    <div className="flex min-h-screen flex-col bg-watt-light">
      <Header
        lang={lang}
        onLanguageChange={onLanguageChange}
      />

      <main className="w-full flex-1">
        {children}
      </main>

      <Footer />
    </div>
  );
}
