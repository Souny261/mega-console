import React, { useState } from 'react';
import { SearchIcon } from 'lucide-react';
interface InventoryItem {
  id: string;
  name: string;
  category: string;
  quantity: number;
  threshold: number;
  status: 'Critical' | 'Low' | 'Normal';
  lastUpdated: string;
}
const inventoryData: InventoryItem[] = [{
  id: 'INV-001',
  name: 'Wireless Headphones',
  category: 'Electronics',
  quantity: 5,
  threshold: 10,
  status: 'Critical',
  lastUpdated: '2023-10-15'
}, {
  id: 'INV-002',
  name: 'Ergonomic Keyboard',
  category: 'Computer Accessories',
  quantity: 8,
  threshold: 15,
  status: 'Low',
  lastUpdated: '2023-10-14'
}, {
  id: 'INV-003',
  name: 'USB-C Cables',
  category: 'Accessories',
  quantity: 12,
  threshold: 20,
  status: 'Low',
  lastUpdated: '2023-10-13'
}, {
  id: 'INV-004',
  name: 'Wireless Mouse',
  category: 'Computer Accessories',
  quantity: 7,
  threshold: 10,
  status: 'Low',
  lastUpdated: '2023-10-12'
}, {
  id: 'INV-005',
  name: 'Laptop Stand',
  category: 'Computer Accessories',
  quantity: 3,
  threshold: 8,
  status: 'Critical',
  lastUpdated: '2023-10-11'
}];
const InventoryTable: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const filteredData = inventoryData.filter(item => item.name.toLowerCase().includes(searchTerm.toLowerCase()) || item.category.toLowerCase().includes(searchTerm.toLowerCase()) || item.id.toLowerCase().includes(searchTerm.toLowerCase()));
  const getStatusBadge = (status: InventoryItem['status']) => {
    switch (status) {
      case 'Critical':
        return <span className="px-2 py-1 text-xs font-medium rounded-full bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400">
            Critical
          </span>;
      case 'Low':
        return <span className="px-2 py-1 text-xs font-medium rounded-full bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400">
            Low
          </span>;
      case 'Normal':
        return <span className="px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">
            Normal
          </span>;
      default:
        return null;
    }
  };
  return <div className="space-y-4">
      <div className="flex items-center rounded-md bg-gray-100 dark:bg-gray-700 w-full md:w-72">
        <SearchIcon size={18} className="ml-3 text-gray-500 dark:text-gray-400" />
        <input type="text" placeholder="Search inventory..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} className="w-full px-3 py-2 text-sm bg-transparent border-none focus:outline-none text-gray-700 dark:text-gray-300" />
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead className="bg-gray-50 dark:bg-gray-800">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                ID
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Item
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Category
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Quantity
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Status
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Last Updated
              </th>
              <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
            {filteredData.map(item => <tr key={item.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                  {item.id}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">
                  {item.name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">
                  {item.category}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">
                  {item.quantity} / {item.threshold}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {getStatusBadge(item.status)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">
                  {item.lastUpdated}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300">
                    Restock
                  </button>
                </td>
              </tr>)}
          </tbody>
        </table>
      </div>
    </div>;
};
export default InventoryTable;