export interface Plan {
  id: string;
  name: string;
  price: number;
  billing: 'monthly' | 'yearly';
  features: string[];
}
export interface Subscription {
  id: string;
  customerId: string;
  customerName: string;
  planId: string;
  status: 'active' | 'cancelled' | 'expired' | 'trial';
  startDate: string;
  endDate: string;
  billingCycle: 'monthly' | 'yearly';
  amount: number;
}
export const plans: Plan[] = [{
  id: 'basic',
  name: 'Basic',
  price: 29,
  billing: 'monthly',
  features: ['Up to 1,000 items', '2 team members', 'Basic analytics', 'Email support']
}, {
  id: 'pro',
  name: 'Professional',
  price: 79,
  billing: 'monthly',
  features: ['Up to 10,000 items', '5 team members', 'Advanced analytics', 'Priority support', 'API access']
}, {
  id: 'enterprise',
  name: 'Enterprise',
  price: 199,
  billing: 'monthly',
  features: ['Unlimited items', 'Unlimited team members', 'Custom analytics', '24/7 support', 'Dedicated account manager', 'Custom integrations']
}];
export const subscriptions: Subscription[] = [{
  id: 'sub_1',
  customerId: 'cust_1',
  customerName: 'TechCorp Inc.',
  planId: 'enterprise',
  status: 'active',
  startDate: '2023-01-01',
  endDate: '2024-01-01',
  billingCycle: 'yearly',
  amount: 2388
}, {
  id: 'sub_2',
  customerId: 'cust_2',
  customerName: 'StartUp Labs',
  planId: 'pro',
  status: 'trial',
  startDate: '2023-10-01',
  endDate: '2023-10-15',
  billingCycle: 'monthly',
  amount: 79
}
// Add more subscriptions...
];