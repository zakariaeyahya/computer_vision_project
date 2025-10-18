import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { useColorScheme } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

type Theme = 'light' | 'dark';

type ThemeColors = {
  primary: string;
  secondary: string;
  background: string;
  surface: string;
  text: string;
  textSecondary: string;
  border: string;
  error: string;
  success: string;
  warning: string;
  info: string;
  card: string;
  shadow: string;
  accent: string;
  disabled: string;
};

type ThemeContextType = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  colors: ThemeColors;
  isDark: boolean;
};

const lightColors: ThemeColors = {
  primary: '#2C5F2D',
  secondary: '#97BE5A',
  background: '#FFFFFF',
  surface: '#F9FAFB',
  text: '#1A1A1A',
  textSecondary: '#6B7280',
  border: '#E5E7EB',
  error: '#DC2626',
  success: '#059669',
  warning: '#F59E0B',
  info: '#3B82F6',
  card: '#FFFFFF',
  shadow: '#000000',
  accent: '#FEF08A',
  disabled: '#D1D5DB',
};

const darkColors: ThemeColors = {
  primary: '#97BE5A',
  secondary: '#2C5F2D',
  background: '#1A1A1A',
  surface: '#2D2D2D',
  text: '#FFFFFF',
  textSecondary: '#9CA3AF',
  border: '#374151',
  error: '#EF4444',
  success: '#10B981',
  warning: '#FBBF24',
  info: '#60A5FA',
  card: '#2D2D2D',
  shadow: '#000000',
  accent: '#FDE047',
  disabled: '#4B5563',
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const systemColorScheme = useColorScheme();
  const [theme, setThemeState] = useState<Theme>('light');

  // Load theme from AsyncStorage on mount
  useEffect(() => {
    loadTheme();
  }, []);

  const loadTheme = async () => {
    try {
      const stored = await AsyncStorage.getItem('theme');
      if (stored === 'light' || stored === 'dark') {
        setThemeState(stored);
      } else {
        // Use system theme if no preference saved
        setThemeState(systemColorScheme === 'dark' ? 'dark' : 'light');
      }
    } catch (error) {
      console.error('Failed to load theme:', error);
    }
  };

  const setTheme = async (newTheme: Theme) => {
    try {
      await AsyncStorage.setItem('theme', newTheme);
      setThemeState(newTheme);
    } catch (error) {
      console.error('Failed to save theme:', error);
    }
  };

  const colors = theme === 'dark' ? darkColors : lightColors;
  const isDark = theme === 'dark';

  return (
    <ThemeContext.Provider value={{ theme, setTheme, colors, isDark }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
}

