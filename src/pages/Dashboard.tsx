import React from 'react';
import StatCard from '../components/dashboard/StatCard';
import RevenueChart from '../components/dashboard/RevenueChart';
import InventoryTable from '../components/dashboard/InventoryTable';
import RecentActivities from '../components/dashboard/RecentActivities';
import { UsersIcon, CreditCardIcon, PackageIcon, AlertTriangleIcon } from 'lucide-react';
const Dashboard: React.FC = () => {
  return <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
          Dashboard
        </h1>
        <p className="text-gray-500 dark:text-gray-400">
          Welcome back, Admin! Here's what's happening today.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Total Users" value="2,845" change="+12.5%" trend="up" icon={<UsersIcon className="w-5 h-5" />} color="blue" />
        <StatCard title="Active Subscriptions" value="1,257" change="+8.2%" trend="up" icon={<CreditCardIcon className="w-5 h-5" />} color="green" />
        <StatCard title="Total Inventory" value="8,592" change="-3.1%" trend="down" icon={<PackageIcon className="w-5 h-5" />} color="purple" />
        <StatCard title="Low Stock Items" value="42" change="+5" trend="up" icon={<AlertTriangleIcon className="w-5 h-5" />} color="amber" />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
            Revenue Overview
          </h2>
          <div className="h-80">
            <RevenueChart />
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
            Recent Activities
          </h2>
          <RecentActivities />
        </div>
      </div>
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-lg font-semibold text-gray-800 dark:text-white">
            Low Stock Inventory
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Items that need to be restocked soon
          </p>
        </div>
        <div className="p-6">
          <InventoryTable />
        </div>
      </div>
    </div>;
};
export default Dashboard;