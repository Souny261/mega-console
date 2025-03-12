import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
const data = [{
  name: 'Jan',
  revenue: 4000,
  profit: 2400
}, {
  name: 'Feb',
  revenue: 3000,
  profit: 1398
}, {
  name: 'Mar',
  revenue: 2000,
  profit: 9800
}, {
  name: 'Apr',
  revenue: 2780,
  profit: 3908
}, {
  name: 'May',
  revenue: 1890,
  profit: 4800
}, {
  name: 'Jun',
  revenue: 2390,
  profit: 3800
}, {
  name: 'Jul',
  revenue: 3490,
  profit: 4300
}, {
  name: 'Aug',
  revenue: 4000,
  profit: 2400
}, {
  name: 'Sep',
  revenue: 5000,
  profit: 3398
}, {
  name: 'Oct',
  revenue: 4780,
  profit: 2908
}, {
  name: 'Nov',
  revenue: 5890,
  profit: 4800
}, {
  name: 'Dec',
  revenue: 6390,
  profit: 5800
}];
const RevenueChart: React.FC = () => {
  return <ResponsiveContainer width="100%" height="100%">
      <AreaChart data={data} margin={{
      top: 10,
      right: 30,
      left: 0,
      bottom: 0
    }}>
        <defs>
          <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
          </linearGradient>
          <linearGradient id="colorProfit" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#10b981" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
        <XAxis dataKey="name" stroke="#9ca3af" />
        <YAxis stroke="#9ca3af" />
        <Tooltip contentStyle={{
        backgroundColor: '#ffffff',
        borderColor: '#e5e7eb',
        borderRadius: '0.375rem',
        boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)'
      }} />
        <Area type="monotone" dataKey="revenue" stroke="#3b82f6" fillOpacity={1} fill="url(#colorRevenue)" />
        <Area type="monotone" dataKey="profit" stroke="#10b981" fillOpacity={1} fill="url(#colorProfit)" />
      </AreaChart>
    </ResponsiveContainer>;
};
export default RevenueChart;