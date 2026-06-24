import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { useTranslation } from "react-i18next";

const languages = [
  { code: "fr", name: "Français", flag: "🇫🇷" },
  { code: "en", name: "English", flag: "🇬🇧" },
  { code: "de", name: "Deutsch", flag: "🇩🇪" },
];

export function LanguageSelector({ scrolled }: { scrolled: boolean }) {
  const { i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);

  const currentLang = i18n.language || "fr";

  const changeLanguage = (code: string) => {
    i18n.changeLanguage(code);
    setIsOpen(false);
  };

  const activeLang = languages.find(l => l.code === currentLang) || languages[0];

  return (
    <div className="relative">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center gap-1.5 px-3 py-2 rounded-full transition-colors text-sm font-medium ${scrolled ? "text-white hover:bg-white/10" : "text-white hover:bg-white/10"}`}
      >
        <span className="text-lg leading-none">{activeLang.flag}</span>
        <span className="hidden lg:inline">{activeLang.name}</span>
        <ChevronDown size={14} className={`transition-transform ${isOpen ? "rotate-180" : ""}`} />
      </button>

      {isOpen && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />
          <div className="absolute top-full right-0 mt-2 bg-white rounded-xl shadow-xl border border-turquoise/20 py-2 min-w-[140px] z-50">
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => changeLanguage(lang.code)}
                className={`w-full flex items-center gap-3 px-4 py-2 text-sm text-left transition-colors hover:bg-turquoise/10 ${currentLang === lang.code ? "text-turquoise font-medium bg-turquoise/5" : "text-ocean"}`}
              >
                <span className="text-lg leading-none">{lang.flag}</span>
                <span className="lg:inline">{lang.name}</span>
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
