import { ORDER_PAYER_ENUM, ORDER_STATUS_ENUM } from '@/constants';
interface CODEntity {
  isCOD: boolean;
  CODAmount: number;
}

export interface LocationEntity {
  /**
   * The coordinates of the location. [latitude, longitude]
   */
  coordinates: [number, number];
  address: string;
}

export interface IOrder {
  id: number;
  cusName: string;

  pickup: LocationEntity;

  cusPhone: string;

  recipientName: string;

  destination: LocationEntity;

  distanceTotal: number;

  exceedDistance: number;
  imgDelivered: string;

  recipientPhone: string;

  cod: CODEntity;

  isDeliveryCharge: boolean;
  payer: ORDER_PAYER_ENUM;

  loadWeight: number;

  priceItems: string[];

  totalPrice: number;

  currentStatus: ORDER_STATUS_ENUM;

  deliveryWindow: string;

  note: string;

  potentialDriverId?: number;
}
