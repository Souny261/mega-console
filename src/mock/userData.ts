export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'manager' | 'support';
  status: 'active' | 'inactive';
  lastLogin: string;
  createdAt: string;
}
export const users: User[] = [{
  id: '1',
  name: 'John Doe',
  email: 'john@example.com',
  role: 'admin',
  status: 'active',
  lastLogin: '2023-10-15T10:30:00',
  createdAt: '2023-01-15'
}, {
  id: '2',
  name: 'Jane Smith',
  email: 'jane@example.com',
  role: 'manager',
  status: 'active',
  lastLogin: '2023-10-14T15:45:00',
  createdAt: '2023-02-20'
}
// Add more mock users...
];
export interface Role {
  id: string;
  name: 'admin' | 'manager' | 'support';
  permissions: string[];
}
export const roles: Role[] = [{
  id: '1',
  name: 'admin',
  permissions: ['all']
}, {
  id: '2',
  name: 'manager',
  permissions: ['read', 'write', 'update']
}, {
  id: '3',
  name: 'support',
  permissions: ['read']
}];