import {Component, OnInit} from '@angular/core';
import {OrderService} from '../../services/order/order.service';
import {LocalOrder} from '../../models/localorder';
import {DeliveryOrder} from '../../models/deliveryorder';
import {convertJSONDateToString} from '../../util/DateParser';

@Component({
    selector: 'app-history',
    templateUrl: './history.component.html',
    styleUrls: ['./history.component.scss']
})
export class HistoryComponent implements OnInit {
    localOrders: LocalOrder[];
    deliveryOrders: DeliveryOrder[];

    constructor(private orderService: OrderService) {

    }

    ngOnInit() {
        this.getLocalOrders();
        this.getDeliveryOrders();
    }

    refreshHistory() {
        this.getLocalOrders();
        this.getDeliveryOrders();
    }


    getLocalOrders() {
        // todo
        this.orderService.getAllLocalOrderFromUser('user1').subscribe(
            data => {
                data.map(order => {
                    order.date = convertJSONDateToString(order.date);
                });
                this.localOrders = data;
            },
            error => {
                console.error(error);
            });
    }

    getDeliveryOrders() {
        // todo
        this.orderService.getAllDeliveryOrderFromUser('user1').subscribe(
            data => {
                data.map(order => {
                    order.date = convertJSONDateToString(order.date);
                });
                this.deliveryOrders = data;
            },
            error => {
                console.log(error);
            });
    }
}
