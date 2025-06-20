import React, { useEffect, useState } from 'react';
import { Bell, User, Shield, Moon, Sun, RefreshCw, Building } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useUserSettings } from '../context/UserSettingsContext';
import { useTheme } from '../context/ThemeContext';

const SettingsPage: React.FC = () => {
  const { user } = useAuth();
  const { settings, updateSettings } = useUserSettings();
  const { theme, toggleTheme } = useTheme();
  
  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [organization, setOrganization] = useState(user?.department || '');
  const [isSaving, setIsSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState('');
  const [activeTab, setActiveTab] = useState('profile');

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
      updateSettings({ department: organization });
      
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

  const handleResetOnboarding = () => {
    updateSettings({ hasCompletedOnboarding: false });
    setSaveMessage('Onboarding tour has been reset. It will show next time you visit the dashboard.');
    
    setTimeout(() => {
      setSaveMessage('');
    }, 3000);
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
              <button 
                onClick={() => setActiveTab('profile')}
                className={`flex w-full items-center space-x-3 px-4 py-3 text-sm font-medium rounded-xl transition-all duration-200 ${
                  activeTab === 'profile' 
                    ? 'bg-gray-900 text-white shadow-sm dark:bg-gray-700' 
                    : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-white'
                }`}
              >
                <User className="w-5 h-5" />
                <span>Profile</span>
              </button>
              
              <button 
                onClick={() => setActiveTab('notifications')}
                className={`flex w-full items-center space-x-3 px-4 py-3 text-sm font-medium rounded-xl transition-all duration-200 ${
                  activeTab === 'notifications' 
                    ? 'bg-gray-900 text-white shadow-sm dark:bg-gray-700' 
                    : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-white'
                }`}
              >
                <Bell className="w-5 h-5" />
                <span>Notifications</span>
              </button>
              
              <button 
                onClick={() => setActiveTab('security')}
                className={`flex w-full items-center space-x-3 px-4 py-3 text-sm font-medium rounded-xl transition-all duration-200 ${
                  activeTab === 'security' 
                    ? 'bg-gray-900 text-white shadow-sm dark:bg-gray-700' 
                    : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-white'
                }`}
              >
                <Shield className="w-5 h-5" />
                <span>Security</span>
              </button>
              
              <button 
                onClick={() => setActiveTab('appearance')}
                className={`flex w-full items-center space-x-3 px-4 py-3 text-sm font-medium rounded-xl transition-all duration-200 ${
                  activeTab === 'appearance' 
                    ? 'bg-gray-900 text-white shadow-sm dark:bg-gray-700' 
                    : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-white'
                }`}
              >
                {theme === 'dark' ? (
                  <Moon className="w-5 h-5" />
                ) : (
                  <Sun className="w-5 h-5" />
                )}
                <span>Appearance</span>
              </button>
            </nav>
          </div>
        </div>

        {/* Settings Content */}
        <div className="lg:col-span-2 space-y-6">
          {saveMessage && (
            <div className="bg-green-50 dark:bg-green-900/20 text-green-800 dark:text-green-200 p-4 rounded-xl mb-6">
              {saveMessage}
            </div>
          )}
          
          {/* Profile Settings */}
          {activeTab === 'profile' && (
            <div className="fade-in-section">
              <div className="minimal-card p-6 dark:bg-gray-800">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Profile Information</h2>
                
                <form onSubmit={handleSaveProfile} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Name</label>
                      <input 
                        type="text" 
                        className="minimal-input dark:bg-gray-700 dark:text-white dark:border-gray-600" 
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Organization</label>
                      <input 
                        type="text" 
                        className="minimal-input dark:bg-gray-700 dark:text-white dark:border-gray-600" 
                        value={organization}
                        onChange={(e) => setOrganization(e.target.value)}
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
              
              <div className="minimal-card p-6 mt-6 dark:bg-gray-800">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Organization Details</h2>
                
                <form className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Organization Name</label>
                    <input 
                      type="text" 
                      className="minimal-input dark:bg-gray-700 dark:text-white dark:border-gray-600" 
                      placeholder="Your company name"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Industry</label>
                    <select className="minimal-input dark:bg-gray-700 dark:text-white dark:border-gray-600">
                      <option value="">Select industry</option>
                      <option value="healthcare">Healthcare</option>
                      <option value="finance">Finance</option>
                      <option value="technology">Technology</option>
                      <option value="education">Education</option>
                      <option value="manufacturing">Manufacturing</option>
                      <option value="retail">Retail</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Company Size</label>
                    <select className="minimal-input dark:bg-gray-700 dark:text-white dark:border-gray-600">
                      <option value="">Select company size</option>
                      <option value="1-10">1-10 employees</option>
                      <option value="11-50">11-50 employees</option>
                      <option value="51-200">51-200 employees</option>
                      <option value="201-500">201-500 employees</option>
                      <option value="501+">501+ employees</option>
                    </select>
                  </div>
                  
                  <div className="flex justify-end">
                    <button 
                      type="button" 
                      className="minimal-button-primary"
                    >
                      Save Organization Details
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {/* Notification Settings */}
          {activeTab === 'notifications' && (
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
              
              <div className="minimal-card p-6 mt-6 dark:bg-gray-800">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Notification Schedule</h2>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      When should we send expiry notifications?
                    </label>
                    <div className="space-y-2">
                      <div className="flex items-center">
                        <input 
                          id="notify-30" 
                          type="checkbox" 
                          className="h-4 w-4 text-gray-900 focus:ring-gray-500 border-gray-300 rounded"
                          defaultChecked
                        />
                        <label htmlFor="notify-30" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                          30 days before expiry
                        </label>
                      </div>
                      <div className="flex items-center">
                        <input 
                          id="notify-14" 
                          type="checkbox" 
                          className="h-4 w-4 text-gray-900 focus:ring-gray-500 border-gray-300 rounded"
                          defaultChecked
                        />
                        <label htmlFor="notify-14" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                          14 days before expiry
                        </label>
                      </div>
                      <div className="flex items-center">
                        <input 
                          id="notify-7" 
                          type="checkbox" 
                          className="h-4 w-4 text-gray-900 focus:ring-gray-500 border-gray-300 rounded"
                          defaultChecked
                        />
                        <label htmlFor="notify-7" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                          7 days before expiry
                        </label>
                      </div>
                      <div className="flex items-center">
                        <input 
                          id="notify-1" 
                          type="checkbox" 
                          className="h-4 w-4 text-gray-900 focus:ring-gray-500 border-gray-300 rounded"
                          defaultChecked
                        />
                        <label htmlFor="notify-1" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                          1 day before expiry
                        </label>
                      </div>
                      <div className="flex items-center">
                        <input 
                          id="notify-expired" 
                          type="checkbox" 
                          className="h-4 w-4 text-gray-900 focus:ring-gray-500 border-gray-300 rounded"
                          defaultChecked
                        />
                        <label htmlFor="notify-expired" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                          On expiry date
                        </label>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex justify-end">
                    <button className="minimal-button-primary">
                      Save Notification Schedule
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Security Settings */}
          {activeTab === 'security' && (
            <div className="fade-in-section">
              <div className="minimal-card p-6 dark:bg-gray-800">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Security Settings</h2>
                
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Reset Onboarding Tour</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                      If you want to see the onboarding tour again, you can reset it here.
                    </p>
                    <button 
                      onClick={handleResetOnboarding}
                      className="minimal-button-secondary flex items-center"
                    >
                      <RefreshCw className="w-4 h-4 mr-2" />
                      Reset Onboarding Tour
                    </button>
                  </div>
                  
                  <div className="pt-6 border-t border-gray-100 dark:border-gray-700">
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Change Password</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                      Update your password to keep your account secure.
                    </p>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Current Password</label>
                        <input 
                          type="password" 
                          className="minimal-input dark:bg-gray-700 dark:text-white dark:border-gray-600" 
                          placeholder="••••••••"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">New Password</label>
                        <input 
                          type="password" 
                          className="minimal-input dark:bg-gray-700 dark:text-white dark:border-gray-600" 
                          placeholder="••••••••"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Confirm New Password</label>
                        <input 
                          type="password" 
                          className="minimal-input dark:bg-gray-700 dark:text-white dark:border-gray-600" 
                          placeholder="••••••••"
                        />
                      </div>
                      <div className="flex justify-end">
                        <button className="minimal-button-primary">
                          Update Password
                        </button>
                      </div>
                    </div>
                  </div>
                  
                  <div className="pt-6 border-t border-gray-100 dark:border-gray-700">
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Two-Factor Authentication</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                      Add an extra layer of security to your account by enabling two-factor authentication.
                    </p>
                    <button className="minimal-button-primary">
                      Enable Two-Factor Authentication
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Appearance Settings */}
          {activeTab === 'appearance' && (
            <div className="fade-in-section">
              <div className="minimal-card p-6 dark:bg-gray-800">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Appearance</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <button 
                    className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${
                      theme === 'light' 
                        ? 'border-gray-900 bg-white dark:border-white' 
                        : 'border-gray-200 bg-gray-50 dark:border-gray-700 dark:bg-gray-700'
                    }`}
                    onClick={() => {
                      if (theme !== 'light') toggleTheme();
                      updateSettings({ theme: 'light' });
                    }}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <span className="font-medium text-gray-900 dark:text-white">Light Mode</span>
                      {theme === 'light' && (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-900 text-white dark:bg-white dark:text-gray-900">
                          Active
                        </span>
                      )}
                    </div>
                    <div className="h-24 bg-white border border-gray-200 rounded-lg shadow-sm"></div>
                  </button>
                  
                  <button 
                    className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${
                      theme === 'dark' 
                        ? 'border-gray-900 dark:border-white bg-gray-800' 
                        : 'border-gray-200 bg-gray-50 dark:border-gray-700 dark:bg-gray-700'
                    }`}
                    onClick={() => {
                      if (theme !== 'dark') toggleTheme();
                      updateSettings({ theme: 'dark' });
                    }}
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
                  </button>
                </div>
                
                <div className="mt-6 pt-6 border-t border-gray-100 dark:border-gray-700">
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Display Options</h3>
                  
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">Reduce Motion</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Minimize animations throughout the app</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input 
                          type="checkbox" 
                          className="sr-only peer" 
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-gray-300 dark:peer-focus:ring-gray-700 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-gray-900"></div>
                      </label>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">High Contrast</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Increase contrast for better readability</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input 
                          type="checkbox" 
                          className="sr-only peer" 
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-gray-300 dark:peer-focus:ring-gray-700 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-gray-900"></div>
                      </label>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">Larger Text</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Increase text size throughout the app</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input 
                          type="checkbox" 
                          className="sr-only peer" 
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-gray-300 dark:peer-focus:ring-gray-700 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-gray-900"></div>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;