import React, { createContext, useState, useContext, useEffect } from 'react';
import { useAuth } from './AuthContext';

interface UserSettings {
  notificationsEnabled: boolean;
  emailNotifications: boolean;
  weeklyReports: boolean;
  department?: string;
}

interface UserSettingsContextType {
  settings: UserSettings;
  updateSettings: (newSettings: Partial<UserSettings>) => void;
}

const UserSettingsContext = createContext<UserSettingsContextType | undefined>(undefined);

export const UserSettingsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  const [settings, setSettings] = useState<UserSettings>({
    notificationsEnabled: true,
    emailNotifications: true,
    weeklyReports: true,
    department: ''
  });

  // Load settings from localStorage on mount or when user changes
  useEffect(() => {
    if (user) {
      const storedSettings = localStorage.getItem(`settings_${user.id}`);
      if (storedSettings) {
        setSettings(JSON.parse(storedSettings));
      }
    }
  }, [user]);

  // Save settings to localStorage whenever they change
  useEffect(() => {
    if (user) {
      localStorage.setItem(`settings_${user.id}`, JSON.stringify(settings));
    }
  }, [settings, user]);

  const updateSettings = (newSettings: Partial<UserSettings>) => {
    setSettings(prev => ({ ...prev, ...newSettings }));
  };

  return (
    <UserSettingsContext.Provider value={{ settings, updateSettings }}>
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