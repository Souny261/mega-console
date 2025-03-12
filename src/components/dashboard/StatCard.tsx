import React from 'react';
import { TrendingUpIcon, TrendingDownIcon } from 'lucide-react';
interface StatCardProps {
  title: string;
  value: string;
  change: string;
  trend: 'up' | 'down';
  icon: React.ReactNode;
  color: 'blue' | 'green' | 'amber' | 'purple' | 'red';
}
const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  change,
  trend,
  icon,
  color
}) => {
  const getColorClasses = () => {
    switch (color) {
      case 'blue':
        return 'bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400';
      case 'green':
        return 'bg-green-50 text-green-600 dark:bg-green-900/30 dark:text-green-400';
      case 'amber':
        return 'bg-amber-50 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400';
      case 'purple':
        return 'bg-purple-50 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400';
      case 'red':
        return 'bg-red-50 text-red-600 dark:bg-red-900/30 dark:text-red-400';
      default:
        return 'bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400';
    }
  };
  return <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
      <div className="flex justify-between">
        <div className={`p-2 rounded-lg ${getColorClasses()}`}>{icon}</div>
        <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${trend === 'up' ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' : 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'}`}>
          {trend === 'up' ? <TrendingUpIcon size={12} className="mr-1" /> : <TrendingDownIcon size={12} className="mr-1" />}
          {change}
        </span>
      </div>
      <h3 className="mt-4 text-2xl font-bold text-gray-800 dark:text-white">
        {value}
      </h3>
      <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">{title}</p>
    </div>;
};
export default StatCard;