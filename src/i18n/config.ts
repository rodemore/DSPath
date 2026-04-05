import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Import translation files
import commonES from './locales/es/common.json';
import exercisesES from './locales/es/exercises.json';
import commonEN from './locales/en/common.json';
import exercisesEN from './locales/en/exercises.json';

// Translation resources
const resources = {
  es: {
    common: commonES,
    exercises: exercisesES,
  },
  en: {
    common: commonEN,
    exercises: exercisesEN,
  },
};

// Initialize i18next
i18n
  .use(LanguageDetector) // Detect user language
  .use(initReactI18next) // Pass i18n to react-i18next
  .init({
    resources,
    fallbackLng: 'es', // Default to Spanish
    defaultNS: 'common', // Default namespace
    ns: ['common', 'exercises'], // Available namespaces

    interpolation: {
      escapeValue: false, // React already escapes values
    },

    detection: {
      // Order of language detection
      order: ['localStorage', 'navigator'],
      // Cache user language
      caches: ['localStorage'],
      lookupLocalStorage: 'dspath-language',
    },

    // Debug mode (only in development)
    debug: import.meta.env.MODE === 'development',
  });

export default i18n;
