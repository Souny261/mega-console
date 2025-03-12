import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import Login from '../../pages/Login';
import Dashboard from '../../pages/Dashboard';
import Sidebar from './Sidebar';
import Header from './Header';
import UserManagement from '../../pages/UserManagement';
import SubscriptionManagement from '../../pages/SubscriptionManagement';
import InventoryMonitoring from '../../pages/InventoryMonitoring';
import ActivityLogs from '../../pages/ActivityLogs';
import SystemSettings from '../../pages/SystemSettings';
import CustomerSupport from '../../pages/CustomerSupport';
const AppContent: React.FC = () => {
  const {
    isAuthenticated
  } = useAuth();
  const [activeView, setActiveView] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
  const toggleDarkMode = () => setDarkMode(!darkMode);
  if (!isAuthenticated) {
    return <Login />;
  }
  const renderView = () => {
    switch (activeView) {
      case 'dashboard':
        return <Dashboard />;
      case 'users':
        return <UserManagement />;
      case 'subscriptions':
        return <SubscriptionManagement />;
      case 'inventory':
        return <InventoryMonitoring />;
      case 'logs':
        return <ActivityLogs />;
      case 'settings':
        return <SystemSettings />;
      case 'support':
        return <CustomerSupport />;
      default:
        return <Dashboard />;
    }
  };
  return <div className={`flex h-screen w-full ${darkMode ? 'dark' : ''}`}>
      <Sidebar isOpen={sidebarOpen} activeView={activeView} setActiveView={setActiveView} toggleSidebar={toggleSidebar} />
      <div className="flex flex-col flex-1 overflow-hidden bg-gray-50 dark:bg-gray-900">
        <Header toggleSidebar={toggleSidebar} darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          {renderView()}
        </main>
      </div>
    </div>;
};
export default AppContent;