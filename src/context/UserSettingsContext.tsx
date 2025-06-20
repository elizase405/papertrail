import React, { createContext, useState, useContext, useEffect } from 'react';
import { useAuth } from './AuthContext';
import { useTheme } from './ThemeContext';

interface UserSettings {
  notificationsEnabled: boolean;
  emailNotifications: boolean;
  weeklyReports: boolean;
  department?: string;
  hasCompletedOnboarding: boolean;
  theme: 'light' | 'dark';
}

interface UserSettingsContextType {
  settings: UserSettings;
  updateSettings: (newSettings: Partial<UserSettings>) => void;
  resetOnboarding: () => void;
}

const UserSettingsContext = createContext<UserSettingsContextType | undefined>(undefined);

export const UserSettingsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const [settings, setSettings] = useState<UserSettings>({
    notificationsEnabled: true,
    emailNotifications: true,
    weeklyReports: true,
    department: '',
    hasCompletedOnboarding: false,
    theme: theme as 'light' | 'dark'
  });

  // Load settings from localStorage on mount or when user changes
  useEffect(() => {
    if (user) {
      const storedSettings = localStorage.getItem(`settings_${user.id}`);
      if (storedSettings) {
        setSettings(JSON.parse(storedSettings));
      } else {
        // If no settings exist yet, create default settings
        const defaultSettings = {
          notificationsEnabled: true,
          emailNotifications: true,
          weeklyReports: true,
          department: user.department || '',
          hasCompletedOnboarding: false,
          theme: theme as 'light' | 'dark'
        };
        setSettings(defaultSettings);
        localStorage.setItem(`settings_${user.id}`, JSON.stringify(defaultSettings));
      }
    }
  }, [user, theme]);

  // Save settings to localStorage whenever they change
  useEffect(() => {
    if (user) {
      localStorage.setItem(`settings_${user.id}`, JSON.stringify(settings));
    }
  }, [settings, user]);

  // Update theme when settings theme changes
  useEffect(() => {
    if (settings.theme !== theme) {
      toggleTheme();
    }
  }, [settings.theme]);

  const updateSettings = (newSettings: Partial<UserSettings>) => {
    setSettings(prev => ({ ...prev, ...newSettings }));
  };

  const resetOnboarding = () => {
    setSettings(prev => ({ ...prev, hasCompletedOnboarding: false }));
  };

  return (
    <UserSettingsContext.Provider value={{ settings, updateSettings, resetOnboarding }}>
      {children}
    </UserSettingsContext.Provider>
  );
};

export const useUserSettings = () => {
  const context = useContext(UserSettingsContext);
  if (context === undefined) {
    throw new Error('useUserSettings must be used within a UserSettingsProvider');
  }
  return context;
};