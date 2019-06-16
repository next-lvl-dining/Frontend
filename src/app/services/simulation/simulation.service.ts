import { Injectable } from '@angular/core';
import { SimulationEvent } from 'src/app/models/simulationEvent';
import { Subject } from 'rxjs';
import { WebsocketService } from '../websocket/websocket.service';
import { map } from 'rxjs/operators';



@Injectable({
  providedIn: 'root'
})
export class SimulationService{
  public messages: Subject<SimulationEvent>;

  url: String = "ws://192.168.24.110:8088/deliver/simulation/1/websocket"; 

  wsService : WebsocketService;

  constructor(wsService: WebsocketService) { 
    this.wsService =wsService;
  }

  public connect(url: String){
    this.messages = <Subject<SimulationEvent>>this.wsService.connect(url).pipe(map(
      (response: MessageEvent): SimulationEvent => {
        let data = JSON.parse(response.data);
        return{
          lat: data.lat,
          lon: data.lon,
          orderid: data.orderid,
          employeeId: data.employeeId
        };
      }
    ));
  }

  public setUrl(url: String){
    this.url = url;
  }
}
