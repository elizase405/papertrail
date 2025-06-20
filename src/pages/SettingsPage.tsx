import React, { useEffect, useState } from 'react';
import { Bell, User, Shield, Mail } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useUserSettings } from '../context/UserSettingsContext';
import { useTheme } from '../context/ThemeContext';

const SettingsPage: React.FC = () => {
  const { user } = useAuth();
  const { settings, updateSettings } = useUserSettings();
  const { theme } = useTheme();
  
  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [department, setDepartment] = useState(user?.department || '');
  const [isSaving, setIsSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState('');

  useEffect(() => {
    // Add scroll reveal effect
    const elements = document.querySelectorAll('.fade-in-section');
    elements.forEach((el, index) => {
      setTimeout(() => {
        el.classList.add('is-visible');
      }, index * 100);
    });
  }, []);

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    
    // Simulate API call
    setTimeout(() => {
      // Update user settings
      updateSettings({ department });
      
      // Show success message
      setSaveMessage('Profile updated successfully');
      setIsSaving(false);
      
      // Clear message after 3 seconds
      setTimeout(() => {
        setSaveMessage('');
      }, 3000);
    }, 1000);
  };

  const handleToggleNotifications = (setting: keyof typeof settings) => {
    updateSettings({ [setting]: !settings[setting] });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="fade-in-section">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Settings</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">Manage your account and preferences</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Settings Navigation */}
        <div className="fade-in-section">
          <div className="minimal-card p-6 dark:bg-gray-800">
            <nav className="space-y-2">
              <a href="#profile" className="flex items-center space-x-3 px-4 py-3 text-sm font-medium rounded-xl transition-all duration-200 bg-gray-900 text-white shadow-sm">
                <User className="w-5 h-5" />
                <span>Profile</span>
              </a>
              <a href="#notifications" className="flex items-center space-x-3 px-4 py-3 text-sm font-medium rounded-xl transition-all duration-200 text-gray-600 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-white">
                <Bell className="w-5 h-5" />
                <span>Notifications</span>
              </a>
              <a href="#security" className="flex items-center space-x-3 px-4 py-3 text-sm font-medium rounded-xl transition-all duration-200 text-gray-600 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-white">
                <Shield className="w-5 h-5" />
                <span>Security</span>
              </a>
              <a href="#email" className="flex items-center space-x-3 px-4 py-3 text-sm font-medium rounded-xl transition-all duration-200 text-gray-600 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-white">
                <Mail className="w-5 h-5" />
                <span>Email Preferences</span>
              </a>
            </nav>
          </div>
        </div>

        {/* Settings Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Profile Settings */}
          <div className="fade-in-section">
            <div className="minimal-card p-6 dark:bg-gray-800">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Profile Information</h2>
              
              {saveMessage && (
                <div className="bg-green-50 dark:bg-green-900/20 text-green-800 dark:text-green-200 p-4 rounded-xl mb-6">
                  {saveMessage}
                </div>
              )}
              
              <form onSubmit={handleSaveProfile} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">First Name</label>
                    <input 
                      type="text" 
                      className="minimal-input dark:bg-gray-700 dark:text-white dark:border-gray-600" 
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Department</label>
                    <input 
                      type="text" 
                      className="minimal-input dark:bg-gray-700 dark:text-white dark:border-gray-600" 
                      value={department}
                      onChange={(e) => setDepartment(e.target.value)}
                      placeholder="e.g. Legal, HR, Finance"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Email</label>
                  <input 
                    type="email" 
                    className="minimal-input dark:bg-gray-700 dark:text-white dark:border-gray-600" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled
                  />
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Email cannot be changed</p>
                </div>
                
                <div className="flex justify-end">
                  <button 
                    type="submit" 
                    className="minimal-button-primary"
                    disabled={isSaving}
                  >
                    {isSaving ? 'Saving...' : 'Save Changes'}
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* Notification Settings */}
          <div className="fade-in-section">
            <div className="minimal-card p-6 dark:bg-gray-800">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Notification Preferences</h2>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">Email Notifications</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Receive email alerts for expiring documents</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input 
                      type="checkbox" 
                      className="sr-only peer" 
                      checked={settings.emailNotifications}
                      onChange={() => handleToggleNotifications('emailNotifications')}
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-gray-300 dark:peer-focus:ring-gray-700 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-gray-900"></div>
                  </label>
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">Push Notifications</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Get notified in your browser</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input 
                      type="checkbox" 
                      className="sr-only peer" 
                      checked={settings.notificationsEnabled}
                      onChange={() => handleToggleNotifications('notificationsEnabled')}
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-gray-300 dark:peer-focus:ring-gray-700 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-gray-900"></div>
                  </label>
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">Weekly Summary</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Receive a weekly compliance report</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input 
                      type="checkbox" 
                      className="sr-only peer" 
                      checked={settings.weeklyReports}
                      onChange={() => handleToggleNotifications('weeklyReports')}
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-gray-300 dark:peer-focus:ring-gray-700 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-gray-900"></div>
                  </label>
                </div>
              </div>
            </div>
          </div>

          {/* Theme Settings */}
          <div className="fade-in-section">
            <div className="minimal-card p-6 dark:bg-gray-800">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Appearance</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div 
                  className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${
                    theme === 'light' 
                      ? 'border-gray-900 bg-white' 
                      : 'border-gray-200 bg-gray-50 dark:border-gray-700 dark:bg-gray-700'
                  }`}
                  onClick={() => updateSettings({ theme: 'light' })}
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-medium text-gray-900 dark:text-white">Light Mode</span>
                    {theme === 'light' && (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-900 text-white">
                        Active
                      </span>
                    )}
                  </div>
                  <div className="h-24 bg-white border border-gray-200 rounded-lg shadow-sm"></div>
                </div>
                
                <div 
                  className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${
                    theme === 'dark' 
                      ? 'border-gray-900 dark:border-white bg-gray-800' 
                      : 'border-gray-200 bg-gray-50 dark:border-gray-700 dark:bg-gray-700'
                  }`}
                  onClick={() => updateSettings({ theme: 'dark' })}
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-medium text-gray-900 dark:text-white">Dark Mode</span>
                    {theme === 'dark' && (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-900 dark:bg-white dark:text-gray-900 text-white">
                        Active
                      </span>
                    )}
                  </div>
                  <div className="h-24 bg-gray-900 border border-gray-700 rounded-lg shadow-sm"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;