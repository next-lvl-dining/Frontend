import {Component, OnInit} from '@angular/core';
import {OrderService} from '../../services/order/order.service';
import {LocalOrder} from '../../models/localorder';
import {DeliveryOrder} from '../../models/deliveryorder';

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
        console.log('ngInit');
    }

    testButton() {
        console.log('KLIK');
        this.getLocalOrders();
        this.getDeliveryOrders();
    }


    getLocalOrders() {
        // todo
        this.orderService.getAllLocalOrderFromUser('user1').subscribe(
            data => {
                console.log(data);
                this.localOrders = data;
            },
            error => {
                console.log(error);
            });
    }
    getDeliveryOrders() {
        // todo
        this.orderService.getAllDeliveryOrderFromUser('user1').subscribe(
            data => {
                console.log(data);
                this.deliveryOrders = data;
            },
            error => {
                console.log(error);
            });
    }
}
