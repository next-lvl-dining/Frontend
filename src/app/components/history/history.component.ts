import {Component, OnInit} from '@angular/core';
import {OrderService} from '../../services/order/order.service';

@Component({
    selector: 'app-history',
    templateUrl: './history.component.html',
    styleUrls: ['./history.component.scss']
})
export class HistoryComponent implements OnInit {

    constructor(private orderService: OrderService) {
    }

    ngOnInit() {
    }

    testButton() {
        console.log('KLIK');
        this.orderService.getAllLocalOrderFromUser('1');
    }

}
