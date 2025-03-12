import React, { useState } from 'react';
import { BellIcon, KeyIcon, CodeIcon } from 'lucide-react';
const SystemSettings: React.FC = () => {
  const [activeTab, setActiveTab] = useState('general');
  const [formData, setFormData] = useState({
    companyName: 'InventoryOS Inc.',
    email: 'admin@inventoryos.com',
    timezone: 'America/New_York'
  });
  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    pushNotifications: false,
    slackIntegration: false
  });
  const [securitySettings, setSecuritySettings] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
    twoFactorEnabled: false
  });
  const [apiSettings, setApiSettings] = useState({
    apiKey: 'sk_live_51LxTqOJMlTVQ90p3AbcDefghi123456789ABCDEFGHIJKLMNO',
    webhookEnabled: true,
    webhookUrl: 'https://your-app.com/webhooks'
  });
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const {
      name,
      value
    } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  const handleNotificationChange = (key: string) => {
    setNotificationSettings(prev => ({
      ...prev,
      [key]: !prev[key as keyof typeof prev]
    }));
  };
  const handleSecuritySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Security settings updated:', securitySettings);
  };
  const handleApiSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('API settings updated:', apiSettings);
  };
  const renderTabContent = () => {
    switch (activeTab) {
      case 'general':
        return <div className="space-y-6">
            <div>
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                General Settings
              </h2>
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                Manage your basic account settings
              </p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Company Name
              </label>
              <input type="text" name="companyName" value={formData.companyName} onChange={handleInputChange} className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Email Address
              </label>
              <input type="email" name="email" value={formData.email} onChange={handleInputChange} className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Timezone
              </label>
              <select name="timezone" value={formData.timezone} onChange={handleInputChange} className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                <option value="America/New_York">
                  Eastern Time (US & Canada)
                </option>
                <option value="America/Chicago">
                  Central Time (US & Canada)
                </option>
                <option value="America/Denver">
                  Mountain Time (US & Canada)
                </option>
                <option value="America/Los_Angeles">
                  Pacific Time (US & Canada)
                </option>
                <option value="UTC">UTC</option>
              </select>
            </div>
            <div className="flex justify-end">
              <button type="button" className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700">
                Save Changes
              </button>
            </div>
          </div>;
      case 'notifications':
        return <div className="space-y-6">
            <div>
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                Notification Settings
              </h2>
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                Manage how you receive notifications
              </p>
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-medium text-gray-900 dark:text-white">
                    Email Notifications
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Receive updates via email
                  </p>
                </div>
                <button onClick={() => handleNotificationChange('emailNotifications')} className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${notificationSettings.emailNotifications ? 'bg-blue-600' : 'bg-gray-200 dark:bg-gray-700'}`}>
                  <span className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${notificationSettings.emailNotifications ? 'translate-x-5' : 'translate-x-0'}`} />
                </button>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-medium text-gray-900 dark:text-white">
                    Push Notifications
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Receive push notifications
                  </p>
                </div>
                <button onClick={() => handleNotificationChange('pushNotifications')} className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${notificationSettings.pushNotifications ? 'bg-blue-600' : 'bg-gray-200 dark:bg-gray-700'}`}>
                  <span className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${notificationSettings.pushNotifications ? 'translate-x-5' : 'translate-x-0'}`} />
                </button>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-medium text-gray-900 dark:text-white">
                    Slack Integration
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Send notifications to Slack
                  </p>
                </div>
                <button onClick={() => handleNotificationChange('slackIntegration')} className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${notificationSettings.slackIntegration ? 'bg-blue-600' : 'bg-gray-200 dark:bg-gray-700'}`}>
                  <span className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${notificationSettings.slackIntegration ? 'translate-x-5' : 'translate-x-0'}`} />
                </button>
              </div>
            </div>
            <div className="flex justify-end">
              <button type="button" className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700">
                Save Changes
              </button>
            </div>
          </div>;
      case 'security':
        return <div className="space-y-6">
            <div>
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                Security Settings
              </h2>
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                Manage your account security
              </p>
            </div>
            <form onSubmit={handleSecuritySubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Current Password
                </label>
                <input type="password" value={securitySettings.currentPassword} onChange={e => setSecuritySettings({
                ...securitySettings,
                currentPassword: e.target.value
              })} className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  New Password
                </label>
                <input type="password" value={securitySettings.newPassword} onChange={e => setSecuritySettings({
                ...securitySettings,
                newPassword: e.target.value
              })} className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Confirm New Password
                </label>
                <input type="password" value={securitySettings.confirmPassword} onChange={e => setSecuritySettings({
                ...securitySettings,
                confirmPassword: e.target.value
              })} className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white" />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-medium text-gray-900 dark:text-white">
                    Two-Factor Authentication
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Add an extra layer of security to your account
                  </p>
                </div>
                <button type="button" onClick={() => setSecuritySettings({
                ...securitySettings,
                twoFactorEnabled: !securitySettings.twoFactorEnabled
              })} className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${securitySettings.twoFactorEnabled ? 'bg-blue-600' : 'bg-gray-200 dark:bg-gray-700'}`}>
                  <span className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${securitySettings.twoFactorEnabled ? 'translate-x-5' : 'translate-x-0'}`} />
                </button>
              </div>
              <div className="flex justify-end">
                <button type="submit" className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700">
                  Update Password
                </button>
              </div>
            </form>
          </div>;
      case 'api':
        return <div className="space-y-6">
            <div>
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                API Settings
              </h2>
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                Manage API keys and webhook configurations
              </p>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  API Key
                </label>
                <div className="mt-1 flex rounded-md shadow-sm">
                  <input type="text" value={apiSettings.apiKey} readOnly className="flex-1 px-3 py-2 border border-gray-300 rounded-l-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white" />
                  <button type="button" className="px-4 py-2 border border-l-0 border-gray-300 rounded-r-md bg-gray-50 text-sm font-medium text-gray-700 hover:bg-gray-100 dark:bg-gray-600 dark:border-gray-600 dark:text-gray-200 dark:hover:bg-gray-500">
                    Copy
                  </button>
                </div>
                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                  This key grants full access to your account. Keep it secret.
                </p>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-medium text-gray-900 dark:text-white">
                    Webhook Notifications
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Send event notifications to your application
                  </p>
                </div>
                <button type="button" onClick={() => setApiSettings({
                ...apiSettings,
                webhookEnabled: !apiSettings.webhookEnabled
              })} className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${apiSettings.webhookEnabled ? 'bg-blue-600' : 'bg-gray-200 dark:bg-gray-700'}`}>
                  <span className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${apiSettings.webhookEnabled ? 'translate-x-5' : 'translate-x-0'}`} />
                </button>
              </div>
              {apiSettings.webhookEnabled && <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Webhook URL
                  </label>
                  <input type="url" value={apiSettings.webhookUrl} onChange={e => setApiSettings({
                ...apiSettings,
                webhookUrl: e.target.value
              })} className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white" placeholder="https://your-app.com/webhooks" />
                </div>}
              <div className="flex justify-end space-x-4">
                <button type="button" className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700">
                  Regenerate API Key
                </button>
                <button type="button" className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700">
                  Save Webhook Settings
                </button>
              </div>
            </div>
          </div>;
      default:
        return null;
    }
  };
  return <div className="max-w-4xl">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Settings
        </h1>
        <p className="mt-1 text-gray-500 dark:text-gray-400">
          Manage your account and system settings
        </p>
      </div>
      <div className="border-b border-gray-200 dark:border-gray-700">
        <nav className="flex space-x-8" aria-label="Settings">
          <button onClick={() => setActiveTab('general')} className={`py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'general' ? 'border-blue-500 text-blue-600 dark:text-blue-400' : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300'}`}>
            General
          </button>
          <button onClick={() => setActiveTab('notifications')} className={`py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'notifications' ? 'border-blue-500 text-blue-600 dark:text-blue-400' : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300'}`}>
            Notifications
          </button>
          <button onClick={() => setActiveTab('security')} className={`py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'security' ? 'border-blue-500 text-blue-600 dark:text-blue-400' : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300'}`}>
            Security
          </button>
          <button onClick={() => setActiveTab('api')} className={`py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'api' ? 'border-blue-500 text-blue-600 dark:text-blue-400' : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300'}`}>
            API
          </button>
        </nav>
      </div>
      <div className="mt-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
        {renderTabContent()}
      </div>
    </div>;
};
export default SystemSettings;