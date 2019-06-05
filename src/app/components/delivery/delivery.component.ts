import { Component, OnInit } from '@angular/core';
import {DeliveryOrder} from '../../models/deliveryorder';
import {OrderService} from '../../services/order/order.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-delivery',
  templateUrl: './delivery.component.html',
  styleUrls: ['./delivery.component.scss']
})
export class DeliveryComponent implements OnInit {
  /// Add websocket
  /// create delivery
  order: DeliveryOrder;

  constructor(private orderService: OrderService, private route: ActivatedRoute) {
      this.route.params.subscribe(params => {
          this.orderService.getDeliveryOrderById(params.orderId).subscribe( dOrder => {
              this.order = dOrder;
          });
      });
  }

  ngOnInit() {
  }

}
