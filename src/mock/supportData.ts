export interface Ticket {
  id: string;
  customerId: string;
  customerName: string;
  subject: string;
  description: string;
  status: 'open' | 'in-progress' | 'resolved' | 'closed';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  category: string;
  assignedTo: string;
  createdAt: string;
  updatedAt: string;
}
export const tickets: Ticket[] = [{
  id: 'ticket_1',
  customerId: 'cust_1',
  customerName: 'TechCorp Inc.',
  subject: 'API Integration Issue',
  description: 'Having trouble with the inventory sync API endpoint.',
  status: 'in-progress',
  priority: 'high',
  category: 'Technical',
  assignedTo: 'John Doe',
  createdAt: '2023-10-14T10:30:00',
  updatedAt: '2023-10-15T09:15:00'
}, {
  id: 'ticket_2',
  customerId: 'cust_2',
  customerName: 'StartUp Labs',
  subject: 'Billing Question',
  description: 'Need clarification on recent charges',
  status: 'open',
  priority: 'medium',
  category: 'Billing',
  assignedTo: 'Jane Smith',
  createdAt: '2023-10-15T14:20:00',
  updatedAt: '2023-10-15T14:20:00'
}, {
  id: 'ticket_3',
  customerId: 'cust_3',
  customerName: 'Global Services Ltd',
  subject: 'Emergency: System Down',
  description: 'Production environment is not responding',
  status: 'open',
  priority: 'urgent',
  category: 'Technical',
  assignedTo: 'Mike Johnson',
  createdAt: '2023-10-15T15:00:00',
  updatedAt: '2023-10-15T15:00:00'
}, {
  id: 'ticket_4',
  customerId: 'cust_4',
  customerName: 'Local Shop Inc',
  subject: 'Feature Request',
  description: 'Requesting new reporting capability',
  status: 'closed',
  priority: 'low',
  category: 'Feature Request',
  assignedTo: 'Sarah Wilson',
  createdAt: '2023-10-10T09:00:00',
  updatedAt: '2023-10-12T16:30:00'
}, {
  id: 'ticket_5',
  customerId: 'cust_5',
  customerName: 'Tech Solutions',
  subject: 'Account Access Issue',
  description: 'Unable to reset password',
  status: 'resolved',
  priority: 'medium',
  category: 'Account',
  assignedTo: 'John Doe',
  createdAt: '2023-10-13T11:20:00',
  updatedAt: '2023-10-14T10:15:00'
}];