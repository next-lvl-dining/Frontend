import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { DeliveryOrderEvent } from 'src/app/models/deliveryOrderEvent';
import { WebsocketService } from '../websocket/websocket.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class Deliveryorderservice {
  public deliveryorders : Subject<DeliveryOrderEvent>;

  wsService : WebsocketService;

  constructor(wsService: WebsocketService) { 
    this.wsService = wsService;
  }

  public connect(url: String){
    this.deliveryorders = <Subject<DeliveryOrderEvent>>this.wsService.connect(url).pipe(map(
      (response: MessageEvent): DeliveryOrderEvent => {
        console.log("Data from subscribe" + JSON.parse(response.data));
        let data = JSON.parse(response.data);
        console.log(data.deliveryOrders);
        return{
          deliveryOrders : data.deliveryOrders
        };
      }
    ));
  }

}
