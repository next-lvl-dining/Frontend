import {OrderType} from '../util/ordertype';
import {OrderStatus} from './orderstatus';
import {Address} from './address';

export class DeliveryOrder {
    id?: string;
    userId?: string;
    date?: string;
    type: OrderType;
    totalPrice: number;
    totalVat: number;
    paymentId: string;
    status: OrderStatus;
    couponId: string;
    // for delivery
    address: Address;
    lat ?: number;
    lon ?: number;
}
