import { Theme } from 'app/theme/model';
import { NavigationContainer, Theme as NavigationTheme } from '@react-navigation/native';
import { DefaultNavigationTheme, DefaultTheme } from 'app/theme/Default.theme';
import React, { useContext, useState } from 'react';

export interface AppTheme {
  navigation: NavigationTheme;
  main: Theme;
}

export interface ContextTheme extends AppTheme {
  change: (main: Theme, navigation: NavigationTheme) => void;
}

const DEFAULT: ContextTheme = {
  navigation: DefaultNavigationTheme,
  main: DefaultTheme,
  change: () => undefined,
};

const ThemeContext = React.createContext<ContextTheme>(DEFAULT);

export const useTheme = (): AppTheme => {
  const { main, navigation } = useContext(ThemeContext);

  return { main, navigation };
};

export const ThemeProvider: React.FC = ({ children }) => {
  // TODO: Dark Theme
  //  const scheme = useColorScheme();
  const [context, setContext] = useState({ main: DefaultTheme, navigation: DefaultNavigationTheme });

  const change = (main: Theme, navigation: NavigationTheme) => setContext({ main, navigation });

  const { main, navigation } = context;

  const value = {
    main,
    navigation,
    change,
  };

  return (
    <ThemeContext.Provider value={value}>
      <NavigationContainer theme={value.navigation}>{children}</NavigationContainer>
    </ThemeContext.Provider>
  );
};
