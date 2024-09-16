import 'dayjs/locale/de';
import 'intl-pluralrules';

import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import localData from 'dayjs/plugin/localeData';
import weekOfYear from 'dayjs/plugin/weekOfYear';
import dayjs from 'dayjs';
import * as Localization from 'expo-localization';
import { translationEN } from '@localization';
import { translationDE } from './translations/translation.de';
import { translationAR } from './translations/translation.ar';

dayjs.locale(Localization.locale);
dayjs.extend(localData);
dayjs.extend(weekOfYear);

declare module 'i18next' {
  interface CustomTypeOptions {
    returnNull: false;
  }
}

i18next.use(initReactI18next).init({
  returnNull: false,
  resources: {
    de: {
      translation: translationDE,
    },
    en: {
      translation: translationEN,
    },
    ar: {
      translation: translationAR,
    },
  },
  lng: Localization.getLocales()[0].languageCode,
  interpolation: {
    escapeValue: false,
  },
  fallbackLng: 'en',
});

export default i18next;
