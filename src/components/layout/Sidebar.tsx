import React from 'react';
import { LayoutDashboardIcon, UsersIcon, CreditCardIcon, PackageIcon, ClipboardListIcon, SettingsIcon, HeadphonesIcon, MenuIcon, XIcon, Package } from 'lucide-react';
interface SidebarProps {
  isOpen: boolean;
  activeView: string;
  setActiveView: (view: string) => void;
  toggleSidebar: () => void;
}
const Sidebar: React.FC<SidebarProps> = ({
  isOpen,
  activeView,
  setActiveView,
  toggleSidebar
}) => {
  const menuItems = [{
    id: 'dashboard',
    label: 'Dashboard',
    icon: <LayoutDashboardIcon size={20} />
  }, {
    id: 'Product',
    label: 'Product',
    icon: <Package size={20} />
  }, {
    id: 'users',
    label: 'User Management',
    icon: <UsersIcon size={20} />
  }, {
    id: 'subscriptions',
    label: 'Subscriptions',
    icon: <CreditCardIcon size={20} />
  }, {
    id: 'inventory',
    label: 'Inventory',
    icon: <PackageIcon size={20} />
  }, {
    id: 'logs',
    label: 'Activity Logs',
    icon: <ClipboardListIcon size={20} />
  }, {
    id: 'settings',
    label: 'Settings',
    icon: <SettingsIcon size={20} />
  }, {
    id: 'support',
    label: 'Support',
    icon: <HeadphonesIcon size={20} />
  }];
  return <>
    {/* Mobile sidebar backdrop */}
    {isOpen && <div className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden" onClick={toggleSidebar} />}
    {/* Sidebar */}
    <div className={`fixed lg:static inset-y-0 left-0 z-30 w-64 transform transition-transform duration-300 ease-in-out bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
      <div className="flex items-center justify-between h-16 px-4 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center">
          <PackageIcon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
          <span className="ml-2 text-lg font-semibold text-gray-800 dark:text-white">
            InventoryOS
          </span>
        </div>
        <button onClick={toggleSidebar} className="lg:hidden p-1 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700">
          <XIcon size={20} className="text-gray-500 dark:text-gray-400" />
        </button>
      </div>
      <div className="p-4">
        <p className="px-4 py-2 text-xs font-semibold text-gray-400 uppercase">
          Main
        </p>
        <nav className="space-y-1">
          {menuItems.map(item => <button key={item.id} onClick={() => setActiveView(item.id)} className={`flex items-center w-full px-4 py-2 rounded-lg text-sm transition-colors ${activeView === item.id ? 'bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400' : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700/50'}`}>
            <span className={`${activeView === item.id ? 'text-blue-600 dark:text-blue-400' : 'text-gray-500 dark:text-gray-400'}`}>
              {item.icon}
            </span>
            <span className="ml-3">{item.label}</span>
          </button>)}
        </nav>
      </div>
      <div className="absolute bottom-0 w-full p-4 border-t border-gray-200 dark:border-gray-700">
        <div className="flex items-center px-4 py-2">
          <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white font-medium">
            A
          </div>
          <div className="ml-3">
            <p className="text-sm font-medium text-gray-800 dark:text-white">
              Admin User
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              admin@example.com
            </p>
          </div>
        </div>
      </div>
    </div>
  </>;
};
export default Sidebar;