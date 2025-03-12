export interface Location {
  id: string;
  name: string;
  address: string;
  type: 'warehouse' | 'store' | 'distribution-center';
}
export interface InventoryItem {
  id: string;
  name: string;
  sku: string;
  category: string;
  locationId: string;
  quantity: number;
  threshold: number;
  status: 'in-stock' | 'low-stock' | 'out-of-stock';
  lastUpdated: string;
  price: number;
}
export const locations: Location[] = [{
  id: 'loc_1',
  name: 'Main Warehouse',
  address: '123 Storage Ave, Industry City',
  type: 'warehouse'
}, {
  id: 'loc_2',
  name: 'Downtown Store',
  address: '456 Retail St, Shopping District',
  type: 'store'
}, {
  id: 'loc_3',
  name: 'Distribution Center East',
  address: '789 Logistics Blvd, Commerce Zone',
  type: 'distribution-center'
}];
export const inventoryItems: InventoryItem[] = [{
  id: 'inv_1',
  name: 'Wireless Keyboard',
  sku: 'KB-001',
  category: 'Electronics',
  locationId: 'loc_1',
  quantity: 150,
  threshold: 50,
  status: 'in-stock',
  lastUpdated: '2023-10-15',
  price: 59.99
}, {
  id: 'inv_2',
  name: 'Wireless Mouse',
  sku: 'MS-001',
  category: 'Electronics',
  locationId: 'loc_2',
  quantity: 8,
  threshold: 20,
  status: 'low-stock',
  lastUpdated: '2023-10-14',
  price: 39.99
}, {
  id: 'inv_3',
  name: 'USB-C Cable',
  sku: 'CBL-001',
  category: 'Accessories',
  locationId: 'loc_1',
  quantity: 0,
  threshold: 30,
  status: 'out-of-stock',
  lastUpdated: '2023-10-13',
  price: 19.99
}, {
  id: 'inv_4',
  name: 'Monitor Stand',
  sku: 'STD-001',
  category: 'Accessories',
  locationId: 'loc_3',
  quantity: 45,
  threshold: 15,
  status: 'in-stock',
  lastUpdated: '2023-10-12',
  price: 79.99
}, {
  id: 'inv_5',
  name: 'Laptop Dock',
  sku: 'DCK-001',
  category: 'Electronics',
  locationId: 'loc_1',
  quantity: 12,
  threshold: 10,
  status: 'low-stock',
  lastUpdated: '2023-10-11',
  price: 199.99
}];