export interface Order {
  id: number;
  createdAt: string;
  receiver: {
    address: string;
    name: string;
    phone: string;
  };
  items: {
    bookCount: number;
    totalQuantity: number;
    firstTitle: string;
  };
  delivery: {
    trackingNumber: string;
  };
  payment: {
    amount: number;
    type: string;
  };
}
