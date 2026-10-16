
import { useState } from "react";
// import type { Language } from "./components/Header";
import Homepage from "./Homepage"
import MainLayout from "./layouts/Mainlayout"
import { BrowserRouter, Routes , Route} from "react-router-dom";
import Contact from "./pages/Contact";
import Blog from "./pages/Blog";
import About from "./pages/About";

const App = () => {
  const [lang, setLang] = useState<"en" | "ta">("en");

  function toggleLanguage() {
    setLang((current) => (current === "en" ? "ta" : "en"));
  }

  return (
    <BrowserRouter>
    <MainLayout lang={lang}
      onLanguageChange={toggleLanguage}>
   
   <Routes>
      
      <Route path="/" element={<Homepage lang={lang} />} />
      <Route path="/about" element={<About />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/contact" element={<Contact />} />
    </Routes>
     
      
    
    </MainLayout>
    </BrowserRouter>
  )
}

export default App