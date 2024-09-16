import React, { useCallback, useEffect, useMemo } from 'react';
import * as SecureStore from 'expo-secure-store';
import { Theme, darkTheme, theme } from './theme';

interface ThemeContextProps {
  themeContext: Theme;
  changeTheme: (theme: Theme) => void;
}

export const ThemeContext = React.createContext<ThemeContextProps>({
  themeContext: theme,
  changeTheme: () => {},
});

interface Props {
  children: JSX.Element;
  onThemeChanged: (theme: Theme) => void;
}

export const ThemeProvider = (props: Props) => {
  const { children, onThemeChanged } = props;

  const [currentTheme, setCurrentTheme] = React.useState<Theme>(theme);

  useEffect(() => {
    const loadTheme = async () => {
      let themeType = null;
      try {
        const key = '123';
        themeType = await SecureStore.getItemAsync(key);
      } catch (e: unknown) {
        /* empty */
      }
      if (themeType === null) {
        themeType = 'dark';
      }

      const loadedTheme = themeType === 'light' ? theme : darkTheme;

      onThemeChanged(loadedTheme);
      setCurrentTheme(loadedTheme);
    };

    loadTheme();
  }, [onThemeChanged]);

  const changeTheme = useCallback(
    async (updatedTheme: Theme) => {
      const themeType = updatedTheme === theme ? 'dark' : 'light';

      const key = '123';
      await SecureStore.setItemAsync(key, themeType);

      onThemeChanged(updatedTheme);
      setCurrentTheme(updatedTheme);
    },
    [onThemeChanged]
  );

  const providerObject = useMemo(() => {
    return {
      themeContext: currentTheme,
      changeTheme,
    };
  }, [changeTheme, currentTheme]);

  return (
    <ThemeContext.Provider value={providerObject}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => React.useContext(ThemeContext);
