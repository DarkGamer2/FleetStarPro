// App.js
import React, {useEffect, useCallback} from 'react';
import StackNav from './components/StackNavigator';
import {useColorScheme} from 'react-native';
import {save, get} from './storage';
import {ThemeProvider, useTheme} from './theme/ThemeContext';
import {
  NavigationContainer,
  DarkTheme,
  DefaultTheme,
} from '@react-navigation/native';

const AppContent = () => {
  const appearance = useColorScheme();
  const {theme, setTheme} = useTheme();

  const setAppTheme = useCallback(async () => {
    const IS_FIRST = await get('IS_FIRST');
    if (IS_FIRST === null) {
      save('Theme', appearance);
      save('IsDefault', true);
      save('IS_FIRST', true);
      setTheme(appearance); // Set the initial theme
    }
  }, [appearance, setTheme]);

  useEffect(() => {
    setAppTheme();
  }, [setAppTheme]);

  return (
    <NavigationContainer theme={theme === 'dark' ? DarkTheme : DefaultTheme}>
      <StackNav />
    </NavigationContainer>
  );
};

const App = () => (
  <ThemeProvider>
    <AppContent />
  </ThemeProvider>
);

export default App;
