import {OrderType} from '../util/ordertype';
import {OrderStatus} from './orderstatus';

export class LocalOrder {
    id: string;
    userId: string;
    date: string;
    type: OrderType[];
    totalPrice: number;
    totalVat: number;
    paymentId: string;
    status: OrderStatus;
    couponnId: string;
    // for local
    tableNumber: number;
}
