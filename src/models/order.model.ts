export interface IOrder {
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

export interface IOrderSheet {
  items: number[];
  totalQuantity: number;
  totalPrice: number;
  firstBookTitle: string;
  delivery: IDelivery;
}

export interface IDelivery {
  address: string;
  receiver: string;
  contact: string;
}

export interface IOrderDetailItem {
  bookId: number;
  title: string;
  quantity: number;
  unitPrice: number;
}

export interface IOrderListItem extends IOrder {
  detail?: IOrderDetailItem[];
}
