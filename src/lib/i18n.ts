import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import fr from '../locales/fr.json';
import en from '../locales/en.json';
import de from '../locales/de.json';

const resources = {
  fr: { translation: fr },
  en: { translation: en },
  de: { translation: de }
};

const isBrowser = typeof window !== 'undefined';

const i18nInstance = i18n.use(initReactI18next);

if (isBrowser) {
  i18nInstance.use(LanguageDetector);
}

i18nInstance.init({
  resources,
  fallbackLng: 'fr',
  supportedLngs: ['fr', 'en', 'de'],
  interpolation: {
    escapeValue: false // react already safes from xss
  },
  detection: isBrowser ? {
    order: ['querystring', 'localStorage', 'navigator'],
    lookupQuerystring: 'lng',
    caches: ['localStorage']
  } : undefined
});

export default i18n;
