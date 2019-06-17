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
        // todo remove
        localStorage.setItem('userId', 'login1');
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
        this.orderService.getAllLocalOrderFromUser(localStorage.getItem('userId')).subscribe(
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
        this.orderService.getAllDeliveryOrderFromUser(localStorage.getItem('userId')).subscribe(
            data => {
                console.log(data);
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
