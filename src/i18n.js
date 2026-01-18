import i18next from 'i18next';
import tr from './locales/tr.js';
import en from './locales/en.js';

// Get saved language or default to browser language (detecting Turkish)
const savedLang = localStorage.getItem('language') || (navigator.language.startsWith('tr') ? 'tr' : 'en');

i18next.init({
  lng: savedLang,
  fallbackLng: 'tr',
  debug: false,
  resources: {
    tr: tr,
    en: en
  }
});

export default i18next;
