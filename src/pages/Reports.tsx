import React from 'react';
import { Download, Calendar, Filter } from 'lucide-react';
export const Reports: React.FC = () => {
  const reportTypes = [{
    id: 1,
    name: 'Inventory Summary',
    description: 'Overview of current inventory levels and values',
    lastGenerated: '2023-11-15'
  }, {
    id: 2,
    name: 'Low Stock Report',
    description: 'Products below their minimum threshold',
    lastGenerated: '2023-11-15'
  }, {
    id: 3,
    name: 'Sales Performance',
    description: 'Sales trends and top-selling products',
    lastGenerated: '2023-11-14'
  }, {
    id: 4,
    name: 'Supplier Orders',
    description: 'Recent orders placed with suppliers',
    lastGenerated: '2023-11-12'
  }, {
    id: 5,
    name: 'User Activity Log',
    description: 'User actions and system changes',
    lastGenerated: '2023-11-15'
  }, {
    id: 6,
    name: 'Financial Summary',
    description: 'Revenue, costs, and profit margins',
    lastGenerated: '2023-11-10'
  }];
  return <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
          Reports & Analytics
        </h1>
        <p className="text-gray-500 dark:text-gray-400">
          Generate and download system reports
        </p>
      </div>
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="flex-grow">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Date Range
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <Calendar className="h-4 w-4 text-gray-400" />
              </div>
              <input type="text" className="block w-full rounded-md border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 py-2 pl-10 pr-3 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Select date range" defaultValue="Nov 1, 2023 - Nov 15, 2023" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Report Format
            </label>
            <select className="block w-full rounded-md border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 py-2 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option>PDF</option>
              <option>Excel</option>
              <option>CSV</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Additional Filters
            </label>
            <button className="flex items-center justify-center w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200">
              <Filter className="h-4 w-4 mr-2" />
              Add Filters
            </button>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {reportTypes.map(report => <div key={report.id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:bg-gray-50 dark:hover:bg-gray-800/80">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                {report.name}
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                {report.description}
              </p>
              <div className="flex items-center justify-between mt-4">
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  Last generated: {report.lastGenerated}
                </span>
                <button className="flex items-center text-sm text-blue-600 dark:text-blue-400 hover:underline">
                  <Download className="h-4 w-4 mr-1" />
                  Generate
                </button>
              </div>
            </div>)}
        </div>
      </div>
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <h2 className="text-lg font-medium text-gray-800 dark:text-white mb-4">
          Custom Report Builder
        </h2>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
          Create a custom report by selecting the data points you want to
          include.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Report Name
            </label>
            <input type="text" className="block w-full rounded-md border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 py-2 px-3 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Enter report name" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Report Type
            </label>
            <select className="block w-full rounded-md border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 py-2 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option>Inventory Report</option>
              <option>Sales Report</option>
              <option>User Activity Report</option>
              <option>Financial Report</option>
            </select>
          </div>
        </div>
        <div className="border-t border-gray-200 dark:border-gray-700 pt-4 mt-4">
          <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Select Data Points
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div className="flex items-center">
              <input id="product-name" type="checkbox" className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded" defaultChecked />
              <label htmlFor="product-name" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                Product Name
              </label>
            </div>
            <div className="flex items-center">
              <input id="sku" type="checkbox" className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded" defaultChecked />
              <label htmlFor="sku" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                SKU
              </label>
            </div>
            <div className="flex items-center">
              <input id="category" type="checkbox" className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded" defaultChecked />
              <label htmlFor="category" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                Category
              </label>
            </div>
            <div className="flex items-center">
              <input id="stock-level" type="checkbox" className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded" defaultChecked />
              <label htmlFor="stock-level" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                Stock Level
              </label>
            </div>
            <div className="flex items-center">
              <input id="price" type="checkbox" className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded" defaultChecked />
              <label htmlFor="price" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                Price
              </label>
            </div>
            <div className="flex items-center">
              <input id="supplier" type="checkbox" className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded" />
              <label htmlFor="supplier" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                Supplier
              </label>
            </div>
          </div>
        </div>
        <div className="mt-6 flex justify-end">
          <button className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white rounded-md hover:bg-gray-300 dark:hover:bg-gray-600 mr-2">
            Save Template
          </button>
          <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
            <Download className="h-4 w-4 mr-2" />
            Generate Report
          </button>
        </div>
      </div>
    </div>;
};