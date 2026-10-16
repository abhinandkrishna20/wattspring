
import { useState } from "react";
// import type { Language } from "./components/Header";
import Homepage from "./Homepage"
import MainLayout from "./layouts/Mainlayout"

const App = () => {
  const [lang, setLang] = useState<"en" | "ta">("en");

  function toggleLanguage() {
    setLang((current) => (current === "en" ? "ta" : "en"));
  }

  return (
    <MainLayout lang={lang}
      onLanguageChange={toggleLanguage}>
    <div>
      <Homepage lang={lang} />
      
    </div>
    </MainLayout>
  )
}

export default App