import React from 'react';
import { UserIcon, PackageIcon, CreditCardIcon, AlertTriangleIcon, CheckCircleIcon } from 'lucide-react';
interface Activity {
  id: string;
  title: string;
  description: string;
  time: string;
  type: 'user' | 'inventory' | 'subscription' | 'alert' | 'system';
}
const activities: Activity[] = [{
  id: 'act-1',
  title: 'New User Registered',
  description: 'John Doe signed up as a new customer',
  time: '10 minutes ago',
  type: 'user'
}, {
  id: 'act-2',
  title: 'Low Stock Alert',
  description: 'Wireless Headphones (INV-001) running low',
  time: '25 minutes ago',
  type: 'alert'
}, {
  id: 'act-3',
  title: 'Subscription Upgraded',
  description: 'TechCorp upgraded to Enterprise plan',
  time: '1 hour ago',
  type: 'subscription'
}, {
  id: 'act-4',
  title: 'Inventory Updated',
  description: 'Admin updated USB-C Cables stock count',
  time: '2 hours ago',
  type: 'inventory'
}, {
  id: 'act-5',
  title: 'System Maintenance',
  description: 'Scheduled maintenance completed',
  time: '5 hours ago',
  type: 'system'
}];
const RecentActivities: React.FC = () => {
  const getActivityIcon = (type: Activity['type']) => {
    switch (type) {
      case 'user':
        return <UserIcon size={16} className="text-blue-500" />;
      case 'inventory':
        return <PackageIcon size={16} className="text-purple-500" />;
      case 'subscription':
        return <CreditCardIcon size={16} className="text-green-500" />;
      case 'alert':
        return <AlertTriangleIcon size={16} className="text-amber-500" />;
      case 'system':
        return <CheckCircleIcon size={16} className="text-gray-500" />;
      default:
        return null;
    }
  };
  return <div className="space-y-4">
      {activities.map(activity => <div key={activity.id} className="flex space-x-3">
          <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center">
            {getActivityIcon(activity.type)}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-800 dark:text-white">
              {activity.title}
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {activity.description}
            </p>
            <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
              {activity.time}
            </p>
          </div>
        </div>)}
      <button className="w-full text-center text-sm text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 mt-2">
        View all activities
      </button>
    </div>;
};
export default RecentActivities;