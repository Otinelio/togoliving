import { createContext, useContext, useState, useEffect, type ReactNode } from "react";

export type Lang = "fr" | "en" | "de";

interface LangCtx {
  lang: Lang;
  setLang: (l: Lang) => void;
}

const Ctx = createContext<LangCtx>({ lang: "fr", setLang: () => {} });

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(() => {
    try {
      const stored = localStorage.getItem("tgl_lang") as Lang | null;
      if (stored && ["fr", "en", "de"].includes(stored)) return stored;
    } catch {}
    return "fr";
  });

  const setLang = (l: Lang) => {
    setLangState(l);
    try { localStorage.setItem("tgl_lang", l); } catch {}
  };

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  return <Ctx.Provider value={{ lang, setLang }}>{children}</Ctx.Provider>;
}

export function useLanguage() {
  return useContext(Ctx);
}
