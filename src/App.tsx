
import { useEffect, useState } from "react";
// import type { Language } from "./components/Header";
import Homepage from "./Homepage"
import MainLayout from "./layouts/Mainlayout"
import { BrowserRouter, Routes , Route, useLocation} from "react-router-dom";
import Contact from "./pages/Contact";
import Blog from "./pages/Blog";
import About from "./pages/About";
import Disclaimer from "./pages/Disclaimer";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import Terms from "./pages/Terms";
import { trackPageView } from "./analytics";
import Learn from "./pages/Learn/Learn";
import History from "./pages/History/History";
import ArticlePage from "./pages/ArticlePage/ArticlePage";



function AnalyticsTracker() {
  const location = useLocation();

  useEffect(() => {
    void trackPageView(location.pathname);
  }, [location.pathname]);

  return null;
}


const App = () => {
  const [lang, setLang] = useState<"en" | "ta">("en");

  function toggleLanguage() {
    setLang((current) => (current === "en" ? "ta" : "en"));
  }

  return (
    <BrowserRouter>
    <AnalyticsTracker />
    <MainLayout lang={lang}
      onLanguageChange={toggleLanguage}>
   
   <Routes>
      
      <Route path="/" element={<Homepage lang={lang} />} />
      <Route path="/about" element={<About />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/learn" element={<Learn />} />
          <Route path="/history" element={<History />} />
          <Route path="/learn/:slug" element={<ArticlePage />} />
          <Route path="/history/:slug" element={<ArticlePage />} />
          
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/disclaimer" element={<Disclaimer />} />
    
          <Route path="/disclaimer" element={<Disclaimer />} />
    </Routes>
     
      
    
    </MainLayout>
    </BrowserRouter>
  )
}

export default App