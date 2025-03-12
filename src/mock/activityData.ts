export interface ActivityLog {
  id: string;
  userId: string;
  userName: string;
  action: string;
  target: string;
  details: string;
  timestamp: string;
  category: 'user' | 'inventory' | 'subscription' | 'system' | 'support';
  ip: string;
}
export const activityLogs: ActivityLog[] = [{
  id: 'log_1',
  userId: 'user_1',
  userName: 'John Doe',
  action: 'create',
  target: 'inventory',
  details: 'Added 100 units of Wireless Keyboard (KB-001)',
  timestamp: '2023-10-15T14:30:00',
  category: 'inventory',
  ip: '192.168.1.100'
}, {
  id: 'log_2',
  userId: 'user_2',
  userName: 'Jane Smith',
  action: 'update',
  target: 'subscription',
  details: 'Updated TechCorp subscription to Enterprise plan',
  timestamp: '2023-10-15T13:45:00',
  category: 'subscription',
  ip: '192.168.1.101'
}
// Add more logs...
];