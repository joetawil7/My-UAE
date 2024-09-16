import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { Translation } from './translations/translation.base';

export const useTranslate = () => {
  const { t: i18nextT, i18n } = useTranslation();

  const t = useCallback(
    (key: keyof Translation): string => i18nextT(key),
    [i18nextT]
  );

  const changeLanguage = useCallback(
    (language: string) => i18n.changeLanguage(language),
    [i18n]
  );

  return { t, changeLanguage };
};
